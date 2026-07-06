import { v2 as cloudinary } from "cloudinary";
import CloudinaryStorage from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "upload_image_file",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

export default cloudinary;