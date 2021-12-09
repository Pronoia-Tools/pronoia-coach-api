const httpStatus = require('http-status');

const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');

import { Answer } from "../models/Answers";

const saveAnswer = catchAsync(async (req: any, res: any) => {
  let { answer } = req.body;
  let { idQuestion } = req.params
  const newAnswer = new Answer();
  
  newAnswer.answer = answer;
  newAnswer.question = idQuestion;
  newAnswer.owner = req.currentUser.id;

  let newAnswerSaved = await newAnswer.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(newAnswerSaved);
});

const editAnswer = catchAsync(async (req: any, res: any) => {
  
  let { idQuestion } = req.params
  const selectedAnswer = await Answer.findOne({
    where: {
      id: idQuestion
    },
    relations: ['owner']
  });

  if(!selectedAnswer)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The answer does not exist"
    );

  if (req.currentUser.id != selectedAnswer.owner.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let { answer } = req.body;
  selectedAnswer.answer = answer;
  

  let newAnswerSaved = await selectedAnswer.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(newAnswerSaved);
});

const getAllAnswers = catchAsync(async (req: any, res: any) => {

  const allAnswers = await Answer.find({
    relations: ['owner', 'question']
  })
  res.status(httpStatus.OK).json(allAnswers);
});

const getQuestionAnswer = catchAsync(async (req: any, res: any) => {
  
  const answer = await Answer.findOne({
    where:{
      question: req.params.idQuestion,
      owner:req.currentUser.id
    },
    relations: ['owner', 'question']
  })

  res.status(httpStatus.OK).json(answer);
});

const removeAnswer = catchAsync(async (req: any, res: any) => {

  let { idQuestion } = req.params
  const selectedAnswer = await Answer.findOne({
    where: {
      id: idQuestion
    },
    relations: ['owner']
  });

  if(!selectedAnswer)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The answer does not exist"
    );

  if (req.currentUser.id != selectedAnswer.owner.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to remove answer"
    );



  let removedAnswer = await selectedAnswer.remove().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  
  res.status(httpStatus.OK).json(removedAnswer);

});

module.exports = {
  saveAnswer,
  editAnswer,
  getAllAnswers,
  getQuestionAnswer,
  removeAnswer
};