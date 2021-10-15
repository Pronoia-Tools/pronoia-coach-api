const httpStatus = require('http-status');

const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');

import { Report } from "../models/Report"

const post = catchAsync(async (req: any, res: any) => {
  let { report, description, path} = req.body;
  console.log(report,description,path)
  const newReport = new Report();
  newReport.report = report;
  newReport.description = description;
  newReport.path = path;
  newReport.author = req.currentUser;

  let newReportSaved = await newReport.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(newReportSaved);
});
module.exports = {
  post
};