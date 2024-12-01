const express = require("express");
const authMiddleware = require("../components/middleware/authMiddleware");
const BlogModal = require("../modal/BlogModal");
const router = express.Router();

router.post("/create-post", authMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const { title, content } = req.body;
    if (!title || title.length < 5) {
      return res.status(400).json({
        error: "Title is required and must be at least 5 characters long",
      });
    }
    if (!content || content.length < 10) {
      return res.status(400).json({
        error: "Content is required and must be at least 10 characters long",
      });
    }
    const newBlog = new BlogModal({
      title,
      content,
      author: userData.id,
    });
    const saveBlog = await newBlog.save();
    return res.status(201).json({ message: "Data saved", data: saveBlog });
  } catch (error) {}
});
router.get("/blogs", async (req, res) => {
  try {
    // const blogs = await BlogModal.find();
    const blogs = await BlogModal.find(); // Populate the 'author' field with 'name'
    if (blogs.length == 0)
      return res.status(404).json({ message: "No blogs found" });
    return res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModal.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    return res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
