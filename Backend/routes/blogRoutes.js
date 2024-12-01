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

module.exports = router;
