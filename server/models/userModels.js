const mongoose = require("mongoose");
const express = require("express");

const chatAppSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 40,
  },
  confirmPassword: {
    type: String,
    require: true,
    min: 6,
    max: 40,
  },
  isAvtarImageSet: {
    type: Boolean,
    default: false,
  },
  avtarImage: {
    type: String,
    default: "",
  },
});

const user = new mongoose.model("user", chatAppSchema);

module.exports = user;
