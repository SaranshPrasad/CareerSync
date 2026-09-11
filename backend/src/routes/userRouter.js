const express = require("express");
const auth = require("../middleware/auth");
const User = require("../database/models/user");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const formatResume = require("../utils/resumeParser");
const extractGithubUsername = require("../utils/extractGithubUserName");
const getMainRepoReadme = require("../utils/mainReadme");
const formatGithubReadme = require("../utils/formatGithubReadme");
const formatLinkedinText = require("../utils/formatLinkedinText");
const { analyzeCareerProfile } = require("../utils/geminiService");
router.use(express.json());

const storage = multer.memoryStorage();
const pdfFilter = (req, file, cb) => {
    // Check MIME type and extension
    const isPdfMime = file.mimetype === 'application/pdf';
    const isPdfExt = file.originalname.toLowerCase().endsWith('.pdf');

    if (isPdfMime && isPdfExt) {
        cb(null, true); // Accept the file
    } else {
        // Reject the file with an error
        cb(new Error('Only PDF files are allowed!'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: pdfFilter
})

router.get("/profile", auth, async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        if (!user) return res.status(401).json({ message: "User not found!" });
        res.status(200).json({ message: "User found!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post(
    "/analyze",
    auth,
    upload.fields([
        { name: "resume", maxCount: 1 },
        { name: "linkedin", maxCount: 1 }
    ]),
    async (req, res) => {

        try {

            if (!req.files?.resume || !req.files?.linkedin) {
                return res.status(400).json({
                    message: "Resume and LinkedIn PDF are required."
                });
            }

            const resumeFile = req.files.resume[0];
            const linkedinFile = req.files.linkedin[0];

            const resumeData = await pdfParse(resumeFile.buffer);
            const linkedinData = await pdfParse(linkedinFile.buffer);

            const resumeText = resumeData.text;
            const structuredResume = formatResume(resumeText);
            const linkedinText = linkedinData.text;

            const githubUrl = req.body.github;
            const githubUserName = await extractGithubUsername(githubUrl);
            const mainReadmeData = await getMainRepoReadme(githubUserName);
            const formattedReadme = await formatGithubReadme(mainReadmeData);
            const formatLinkedin = await formatLinkedinText(linkedinText);

            const analysis = await analyzeCareerProfile({
                resume: structuredResume,
                linkedin: formatLinkedin,
                github: formattedReadme,
            });
            console.log("Analysis : "+ analysis);
            return res.status(200).json({
                message: "Profile data received successfully.",
                data: {
                    analyse:analysis
                }
            });

        } catch (error) {

            console.error("ANALYZE ERROR:", error);

            return res.status(500).json({
                message: "Failed to process profile.",
                error: error.message
            });
        }
    }
);

module.exports = router;