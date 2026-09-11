const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/database/connection");
const authRouter = require("./src/routes/authRouter");
const userRouter = require("./src/routes/userRouter");
require("dotenv").config();

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials:true
}));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req,res) => {
    res.send("Working.....");
})
app.listen(3000, (req,res) => {
    try {
        connectDB();
        console.log("Server is live and running..")

    } catch (error) {
        console.log("Error :- "+ error.message);
    }
    
});
