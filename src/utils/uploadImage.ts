import { format } from "util";
const uuid = require('uuid-v4');

const admin = require("../config/firebaseAdmin").firebase_admin_connect();

export const uploadImageToStorage = (file:any) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${Date.now()}_${file.originalname}`;

    let fileUpload = admin.storage().bucket().file(newFileName);
    const tokenImage = uuid()
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: tokenImage
        },
    
        contentType: file.mimetype,
        cacheControl: 'public, max-age=31536000',
      }
    });

    blobStream.on('error', (error:any) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      console.log(tokenImage)
      const url = format(`https://firebasestorage.googleapis.com/v0/b/${admin.storage().bucket().name}/o/${fileUpload.name}?alt=media&token=${tokenImage}`);
      console.log({url})
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}