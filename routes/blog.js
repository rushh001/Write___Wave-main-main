const { Router } = require('express');
const multer = require('multer');
const Blog = require('../models/blog');
const Comment = require('../models/comment');  // ✅ Renamed for clarity
const path = require("path");
const router = Router();

// ✅ Configure Multer Storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.resolve('./public/uploads/'));  // ✅ Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const fileName = `${Date.now()}-${file.originalname}`;
//         cb(null, fileName);
//     }
// });

// const upload = multer({ storage: storage });

// ✅ Route to Render Blog Creation Form
router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: req.user,  // ✅ Ensure req.user exists
    });
});
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().populate("createdBy");

        // Convert images to base64 for rendering in EJS
        const processedBlogs = blogs.map(blog => ({
            ...blog._doc,
            coverImage: blog.coverImage ? {
                contentType: blog.coverImage.contentType,
                data: blog.coverImage.data.toString("base64")
            } : null
        }));

        return res.render("home", { blogs: processedBlogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).send("Internal Server Error");
    }
});


// ✅ Route to Fetch Blog Details and Comments
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        // ✅ Convert image to Base64 if it exists
        let coverImageBase64 = null;
        if (blog.coverImage && blog.coverImage.data) {
            coverImageBase64 = `data:${blog.coverImage.contentType};base64,${blog.coverImage.data.toString("base64")}`;
        }

        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

        return res.render("blog", {
            user: req.user,
            blog,
            coverImageBase64,  // ✅ Ensure this variable is always passed
            comments,
        });

    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).send("Internal Server Error");
    }
});


// ✅ Route to Handle Blog Comments
router.post("/comment/:blogId", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in to comment.");
        }

        const newComment = await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// ✅ Route to Handle Blog Post Submission
const storage = multer.memoryStorage(); // ⚡ Stores file in memory as buffer
const upload = multer({ storage: storage });

// ✅ Route to Create Blog with Image Stored in Database
router.post('/', upload.single("coverImage"), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send("Unauthorized: Please log in to create a blog.");
        }

        const { title, body } = req.body;

        // ✅ Convert image to Buffer before storing in MongoDB
        let coverImage = null;
        if (req.file) {
            coverImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        const blog = await Blog.create({
            title,
            body,
            createdBy: req.user._id,
            coverImage // ✅ Store image in MongoDB
        });

        return res.redirect(`/blog/${blog._id}`);

    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
