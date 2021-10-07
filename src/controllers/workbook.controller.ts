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

  let id = req.params.id;

  const selectedWorkbook = await Workbook.findOne({ id: id});

    if (req.currentUser.email != selectedWorkbook.author.email)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let { title, published, edition, language, price, currency, status, tags, description } = req.body;
  
  let updateWorkbook = {
    title,
    published, 
    edition, 
    language, 
    price, 
    currency, 
    status, 
    tags, 
    description
};

await Workbook.update(id, updateWorkbook)

  .catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updateWorkbook);
});
  

const remove = catchAsync(async (req: any, res: any) => {
  const removedWorkbook = await Workbook.delete({ id: req.params.id});
  res.status(httpStatus.OK).json({ removedWorkbook });
});

module.exports = {
  getAll,
  get,
  put,
  post,
  remove,
};