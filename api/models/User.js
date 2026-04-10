const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: {
    dsa: { type: Number, default: 0 },
    dbms: { type: Number, default: 0 },
    os: { type: Number, default: 0 }
  },
  streak: { type: Number, default: 1 },
  completedTopics: [{ type: String }],
  xp: { type: Number, default: 0 },
  notes: [{
    id: { type: Number, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
