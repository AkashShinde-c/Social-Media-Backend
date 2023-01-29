const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SUser' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SUser' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  });
  

  const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'SUser', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const SUser = mongoose.model('SUser', UserSchema);
  const Post = mongoose.model('Post', PostSchema);
  
  module.exports = { SUser, Post };