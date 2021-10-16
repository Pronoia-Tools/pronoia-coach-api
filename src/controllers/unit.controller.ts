export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/** Schemas */
import { Unit } from "../models/Unit";
import { Workbook } from "../models/Workbooks";

const getAll = catchAsync(async (req: any, res: any) => {
  const units = await Unit.find({ 
    where: {
      owner: req.currentUser
    },
    relations: ['owner']
  });
  res.status(httpStatus.OK).json(units);
});

const get = catchAsync(async (req: any, res: any) => {
  const selectedUnit = await Unit.findOne({ 
    where:{
      id: req.params.id,
    },
    relations: ['owner']
  });

  if(!selectedUnit)
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "The unit does not exist"
  );

  if (req.currentUser.id != selectedUnit.owner.id)
  throw new ApiError(
    httpStatus.INTERNAL_SERVER_ERROR,
    "You need to be the owner to edit"
  );

  res.status(httpStatus.OK).json( selectedUnit );
});

const post = catchAsync(async (req: any, res: any) => {
  let { title } = req.body;
  
  const unit = new Unit();
  unit.name = title
  unit.owner = req.currentUser.id

  await unit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(unit);

});


const put = catchAsync(async (req: any, res: any) => {

  const selectedUnit = await Unit.findOne({ 
    where: {
      id: req.params.id
    },
    relations: ['owner']
  });

  if(!selectedUnit)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedUnit.owner.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let { name, contents } = req.body;

  selectedUnit.name = name;
  selectedUnit.contents = contents;
 
  let updatedUnit = await selectedUnit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedUnit);
});
  
const remove = catchAsync(async (req: any, res: any) => {

  const selectedUnit = await Unit.findOne({ 
    where: {
      id: req.params.id
    },
    relations: ['owner']
  });

  if(!selectedUnit)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedUnit.owner.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  selectedUnit.deleted = true
 
  let updatedUnit = await selectedUnit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedUnit);
});

module.exports = {
  getAll,
  get,
  post,
  put,
  remove
};