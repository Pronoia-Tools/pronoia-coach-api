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
  let { question } = req.body;

  const sendQuestion = new Question();
  sendQuestion.question = question;
  sendQuestion.author = req.currentUser;

  await sendQuestion.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(sendQuestion);
});

module.exports = {
  get,
  post,
};
