import { env } from "./env.js";
import { saveFileToCloudinary } from "./saveFileToCloudinary.js";
import { saveFileToUploadDir } from "./saveFileToUploadDir.js";

export const savePhoto = async (photo) => {
  let photoURL;
  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoURL = await saveFileToCloudinary(photo);
    } else {
      photoURL = await saveFileToUploadDir(photo);
    }
  }

return photoURL;
};

export default savePhoto;
