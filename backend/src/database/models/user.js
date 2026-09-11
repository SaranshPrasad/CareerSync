const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    bio:{
        type:String,
    },
    resume:{
       type: mongoose.Schema.Types.Mixed,
       default:null
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    history:{
        type:String
    },
    credit:{
        type:Number,
        default: 3
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;