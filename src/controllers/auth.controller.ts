export {};
/** Node Modules */
const httpStatus = require("http-status");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

/** Custom Modules */
const admin = require("../config/firebaseAdmin").firebase_admin_connect();
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");

import { isError } from "joi";
/** Schemas */
import { User } from "../models/User";

// const getToken = (email: string, password: string) => {
//   let token = "";
  

//     return token;
// }


const register = catchAsync(async (req: any, res: any) => {
  let body = req.body;
  let { firstname, lastname, email, password, country } = body;

  const userPass: any[] = [];
  await admin
    .auth()
    .createUser({
      email: email,
      password: password,
      displayName: firstname + " " + lastname,
      disabled: false,
    })
    .then((userCredential: any) => {
      // Signed in
      userPass.push(userCredential.providerData[0].uid);
      userPass.push(userCredential.uid);
    })
    .catch((error: any) => {
      let code = httpStatus.INTERNAL_SERVER_ERROR;
      let message = error.message;
      if (error.code === "auth/email-already-exists") {
        code = httpStatus.BAD_REQUEST;
        message = error.message;
      } else if (error.code === "auth/invalid-email") {
        code = httpStatus.BAD_REQUEST;
        message = error.message;
      } else if (error.code === "auth/operation-not-allowed") {
        code = httpStatus.FORBIDDEN;
        message = error.message;
      } else if (error.code === "auth/weak-password") {
        code = httpStatus.BAD_REQUEST;
        message = error.message;
      }
      throw new ApiError(code, error.message);
    });

  const user = new User();
  user.firstName = firstname;
  user.lastName = lastname;
  user.email = email;
  user.country = country;
  user.uuid = userPass[1];

  await user.save().catch((error: any) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });

  let token = "";
  await signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential: any) => {
      token = userCredential.user.accessToken;

    })
    .catch((error: any) => {
      let code = httpStatus.INTERNAL_SERVER_ERROR;
      let message = error.message;
      if (error.code === "auth/wrong-password") {
        code = httpStatus.UNAUTHORIZED;
        message = error.message;
      } else if (error.code === "auth/too-many-requests") {
        code = httpStatus.TOO_MANY_REQUESTS;
        message = error.message;
      }
      throw new ApiError(code, error.message);
    });

  if (token === "")
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not retrieve token."
    );

  res.status(httpStatus.OK).json({
    user: pick(user, ["id", "firstName", "lastName", "email", "country"]),
    token: token,
  });
});

const login = catchAsync(async (req: any, res: any) => {
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email: email });
  if (!currentUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The user with email " + email + " is not registerd"
    );
  }

  let token = "";
  await signInWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential: any) => {
      token = userCredential.user.accessToken;
    })
    .catch((error: any) => {
      let code = httpStatus.INTERNAL_SERVER_ERROR;
      let message = error.message;
      if (error.code === "auth/wrong-password") {
        code = httpStatus.UNAUTHORIZED;
        message = error.message;
      } else if (error.code === "auth/too-many-requests") {
        code = httpStatus.TOO_MANY_REQUESTS;
        message = error.message;
      }
      throw new ApiError(code, error.message);
    });

  if (token === "")
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not retrieve token."
    );

  res.status(httpStatus.OK).json({
    user: pick(currentUser, ["firstName", "lastName", "email", "country"]),
    token: token,
  });
});

// const logout = catchAsync(async (req, res) => {
//   await authService.logout(req.body.refreshToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const refreshTokens = catchAsync(async (req, res) => {
//   const tokens = await authService.refreshAuth(req.body.refreshToken);
//   res.send({ ...tokens });
// });

// const forgotPassword = catchAsync(async (req, res) => {
//   const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
//   await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const resetPassword = catchAsync(async (req, res) => {
//   await authService.resetPassword(req.query.token, req.body.password);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const sendVerificationEmail = catchAsync(async (req, res) => {
//   const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
//   await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// const verifyEmail = catchAsync(async (req, res) => {
//   await authService.verifyEmail(req.query.token);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  register,
  login,
  // logout,
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // sendVerificationEmail,
  // verifyEmail,
};
