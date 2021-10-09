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

/** Sample data */
const unit = require('../utils/sampleUnit');

const getAll = catchAsync(async (req: any, res: any) => {
  const selectedWorkbooks = await Workbook.find({ 
    where: {
      author: req.currentUser
    },
    relations: ['author']
  });
  res.status(httpStatus.OK).json(selectedWorkbooks);
});

const get = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({ id: req.params.id});
  res.status(httpStatus.OK).json({ selectedWorkbook });
});

const post = catchAsync(async (req: any, res: any) => {
  let { title, published, edition, language, price, currency, status, tags, description } = req.body;
  
  const workbook = new Workbook();
  workbook.title = title;
  workbook.published = published;
  workbook.edition = edition;
  workbook.language = language;
  workbook.price = price;
  workbook.currency = currency;
  workbook.status = status;
  workbook.tags = tags;
  workbook.description = description;
  workbook.author = req.currentUser;

  await workbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(workbook);

});

const put = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let { title, published, edition, language, price, currency, status, tags, description } = req.body;

  selectedWorkbook.title = title;
  selectedWorkbook.published = published;
  selectedWorkbook.edition = edition;
  selectedWorkbook.language = language;
  selectedWorkbook.price = price;
  selectedWorkbook.currency = currency;
  selectedWorkbook.status = status;
  selectedWorkbook.tags = tags;
  selectedWorkbook.description = description;
 
  let updatedWorkbook = await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedWorkbook);
});
const putImage = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );
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
  
const remove = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );
  
  let removedWorkbook = await selectedWorkbook.remove().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  removedWorkbook.id = Number(req.params.id);
  res.status(httpStatus.OK).json(removedWorkbook);

});

// UNITS
const getUnitAll = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({ 
    where: {
      author: req.currentUser,
      id: req.params.workbookId
    },
    relations: ['author', 'units']
  });
  
  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  if (selectedWorkbook.units.length === 0) {
    const firstUnit = new Unit();
    firstUnit.name = "First Unit";
    firstUnit.contents = unit;

    await firstUnit.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });

    selectedWorkbook.units.push(firstUnit);

    await selectedWorkbook.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
  }
  
  res.status(httpStatus.OK).json(selectedWorkbook);
});

const putUnit = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({ 
    where: {
      author: req.currentUser,
      id: req.params.workbookId
    },
    relations: ['author', 'units']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let selectedUnit = selectedWorkbook.units.find(x => x.id === Number(req.params.unitId));

  if(!selectedUnit)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not have the unit"
    );

  let { name, contents } = req.body;

  selectedUnit.name = name;
  selectedUnit.contents = contents;
 
  let updatedUnit = await selectedUnit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedUnit);
});
  

module.exports = {
  getAll,
  get,
  put,
  post,
  remove,
  getUnitAll,
  putUnit,
  putImage
};