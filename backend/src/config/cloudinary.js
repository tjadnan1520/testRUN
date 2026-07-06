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
    let resourceType = "auto";
    let folder = "basic-social-app";

    if (file.mimetype.startsWith("image/")) {
      folder = "basic-social-app/images";
    } else if (file.mimetype === "application/pdf") {
      folder = "basic-social-app/pdfs";
    } else {
      folder = "basic-social-app/documents";
    }

    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

export default cloudinary;