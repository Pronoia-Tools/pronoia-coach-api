/** Node Modules */
const httpStatus = require('http-status');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");


/** Custom Modules */
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');



/** Schemas */
const Workbook = require('../models/workbook');

const get = async (req, res) => {

}
  
const post = async (req, res) => {
  let body = req.body;
  let { title, price, edition, categories, description, language, image } = body;
  
  await Workbook.create({
    title,
    price,
    edition,
    categories,
    description,
    language,
    image
  })
  .then((workbook) => {
    res.status(httpStatus.OK).json({
      workbook: pick(workbook.dataValues, ['title', 'price', 'edition', 'categories', 'description', 'language', 'image']),
      "Created At": workbook.dataValues.createdAt,
    });
  })
  .catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
}
  
module.exports = {
  get,
  post
};