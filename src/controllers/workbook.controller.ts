export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const admin = require("../config/firebaseAdmin").firebase_admin_connect();

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
    relations: ['author','units']
  });
  res.status(httpStatus.OK).json(selectedWorkbooks);
});

const get = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({
    where:{
      id: req.params.id
    },
    relations: ['author', 'units']
  });
  res.status(httpStatus.OK).json({ selectedWorkbook });
});

const post = catchAsync(async (req: any, res: any) => {
  let { title, published, edition, language, price, currency, status, tags, description, image } = req.body;
  
  const workbook = new Workbook();
  workbook.title = title;
  workbook.image = image;
  workbook.published = published;
  workbook.edition = edition;
  workbook.language = language;
  workbook.price = price;
  workbook.currency = currency;
  workbook.status = status;
  workbook.tags = tags;
  workbook.description = description;
  workbook.author = req.currentUser;

  let newWorkbook = await workbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(newWorkbook);

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

  let { title, published, edition, language, price, currency, status, tags, description, image, structure } = req.body;

  selectedWorkbook.title = title;
  selectedWorkbook.image = image;
  selectedWorkbook.published = published;
  selectedWorkbook.edition = edition;
  selectedWorkbook.language = language;
  selectedWorkbook.price = price;
  selectedWorkbook.currency = currency;
  selectedWorkbook.status = status;
  selectedWorkbook.tags = tags;
  selectedWorkbook.description = description;
  selectedWorkbook.structure = structure;
 
  console.log(selectedWorkbook)

  let updatedWorkbook = await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedWorkbook);
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
    firstUnit.owner = req.currentUser;
    firstUnit.contents = unit;

    await firstUnit.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });

    selectedWorkbook.units.push(firstUnit);
    
    if(!selectedWorkbook.structure.tree) {
      selectedWorkbook.structure.tree =[]
    }
    selectedWorkbook.structure.tree.push({
      text: 'My first Content', 
      type:'content',
      id: firstUnit.id
    })

    await selectedWorkbook.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
  }
  
  res.status(httpStatus.OK).json(selectedWorkbook);
});

const postUnit = catchAsync(async (req: any, res: any) => {
  let { title } = req.body;

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

  const unit = new Unit();
  unit.name = title

  await unit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  selectedWorkbook.units.push(unit);
  
  await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json({unit: unit, workbook: selectedWorkbook});
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
  postUnit,
  putUnit
};