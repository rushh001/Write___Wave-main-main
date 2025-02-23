const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const Blog = require('./models/blog');

const UserRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app = express();
const port = process.env.PORT || 8000; // ✅ Dynamic port for Vercel

// ✅ Connect to MongoDB with Error Handling
mongoose
    .connect("mongodb+srv://p2130671:9bAtbItrWUEQiWhY@cluster0.2cmu0.mongodb.net/", {
        dbName: "WriteWave",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => {
        console.error(" MongoDB connection error:", err);
        process.exit(1); // Stop server if DB connection fails
    });

// ✅ Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// ✅ Middleware
app.use(express.urlencoded({ extended: true })); // Allow nested objects
app.use(express.json()); // ✅ To parse JSON requests
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token")); // ✅ Correctly using middleware
app.use(express.static(path.resolve("./public")));

// ✅ Routes
app.use("/user", UserRoute);
app.use("/blog", blogRoute);
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});

// ✅ Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
