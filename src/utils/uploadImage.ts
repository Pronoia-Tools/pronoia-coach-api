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

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: uuid()
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
      const url = format(`https://storage.googleapis.com/${admin.storage().bucket().name}/${fileUpload.name}`);
      console.log({url})
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}