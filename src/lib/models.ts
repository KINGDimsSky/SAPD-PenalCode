import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password : {
    type: String,
    required: true,
  },
  role : {
    type: String,
    required: true,
    default: "User",
  },
  Nickname : {
    type: String,
    default: "Guest",
  },
  image: {
    type: String,
    default: '/user.png'
  },
  badge : {
    type: String,
    default: 'none',
  },
  faction : {
    type: String,
    default: 'SAPD',
  },
  rank : {
    type: String,
    default: 'Police Officer I',
  },
  ifNewAccount : {
    type: Boolean,
    default: true,
  }
});

export const User = mongoose.models?.users || mongoose.model("users", UsersSchema);