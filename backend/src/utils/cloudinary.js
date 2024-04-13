import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            return null;
        }

        // upload the file on cloudinary
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: "assignment-images",
        });

        // console.log(result, "Result");
        // fill has been uploaded
        console.log("File has been uploaded", result.url);
        return result;
    } catch (error) {
        console.log(error)
        return null;    
    }
};

export const deleteTheOldPicture= async (file) => {
    try {
        if(!file) {
            return null;
        }
       const result = await cloudinary.uploader.destroy(file);

       return result;
    } catch (error) {
        console.log("Error while deleting the old image")
        return null;
    }
}

export default uploadOnCloudinary;

