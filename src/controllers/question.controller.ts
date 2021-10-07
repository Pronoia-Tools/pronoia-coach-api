export {};
/** Node Modules */
const httpStatus = require("http-status");

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

/** Schemas */
import { Question } from "../models/Questions";

const get = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Question.findOne({ id: req.params.id });
  res.status(httpStatus.OK).json({ selectedWorkbook });
});

const post = catchAsync(async (req: any, res: any) => {
  let { question, answer, workbookId } = req.body;
  //console.log(req);
  const sendQuestion = new Question();
  sendQuestion.question = question;
  sendQuestion.answer = answer;
  sendQuestion.workbook = workbookId;

  await sendQuestion.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(sendQuestion);
});

const put = catchAsync(async (req: any, res: any) => {
  let { question, answer, workbookId } = req.body;
  console.log(req);
  const sendQuestion = new Question();
  sendQuestion.question = question;
  sendQuestion.answer = answer;
  sendQuestion.workbook = workbookId;

  await sendQuestion.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(sendQuestion);
});

const remove = catchAsync(async (req: any, res: any) => {
  Question.delete({ id: req.params.id }).catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  res.status(httpStatus.OK).json("deleted");
});

module.exports = {
  get,
  post,
  remove,
};
