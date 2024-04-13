import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  avatar: {
    type: String, // Cloudinary URL
  },
  location: {
    type: String,
    required: false,
  },
},{
  timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
  
    next();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    // console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
  };

export const User = mongoose.model("User", userSchema);