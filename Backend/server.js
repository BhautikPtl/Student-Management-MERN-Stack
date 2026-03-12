const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const userSchema = require("./models/user.js")
const cookieparser = require("cookie-parser");
const { protect, adminonly } = require("./middleware/authmiddleware.js");
require("dotenv").config();



app.use(cors({
    origin: [
      "http://localhost:5173",
    // https://79a7-2409-40c1-2155-dd2-9d19-d440-db95-d42b.ngrok-free.app
    ],
    credentials: true
}));

app.use(cookieparser());
app.use(express.json());


app.post("/registar", async (req, res) => {
    const { enrollment, email, password, name } = req.body;

    const enroll = await userSchema.findOne({ enrollment });

    if (enroll) {
        return res.status(400).json({ message: "Enrollment number already exists" });
    }
    if (!enrollment || !email || !password || !name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!email.includes("@") || !email.includes(".")){
        return res.status(400).json({ message: "Invalid email format" });
    }


    const hashpassword = await bcrypt.hash(password, 10);

    const count = await userSchema.countDocuments();
    const role = count === 0 ? "admin" : "student";

    const user = await userSchema.create({
        enrollment,
        email,
        password: hashpassword,
        name,
        role
    });


    res.status(201).json({ message: "Register New Student" })

})



app.post("/login", async (req, res) => {

    const { enrollment, password, } = req.body;


    const user = await userSchema.findOne({ enrollment });

    if (!user) {
        return res.status(401).json({ message: "Invalid Enrollment Number & Password" });
    }


    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) return res.status(401).json({ message: "Invalid Enrollment Number & Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });


    res.status(200).json({ role: user.role, message: "Login Successfully" });
})


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out" })

})

app.get("/admin-dashboard", protect, adminonly, async (req, res) => {

    const student = await userSchema.find({role:"student"})
    const count = student.length

    res.json({students:student, count: count})
})


app.get("/student-dashboard", protect, async (req, res) => {

    if (req.user.role === "admin") return res.status(403).json({ message: "You Are Not Student" })
    const student = await userSchema.findOne({ _id: req.user.id })
    res.json({ student: student })

})

app.delete("/delete-student/:id", protect, adminonly, async (req, res) => {

    const { id } = req.params;

    await userSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Student deleted successfully" });
});


app.get("/view/:id",protect,adminonly,async(req,res)=>{
    
    const {id}=req.params
    
     const user = await userSchema.findById(id);
    

     res.status(200).json({student :user, message:"View Student Successfully"})
})

app.listen(3000, () => {
    console.log("Server is runing on port http://localhost:3000");

})



