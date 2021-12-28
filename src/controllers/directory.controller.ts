export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');

/** Schemas */
import { User } from "../models/User";

const getAll = catchAsync(async (req: any, res: any) => {
  const allCoaches = await User.find({
    where: {
      isCoach:true
    }
  });
  res.status(httpStatus.OK).json(allCoaches);
});


module.exports = {
  getAll,
};