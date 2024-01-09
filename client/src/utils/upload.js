/*import axios from "axios";

const upload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "projectA");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/dpkkaacjk/image/upload", formData);
    const { url } = response.data;
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image.");
  }
};

export default upload;*/
import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "projectA"); // Assuming this is your unsigned preset

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dpkkaacjk/image/upload", data);
    const { url } = res.data;
    return url;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err; // Important: Rethrow the error so it can be caught in the calling function.
  }
};

export default upload;
