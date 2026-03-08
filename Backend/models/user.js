const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connect DB")
    })
    .catch(() => {
        console.log("DB not Connect");
    })


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    enrollment: {
        type: Number,
        unique: [true, "allready use this enrollment number"]
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "student"]
    }

})


module.exports = mongoose.model("user", userSchema);