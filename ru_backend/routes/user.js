const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Feed = require("../models/Feed");

// -------------------- Wishlist Routes --------------------

router.post("/wishlist", authMiddleware, async (req, res) => {
  const { title, author, cover } = req.body;

  if (!title || !author || !cover) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findById(req.user.userId);
    const alreadyExists = user.wishlist.some(
      (book) => book.title === title && book.author === author
    );

    if (alreadyExists) {
      return res.status(409).json({ message: "Book already in wishlist" });
    }

    user.wishlist.push({ title, author, cover });
    await user.save();

    res.status(200).json({ message: "Book added to wishlist" });
  } catch (err) {
    console.error("Wishlist Save Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ wishlist: user.wishlist || [] });
  } catch (err) {
    console.error("Fetch Wishlist Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/wishlist", authMiddleware, async (req, res) => {
  const { title, author } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    user.wishlist = user.wishlist.filter(
      (book) => !(book.title === title && book.author === author)
    );
    await user.save();

    res.status(200).json({ message: "Book removed from wishlist" });
  } catch (err) {
    console.error("Wishlist Remove Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Currently Reading Routes --------------------

router.post("/current-reading", authMiddleware, async (req, res) => {
  const { title, author, cover } = req.body;

  if (!title || !author || !cover) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findById(req.user.userId);

    const alreadyExists = user.currentlyReading.some(
      (book) => book.title === title && book.author === author
    );

    if (alreadyExists) {
      return res
        .status(409)
        .json({ message: "Book already in currently reading list" });
    }

    user.currentlyReading.push({ title, author, cover, progress: 0 });
    await user.save();

    res.status(200).json({ message: "Book added to currently reading" });
  } catch (err) {
    console.error("Start Reading Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/current-reading", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ currentlyReading: user.currentlyReading || [] });
  } catch (err) {
    console.error("Fetch Current Reading Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/current-reading", authMiddleware, async (req, res) => {
  const { title, author, progress } = req.body;

  if (progress === undefined) {
    return res.status(400).json({ message: "Progress is required" });
  }

  try {
    const user = await User.findById(req.user.userId);
    const book = user.currentlyReading.find(
      (b) => b.title === title && b.author === author
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.progress = progress;
    await user.save();

    res.status(200).json({ message: "Progress updated" });
  } catch (err) {
    console.error("Update Progress Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/current-reading", authMiddleware, async (req, res) => {
  const { title, author } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    user.currentlyReading = user.currentlyReading.filter(
      (book) => !(book.title === title && book.author === author)
    );

    await user.save();
    res.status(200).json({ message: "Book removed from currently reading" });
  } catch (err) {
    console.error("Remove Current Reading Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Matches Route --------------------

router.get("/matches", authMiddleware, async (req, res) => {
  try {
    const me = await User.findById(req.user.userId).lean();
    if (!me) return res.status(404).json({ message: "User not found" });

    const matches = await User.find({
      _id: { $ne: me._id },
      $or: [
        { genres: { $in: me.genres } },
        { "wishlist.title": { $in: me.wishlist.map((b) => b.title) } },
      ],
    })
      .select("fullname username genres wishlist profilePic")
      .lean();

    const result = matches.map((u) => ({
      id: u._id,
      name: u.fullname,
      genres: u.genres,
      favBook:
        (u.wishlist.find((b) =>
          me.wishlist.some((m) => m.title === b.title)
        )?.title || u.wishlist[0]?.title || ""),
      avatar: u.profilePic || "https://randomuser.me/api/portraits/lego/1.jpg",
    }));

    res.status(200).json({ matches: result });
  } catch (err) {
    console.error("Match Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Feed Routes --------------------
// Create post
router.post("/feed", authMiddleware, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Content required" });
  try {
    const post = new Feed({ user: req.user.userId, content });
    await post.save();
    res.status(201).json({ message: "Post created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch posts
router.get("/feed", authMiddleware, async (req, res) => {
  try {
    const posts = await Feed.find()
      .sort({ createdAt: -1 })
      .populate("user", "username profilePic")
      .lean();
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete post
router.delete("/feed/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Feed.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });
    await Feed.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
