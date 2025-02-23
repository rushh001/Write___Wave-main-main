const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImage: {
            data: Buffer, // ✅ Store image as binary data
            contentType: String, // ✅ Store MIME type (image/png, image/jpeg, etc.)
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }

    },
    { timestamps: true },
)

const Blog = model("blog", blogSchema);

module.exports = Blog;   