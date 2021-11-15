export {}
/** Node Modules */
const httpStatus = require('http-status');

/** Custom Modules */
const catchAsync = require("../utils/catchAsync");
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const admin = require("../config/firebaseAdmin").firebase_admin_connect();

/** Schemas */
import { Workbook } from "../models/Workbooks";
import { Unit } from "../models/Unit";
import { Tags } from "../models/Tags";

/** Sample data */
const unit = require('../utils/sampleUnit');

const getAll = catchAsync(async (req: any, res: any) => {
  const selectedWorkbooks = await Workbook.find({
    where: {
      author: req.currentUser
    },
    relations: ['author','units', 'tags']
  });
  res.status(httpStatus.OK).json(selectedWorkbooks);
});

const get = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({
    where:{
      id: req.params.id
    },
    relations: ['author', 'units', 'tags']
  });
  res.status(httpStatus.OK).json({ selectedWorkbook });
});

const post = catchAsync(async (req: any, res: any) => {
  let { title, published, edition, language, price, currency, status, tags, description, image } = req.body;

  const allTags = await Tags.find({}).catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  let tagsExist = allTags.map(a => a.name)

  const workbook = new Workbook();

  let tagsNew = tags.filter((e:any) =>  tagsExist.indexOf(e) === -1 );

  let tagsOld = tags.filter((e:any) =>  tagsExist.includes(e));


  workbook.tags = []

  for (let i = 0; i < tagsNew.length; i++) {
    const newTag = new Tags();
    newTag.name = tagsNew[i].charAt(0).toUpperCase() + tagsNew[i].slice(1).toLowerCase();
    await newTag.save()
    workbook.tags.push(newTag)
  }

  for (let a = 0; a < tagsOld.length; a++) {
    const tagsFinded =  await Tags.find({
      where:{name:tagsOld[a]}
    }).catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
    workbook.tags.push(tagsFinded[0])
  }


  workbook.title = title;
  workbook.image = image;
  workbook.published = published;
  workbook.edition = edition;
  workbook.language = language;
  workbook.price = price;
  workbook.currency = currency;
  workbook.status = status;
  workbook.description = description;
  workbook.author = req.currentUser;

  let newWorkbook = await workbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(newWorkbook);

});

const put = catchAsync(async (req: any, res: any) => {

  const allTags = await Tags.find({}).catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author', 'tags']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  // Take all name tags of the workbook

  let allTagsName = allTags.map(a => a.name)

  let tagsExist = selectedWorkbook?.tags.map(a => a.name)
  let tagsExistAdd = selectedWorkbook?.tags.map(a => a.name)

  let { title, published, edition, language, price, currency, status, description, image, structure, tags } = req.body;

  // Take all tags what i need to add

  let tagsNew = tags.filter((e:any) =>  tagsExistAdd.indexOf(e) === -1 )

  // Take all tags what i need to delete

  let tagsForDelete = tagsExist.filter((e:any) =>  tags.indexOf(e) === -1 )

  if (tagsNew.length !== 0){
    console.log('iam here')
    for (let i = 0; i < tagsNew.length; i++) {
      if (allTagsName.indexOf(tagsNew[i]) !== -1) {
        const tagsFinded =  await Tags.find({
          where:{name:tagsNew[i]}
        }).catch((error) => {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
        });
        selectedWorkbook.tags.push(tagsFinded[0])
      }
      else{
        const newTag = new Tags();
        newTag.name = tagsNew[i].charAt(0).toUpperCase() + tagsNew[i].slice(1).toLowerCase();
        await newTag.save()
        selectedWorkbook.tags.push(newTag)
      }
    }
  }

  if (tagsForDelete.length !== 0){
    console.log('iam here bot')
    selectedWorkbook.tags = selectedWorkbook.tags.filter((item) => !tagsForDelete.includes(item.name))
  }


  selectedWorkbook.title = title;
  selectedWorkbook.image = image;
  selectedWorkbook.published = published;
  selectedWorkbook.edition = edition;
  selectedWorkbook.language = language;
  selectedWorkbook.price = price;
  selectedWorkbook.currency = currency;
  selectedWorkbook.status = status;
  selectedWorkbook.description = description;
  selectedWorkbook.structure = structure;


  let updatedWorkbook = await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedWorkbook);
});

const remove = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let removedWorkbook = await selectedWorkbook.remove().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  removedWorkbook.id = Number(req.params.id);
  res.status(httpStatus.OK).json(removedWorkbook);

});

// UNITS
const getUnitAll = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({ 
    where: {
      author: req.currentUser,
      id: req.params.workbookId
    },
    relations: ['author', 'units']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  if (selectedWorkbook.units.length === 0) {
    const firstUnit = new Unit();
    firstUnit.name = "First Unit";
    firstUnit.owner = req.currentUser;
    firstUnit.contents = unit;

    await firstUnit.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });

    selectedWorkbook.units.push(firstUnit);

    if(!selectedWorkbook.structure.tree) {
      selectedWorkbook.structure.tree =[]
    }
    selectedWorkbook.structure.tree.push({
      text: 'My first Content',
      type:'content',
      id: firstUnit.id
    })

    await selectedWorkbook.save().catch((error) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
  }

  res.status(httpStatus.OK).json(selectedWorkbook);
});

const postUnit = catchAsync(async (req: any, res: any) => {
  let { title } = req.body;

  const selectedWorkbook = await Workbook.findOne({
    where: {
      author: req.currentUser,
      id: req.params.workbookId
    },
    relations: ['author', 'units']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  const unit = new Unit();
  unit.name = title

  await unit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  selectedWorkbook.units.push(unit);

  await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json({unit: unit, workbook: selectedWorkbook});
});

const putUnit = catchAsync(async (req: any, res: any) => {

  const selectedWorkbook = await Workbook.findOne({
    where: {
      author: req.currentUser,
      id: req.params.workbookId
    },
    relations: ['author', 'units']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let selectedUnit = selectedWorkbook.units.find(x => x.id === Number(req.params.unitId));

  if(!selectedUnit)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not have the unit"
    );

  let { name, contents } = req.body;

  selectedUnit.name = name;
  selectedUnit.contents = contents;

  let updatedUnit = await selectedUnit.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedUnit);
});

/* TAGS Controllers */

const getAllTags = catchAsync(async (req: any, res: any) => {
  const allTags = await Tags.find({}).catch((error) => {
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
});;

const selectedWorkbook = await Workbook.findOne({
  where: {
    id: req.params.id
  },
  relations: ['author']
});

if(!selectedWorkbook)
  throw new ApiError(
    httpStatus.BAD_REQUEST,
    "The workbook does not exist"
  );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  res.status(httpStatus.OK).json(allTags);
})


/* const putTags = catchAsync(async (req: any, res: any) => {
  const selectedWorkbook = await Workbook.findOne({
    where: {
      id: req.params.id
    },
    relations: ['author', 'tags']
  });

  if(!selectedWorkbook)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The workbook does not exist"
    );

  if (req.currentUser.id != selectedWorkbook.author.id)
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "You need to be the author to edit"
    );

  let { tagsA } = req.body;

  for (let i = 0; i < tagsA.length; i++) {
    const newTag = new Tags();
    newTag.name = tagsA[i].name;
    await newTag.save()
    selectedWorkbook.tags.push(newTag)
  }

  let updatedWorkbook = await selectedWorkbook.save().catch((error) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  res.status(httpStatus.OK).json(updatedWorkbook);
}) */

module.exports = {
  getAll,
  get,
  put,
  post,
  remove,
  getUnitAll,
  postUnit,
  putUnit,
  getAllTags
  /* putTags */
};