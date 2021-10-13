export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const admin = require("../config/firebaseAdmin").firebase_admin_connect();
const {uploadImageToStorage} = require("../utils/uploadImage")

/** Schemas */
import { Workbook } from "../models/Workbooks";
import { Unit } from "../models/Unit";
import { Image } from "../models/Images";


const getAll = catchAsync(async (req: any, res: any) => {
    const images = await Image.find({ 
        where: {
          owner: req.currentUser
        },
        relations: ['owner']
    });
    res.status(httpStatus.OK).json(images);
});

const postImage = catchAsync(async (req: any, res: any) => {
    console.log('POST')
   
    let file = req.file;
    if (!file) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "You need to insert a image"
      );
    }
  
    
    
    const responseImageUpload = await uploadImageToStorage(file).catch((error:any) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
  
    res.status(httpStatus.OK).json({urlImage:responseImageUpload});
  });
  
const post = catchAsync(async (req: any, res: any) => {

    let files = req.files;
    if (!files) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "You need to insert a image"
        );
    }

    const responses = await Promise.all(
        files.map(async (image:any) => {
            const savedImage = await uploadImageToStorage(image)
            if(!savedImage) return {image: image.originalname, url: null}
            return {image: image.originalname, url: savedImage}
        })
    )

    if (!responses) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Error saving images in storage");
    }

    let responseImages: Image[] =[]

    await Promise.all(responses.map(async (response:any) => {
        if(response.url){
            let newImage = new Image();
            newImage.url = response.url;
            newImage.owner = req.currentUser.id;
            
            newImage = await newImage.save().catch((error: any) => {
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
            });
            responseImages.push(newImage)
        }
      }));
    res.status(httpStatus.OK).json(responseImages);

});
  
module.exports = {
    getAll,
    post
};