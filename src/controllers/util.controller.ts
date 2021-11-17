export {};
/** Node Modules */
const httpStatus = require("http-status");

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

/** Schemas */
import { User } from "../models/User";
import { Workbook } from "../models/Workbooks";
import { Tags } from "../models/Tags";

// const getToken = (email: string, password: string) => {
//   let token = "";
  

//     return token;
// }
const loadTest = catchAsync(async (req: any, res:any) => {
  const start = Date.now()
  const req_id = (Math.random() + 1).toString(36).substring(7);
  let tempWorkbookArray: Workbook[] = [];
  const response = { user: {}, workbooks: tempWorkbookArray}
  
  const user = new User();
  user.firstName = 'First Name ' + req_id;
  user.lastName = 'Last Name ' + req_id;
  user.email = 'test' + req_id + '@rour.dev';
  user.country = 'country ' + req_id;
  user.notify = true;
  user.uuid = req_id;
  user.isVerified = false

  const newUser = await user.save().catch((error: any) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  response.user = newUser;

  const workbookCount = Math.floor(Math.random() * 10);
  const workbooks = [];
  // Generate random number between 1 and 10
  // for loop between 1 and 10
  const Tag = new Tags();
  Tag.name = 'Tag ' + req_id;
  Tag.save().catch((error: any) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  for (let i = 0; i < workbookCount; i++) {
    const work_id = req_id + '-' + i;
    const workbook = new Workbook();
    workbook.title = 'title ' + work_id;
    workbook.image = 'image ' + work_id;
    workbook.published = new Date();
    workbook.edition = newUser.id;
    workbook.language = 'language ' + work_id;
    workbook.price = newUser.id;
    workbook.currency = 'currency ' + work_id;
    workbook.status = 'status ' + work_id;
    workbook.description = 'description ' + work_id;
    workbook.tags = [Tag];
    workbook.author = newUser;

    const newWorkbook = await workbook.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });

    workbooks.push(newWorkbook);

  }

  response.workbooks = workbooks;
  //find all workbooks belonging to user and delete them
  const workbooksToDelete = await Workbook.find({ where: { author: newUser }});
  for (let i = 0; i < workbooksToDelete.length; i++) {
    await workbooksToDelete[i].remove();
  }
 
  await newUser.remove();
  await Tag.remove();
  const end = Date.now()

  res.status(httpStatus.OK).json({res: response});
});

module.exports = {
  loadTest

};
