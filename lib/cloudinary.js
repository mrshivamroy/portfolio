import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function uploadToCloudinary(file, folder) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // ✅ contains secure_url + public_id
      }
    ).end(buffer);
  });
}

export async function deleteFromCloudinary(publicId) {
  await cloudinary.uploader.destroy(publicId);
}

// lib/cloudinary.js
export function getPublicIdFromUrl(url) {
  if (!url) return null;

  try {
    // Remove Cloudinary base URL
    // Example: https://res.cloudinary.com/<cloud>/image/upload/v12345/Portfolio/profile/abc.jpg
    const parts = url.split("/");
    const fileName = parts.pop();                 // abc.jpg
    const folder = parts.slice(-2).join("/");    // Portfolio/profile
    const publicId = `${folder}/${fileName}`.replace(/\.[^/.]+$/, ""); // remove extension
    return publicId;
  } catch (err) {
    console.error("Failed to extract publicId from URL:", url, err);
    return null;
  }
}

export default cloudinary;