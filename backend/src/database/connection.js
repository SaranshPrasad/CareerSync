
const mongoose = require("mongoose");
const dns = require("dns")
dns.setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected...")
    } catch (error) {
        console.log("Error :- "+error.message);
    }
}

module.exports = connectDB;