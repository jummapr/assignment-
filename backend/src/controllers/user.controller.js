import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = asyncHandler(async (req, res) => {
  // get data from user
  // validate the input
  // check if username and email exist.
  // get file from user
  // upload the file on cloudinary
  // save the data in database
  // send thanks email to users
  // send response

  // get data from user
  const { name, username, email, password, location } = req.body;

  if (!name || !username || !email || !password || !location) {
    throw new ApiError(400, "All field are required");
  }

  // email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const CheckEmailValid = isValidEmail(email);

  if (!CheckEmailValid) {
    throw new ApiError(400, "Email is not valid");
  }

  // check if username and email exist.
  let checkUser = await User.findOne(
    { $or: [{ username }, { email }] },
  );

  if (checkUser) {
    throw new ApiError(400, "User already exist");
  }

  let uploadAvatar;
  // get file from user
  if (req.file) {
    const file = req.file;
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;

    // upload the file on cloudinary
    uploadAvatar = await uploadOnCloudinary(dataURI);

    if (!uploadAvatar) {
      throw new ApiError(400, "Error while uploading the avatar");
    }
  }

  // save the data in database
  const user = await User.create({
    name,
    username,
    email,
    password,
    location,
    avatar: uploadAvatar?.secure_url,
  });

  const data = {
    user: {
      name: user.username,
    },
  };
  // send thanks email to users
  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation.mail.ejs"),
    data
  );
  try {
    await sendMail({
      email: user.email,
      subject: "Thanks for registering with our website",
      template: "activation.mail.ejs",
      data,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, `Thank you for registering with our website. please check your email.`, user));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while sending the email");
  }
});
