export function generateCloudinaryUrl(publicId, options = {}) {
    const transformation = options.transformation ? options.transformation : '';
    const format = options.format ? options.format : 'jpg'; // Default format is JPG
  
    const baseUrl = import.meta.env.VITE_CLOUDINARY_URL;
    const imageUrl = `${baseUrl}/${transformation}/${publicId}.${format}`;
  
    return imageUrl;
  }
