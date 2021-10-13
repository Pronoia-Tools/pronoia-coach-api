export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');



/** Schemas */
import { Workbook } from "../models/Workbooks";

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
  const selectedWorkbook = await Workbook.findOne({ 
    where:{
      id: req.params.id
    },
    relations: ['author']
  });
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
  
module.exports = {
  getAll,
  get,
  post
};