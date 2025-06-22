// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    default: [],
  },
  wishlist: [
    {
      title: String,
      author: String,
      cover: String,
    },
  ],
  currentlyReading: [
    {
      title: String,
      author: String,
      cover: String,
      progress: {
        type: Number,
        default: 0,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
