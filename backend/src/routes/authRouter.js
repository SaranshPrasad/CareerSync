
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/user");
router.use(express.json());

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
        return res.status(401).json({message:"Please provide email and password"});
    }
    const existingUser = await User.findOne({email: email});
    if(!existingUser) return res.status(401).json({message:"User not found invalid credentials.."});
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });
    
    const token = jwt.sign({id:existingUser._id}, "CareerSyncMadeByMe", { expiresIn: '30d' });
    res.status(200).json({
        message:"Login Sucessfull",
        token,
        user:existingUser
    });
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
});

router.post("/signup", async (req,res) => {
    const {email, password, repassword} = req.body;
    try {
        if(password !== repassword) return res.status(401).json({message:"Re-Password not matched.."});
        const user = await User.findOne({email:email});
        if(user) return res.status(401).json({message:"User already found!, Try with Login."});
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            email:email,
            password:hashedPassword
        });
        await newUser.save();
        const token = jwt.sign({id:newUser._id}, "CareerSyncMadeByMe", {expiresIn:"30d"});
        res.status(200).json({message:"Signup sucessfull.", user:newUser, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;