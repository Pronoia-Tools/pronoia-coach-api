export {};
/** Node Modules */
const httpStatus = require("http-status");

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

/** Schemas */
import { Question } from "../models/Questions";

const getAll = catchAsync(async (req: any, res: any) => {
  const selectedQuestions = await Question.find({
    where: {
      unit: req.body.unit,
    },
    relations: ["unit"],
  });
  res.status(httpStatus.OK).json(selectedQuestions);
});

const get = catchAsync(async (req: any, res: any) => {
  const selectedQuestion = await Question.findOne({ id: req.params.id });
  res.status(httpStatus.OK).json({ selectedQuestion });
});

const post = catchAsync(async (req: any, res: any) => {
  let { question, answer, unit } = req.body;

  if (!question || !unit) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Missing field");
  }
  const sendQuestion = new Question();
  sendQuestion.question = question;
  sendQuestion.unit = unit;

  await sendQuestion.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(sendQuestion);
});

const put = catchAsync(async (req: any, res: any) => {
  const selectedQuestion = await Question.findOne({
    where: {
      unit: req.body.unit,
    },
    relations: ["unit"],
  });

  if (!selectedQuestion)
    throw new ApiError(httpStatus.BAD_REQUEST, "The question does not exist");

  let { question, answer } = req.body;

  selectedQuestion.question = question;

  let updatedQuestion = await selectedQuestion.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedQuestion);
});

const remove = catchAsync(async (req: any, res: any) => {
  const selectedQuestion = await Question.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!selectedQuestion)
    throw new ApiError(httpStatus.BAD_REQUEST, "The question does not exist");

  let removedQuestion = await selectedQuestion.remove().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  removedQuestion.id = Number(req.params.id);
  res.status(httpStatus.OK).json(removedQuestion);
});

module.exports = {
  get,
  getAll,
  post,
  put,
  remove,
};
