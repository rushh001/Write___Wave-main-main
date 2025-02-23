const { Router } = require('express');
const User = require('../models/user');

const router = Router();

// ✅ GET Signup Page
router.get("/signup", (req, res) => {
    return res.render("signup", { errorMessage: null });
});

// ✅ POST Signup Form (Handles Validation & Error Handling)
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // ✅ 1. Validate Input Fields
        if (!fullName || !email || !password) {
            return res.render("signup", { errorMessage: "All fields are required!" });
        }

        // ✅ 2. Check if Email is Already Registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("signup", { errorMessage: "Email is already registered!" });
        }

        // ✅ 3. Create New User
        await User.create({ fullName, email, password });

        // ✅ 4. Redirect to Signin Page
        return res.redirect("/user/signin");
    } catch (error) {
        console.error("❌ Signup Errrror:", error);
        return res.render("signup", { errorMessage: error.message });
    }
});


// ✅ GET Signin Page
router.get("/signin", (req, res) => {
    return res.render("signin", { errorMessage: null });
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");

    } catch (error) {
        return res.render("signin", {
            errorMessage: "Incorrect Password",
        })
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})


module.exports = router;
