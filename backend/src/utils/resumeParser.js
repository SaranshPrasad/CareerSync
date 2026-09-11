

const clean = (text) => {
    return text
        .replace(/\r/g, "")
        .replace(/[ \t]+/g, " ")
        .trim();
};


const getLines = (text) => {
    return text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);
};


// Split comma separated values but ignore commas inside ()
const splitSkills = (text) => {

    const result = [];
    let current = "";
    let depth = 0;

    for (const char of text) {

        if (char === "(") depth++;

        if (char === ")") depth--;

        if (char === "," && depth === 0) {

            if (current.trim()) {
                result.push(current.trim());
            }

            current = "";
        } else {
            current += char;
        }
    }

    if (current.trim()) {
        result.push(current.trim());
    }

    return result;
};


// ========================================
// PERSONAL
// ========================================

const parsePersonal = (text, lines) => {

    const personal = {
        name: lines[0] || "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portfolio: "",
        location: ""
    };


    const email = text.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    if (email) {
        personal.email = email[0];
    }


    const phone = text.match(
        /(?:\+91[-\s]?)?[6-9]\d{9}/
    );

    if (phone) {
        personal.phone = phone[0];
    }


    const linkedin = text.match(
        /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/i
    );

    if (linkedin) {
        personal.linkedin = linkedin[0];
    }


    const github = text.match(
        /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+/i
    );

    if (github) {
        personal.github = github[0];
    }


    return personal;
};


// ========================================
// SECTION EXTRACTOR
// ========================================

const getSection = (lines, startRegex, endRegexes = []) => {

    const startIndex = lines.findIndex(line =>
        startRegex.test(line)
    );

    if (startIndex === -1) {
        return [];
    }


    let endIndex = lines.length;


    for (let i = startIndex + 1; i < lines.length; i++) {

        if (
            endRegexes.some(regex => regex.test(lines[i]))
        ) {
            endIndex = i;
            break;
        }
    }


    return lines.slice(startIndex + 1, endIndex);
};


// ========================================
// SUMMARY
// ========================================

const parseSummary = (lines) => {

    const section = getSection(
        lines,
        /^Professional Summary$/i,
        [
            /^Key Skills/i,
            /^Technical Skills$/i,
            /^Skills$/i,
            /^Professional Experience$/i,
            /^Experience$/i,
            /^Projects$/i,
            /^Education$/i,
            /^Achievements/i
        ]
    );

    return section.join(" ");
};


// ========================================
// SKILLS
// ========================================

const parseSkills = (lines) => {

    const section = getSection(
        lines,
        /^Key Skills\s*\/?\s*Core Competencies$/i,
        [
            /^Professional Experience$/i,
            /^Experience$/i,
            /^Projects$/i,
            /^Education$/i,
            /^Achievements/i
        ]
    );


    const skills = {
        languages: [],
        frontend: [],
        backend: [],
        databases: [],
        tools: [],
        core: []
    };


    for (const line of section) {

        // Remove bullet
        const cleanedLine = line
            .replace(/^[•●▪◦-]\s*/, "")
            .trim();


        const match = cleanedLine.match(
            /^([^:]+):\s*(.+)$/
        );


        if (!match) continue;


        const category = match[1]
            .toLowerCase()
            .trim();


        const values = splitSkills(match[2]);


        if (category.includes("language")) {

            skills.languages.push(...values);

        } else if (category.includes("frontend")) {

            skills.frontend.push(...values);

        } else if (category.includes("backend")) {

            skills.backend.push(...values);

        } else if (category.includes("database")) {

            skills.databases.push(...values);

        } else if (
            category.includes("tool") ||
            category.includes("platform")
        ) {

            skills.tools.push(...values);

        } else if (
            category.includes("core") ||
            category.includes("strength")
        ) {

            skills.core.push(...values);
        }
    }


    return skills;
};


// ========================================
// EXPERIENCE
// ========================================

const parseExperience = (lines) => {

    const section = getSection(
        lines,
        /^Professional Experience$/i,
        [
            /^Projects$/i,
            /^Education$/i,
            /^Achievements/i
        ]
    );


    const experience = [];


    /*
        PDF gives us something like:

        Full Stack Developer InternFeb 2026 – Jul 2026
        ITGENIXS PVT LTDRanchi, India
        •Engineered...
    */


    for (let i = 0; i < section.length; i++) {

        const line = section[i];


        const dateMatch = line.match(
            /([A-Za-z]{3,9}\s+\d{4})\s*[–-]\s*([A-Za-z]{3,9}\s+\d{4}|Present)/i
        );


        if (!dateMatch) continue;


        const startDate = dateMatch[1];
        const endDate = dateMatch[2];


        // Everything before the date
        let role = line
            .substring(0, dateMatch.index)
            .trim();


        // Sometimes PDF extraction gives:
        // "Full Stack Developer InternFeb 2026"
        role = role.replace(/Intern$/i, "Intern").trim();


        /*
            Next line:

            ITGENIXS PVT LTDRanchi, India
        */

        let company = "";
        let location = "";


        if (section[i + 1]) {

            const companyLine = section[i + 1]
                .replace(/^[•●▪◦-]\s*/, "")
                .trim();


            /*
                Detect location at the end:

                ITGENIXS PVT LTD
                Ranchi, India
            */

            const locationMatch = companyLine.match(
                /(.+?)(Ranchi,\s*India|Hyderabad,\s*India|Bangalore,\s*India|Delhi,\s*India|Jaipur,\s*India|Mumbai,\s*India|India)$/i
            );


            if (locationMatch) {

                company = locationMatch[1].trim();

                location = locationMatch[2].trim();

            } else {

                /*
                    Generic fallback:
                    split before known "City, Country" pattern
                */

                const genericLocation = companyLine.match(
                    /(.+?)([A-Z][a-z]+,\s*[A-Z][a-z]+)$/
                );


                if (genericLocation) {

                    company = genericLocation[1].trim();

                    location = genericLocation[2].trim();

                } else {

                    company = companyLine;
                }
            }
        }


        const bullets = [];


        /*
            Collect bullets until next date
        */

        for (let j = i + 2; j < section.length; j++) {

            if (
                /[A-Za-z]{3,9}\s+\d{4}\s*[–-]\s*[A-Za-z]{3,9}\s+\d{4}/i
                .test(section[j])
            ) {
                break;
            }


            const bullet = section[j]
                .replace(/^[•●▪◦-]\s*/, "")
                .trim();


            if (bullet) {
                bullets.push(bullet);
            }
        }


        experience.push({
            role,
            company,
            location,
            startDate,
            endDate,
            bullets
        });
    }


    return experience;
};


// ========================================
// PROJECTS
// ========================================

const parseProjects = (lines) => {

    const section = getSection(
        lines,
        /^Projects$/i,
        [
            /^Education$/i,
            /^Achievements/i
        ]
    );


    const projects = [];

    let current = null;


    for (const line of section) {

        const cleaned = line
            .replace(/^[•●▪◦-]\s*/, "")
            .trim();


        /*
            A project title usually comes before
            technology line and bullets.
        */

        if (!current) {

            current = {
                name: cleaned,
                technologies: [],
                bullets: []
            };

            continue;
        }


        if (/^[•●▪◦-]/.test(line)) {

            current.bullets.push(cleaned);

            continue;
        }


        if (
            /React|Node|Express|MongoDB|Python|Java|C\+\+|LangChain|LanceDB|Socket\.IO|Redis|PostgreSQL/i
                .test(cleaned)
        ) {

            current.technologies = splitSkills(cleaned);

            continue;
        }


        if (current.bullets.length > 0) {

            projects.push(current);

            current = {
                name: cleaned,
                technologies: [],
                bullets: []
            };
        }
    }


    if (current) {
        projects.push(current);
    }


    return projects;
};


// ========================================
// EDUCATION
// ========================================

const parseEducation = (lines) => {

    const section = getSection(
        lines,
        /^Education$/i,
        [
            /^Achievements/i,
            /^Leadership/i
        ]
    );


    const education = [];


    for (let i = 0; i < section.length; i++) {

        const line = section[i];


        const yearMatch = line.match(
            /(20\d{2})\s*[–-]\s*(20\d{2})/
        );


        if (!yearMatch) continue;


        const startYear = Number(yearMatch[1]);
        const endYear = Number(yearMatch[2]);


        /*
            Example:

            Manipal University Jaipur2026 – 2028

            Everything before date = institution
        */

        const institution = line
            .substring(0, yearMatch.index)
            .trim();


        /*
            Next line:

            Master of Computer Applications (Pursuing)Jaipur, India
        */

        let degree = "";
        let location = "";
        let grade = "";


        if (section[i + 1]) {

            const nextLine = section[i + 1].trim();


            const locationMatch = nextLine.match(
                /^(.*?)([A-Z][a-z]+,\s*[A-Z][a-z]+)$/
            );


            if (locationMatch) {

                degree = locationMatch[1].trim();

                location = locationMatch[2].trim();

            } else {

                degree = nextLine;
            }


            const gradeMatch = degree.match(
                /(?:CGPA|GPA|Percentage|%)[:\s-]*[\d.]+(?:\/10)?/i
            );


            if (gradeMatch) {
                grade = gradeMatch[0];
            }
        }


        education.push({
            institution,
            degree,
            startYear,
            endYear,
            grade,
            location
        });
    }


    return education;
};


// ========================================
// ACHIEVEMENTS
// ========================================

const parseAchievements = (lines) => {

    const section = getSection(
        lines,
        /^Achievements\s*&\s*Leadership$/i,
        []
    );


    const achievements = [];

    let current = "";


    for (const line of section) {

        const isBullet = /^[•●▪◦-]/.test(line);


        if (isBullet) {

            if (current) {
                achievements.push(current.trim());
            }

            current = line
                .replace(/^[•●▪◦-]\s*/, "")
                .trim();

        } else {

            // PDF wrapped the same bullet onto next line
            current += " " + line;
        }
    }


    if (current) {
        achievements.push(current.trim());
    }


    return achievements;
};


// ========================================
// MAIN
// ========================================

const formatResume = (resumeText) => {

    const text = clean(resumeText);

    const lines = getLines(text);


    return {

        personal: parsePersonal(text, lines),

        summary: parseSummary(lines),

        skills: parseSkills(lines),

        experience: parseExperience(lines),

        projects: parseProjects(lines),

        education: parseEducation(lines),

        achievements: parseAchievements(lines),

        rawText: resumeText
    };
};


module.exports = formatResume;

