export {}
// const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const admin = require("../config/firebaseAdmin").firebase_admin_connect();

// const { roleRights } = require('../config/roles');
import { User } from "../models/User";
import {getRepository} from "typeorm";

// const verifyCallback = (req: any, resolve: any, reject: any, requiredRights: any) => async (err: any, user: any, info: any) => {
//   if (err || info || !user) {
//     return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//   }
//   req.user = user;

//   if (requiredRights.length) {
//     const userRights = roleRights.get(user.role);
//     const hasRequiredRights = requiredRights.every((requiredRight: any) => userRights.includes(requiredRight));
//     if (!hasRequiredRights && req.params.userId !== user.id) {
//       return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     }
//   }

//   resolve();
// };

const auth = (...requiredRights: any) => async (req: any, res: any, next: any) => {
    //This needs to be changed to firebase
  let token = req.get('authorization').replace('Bearer ', '');
  let info: any;
  await admin
  .auth()
  .verifyIdToken(token)
  .then((decodedToken: any) => {
    info = decodedToken;
  })
  .catch((err: any) => {
    console.log(err);
    next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'))
  });

  if(!info) {
    next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'))
  }

  const currentUser = await getRepository(User)
    .createQueryBuilder('user')
    .where('LOWER(user.email) = LOWER(:email)', { email: info.email })
    .getOne();

  if (!currentUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The user with email " + info.email + " is not registerd"
    );
  }

  req.currentUser = currentUser;
  // now we should check for role permissions
  next();

};

module.exports = auth;