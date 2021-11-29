export {};
/** Node Modules */
const httpStatus = require("http-status");
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateEmail, updatePassword, createCustomToken   } = require("firebase/auth");


/** Custom Modules */
const admin = require("../config/firebaseAdmin").firebase_admin_connect();
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");

const config = require('../config/config');
const stripe = require('stripe')(config.stripe.secretKey);

const { badgeList } = require('../config/badges');

import { object } from "joi";
/** Schemas */
import { User } from "../models/User";

// const getToken = (email: string, password: string) => {
//   let token = "";
  

//     return token;
// }

const register = catchAsync(async (req: any, res: any) => {
  let body = req.body;
  let { firstname, lastname, email, password, country, notify, listing_badge, newsletter, pre_launch } = body;
 
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

    const stripe_customer = await stripe.customers.create({
      email: email,
      name: firstname + " " + lastname,
    });

  const user = new User();
  user.firstName = firstname;
  user.lastName = lastname;
  user.email = email;
  user.country = country;
  user.notify = notify;
  user.uuid = userPass[1];
  user.isVerified = false
  user.listing_badge = listing_badge;
  user.newsletter = newsletter;
  user.pre_launch = pre_launch;
  user.stripeCustomerId = stripe_customer.id;

  await user.save().catch((error: any) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });


  let token = "";
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      token = userCredential.user.accessToken;
      return  sendEmailVerification(auth.currentUser);
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

    const listItems = []
    let badge = badgeList.find((badge: any) => badge.name === listing_badge);
          
    if (badge.stripe_price !== "") {
      listItems.push({
        price: badge.stripe_price,
        quantity: 1,
      });
    }
   
    if (pre_launch) {
      listItems.push({
        price: config.stripe.preLaunch,
        quantity:1
      })
    }

    let session = {}
    if(listItems.length > 0) {
      session = await stripe.checkout.sessions.create({
        customer: stripe_customer.id,
        payment_method_types: ["card"],
        line_items: listItems,
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${config.url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.url}/cancel`,
      });
    } 
    
  res.status(httpStatus.OK).json({
    user: pick(user, ["id", "firstName", "lastName", "email", "country", "notify", "listing_badge", "newsletter", "pre_launch", "stripeCustomerId"]),
    token: token,
    stripe_session: session
  });
});

const updateUser = catchAsync(async (req: any, res: any) => {
  const { firstname, lastname, currentEmail, newEmail, country, newPassword, currentPassword } = req.body;

  const currentUser = await User.findOne({email:currentEmail});
  if (!currentUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The user does not exists"
    );
  }
  const auth = getAuth()

  let needReauthenticate = false;
  if (req.currentUser.email !== newEmail) {
    try {
      await updateEmail(auth.currentUser, newEmail)
      needReauthenticate = true
    } catch (error) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        ""+error
      );
    }
  }
  User.merge(currentUser, {
    firstName:firstname,
    lastName:lastname,
    country:country,
    email:newEmail
  });
  const results = await User.save(currentUser);

  res.status(httpStatus.OK).json({
    user: pick(results, ["email", "firstName", "lastName", "country"]),
    needReauthenticate
  });
  
});
const updateUserPassword = catchAsync(async (req: any, res: any) => {
  const { email, newPassword, currentPassword } = req.body;

  const currentUser = await User.findOne({email:email});
  if (!currentUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "The user does not exists"
    );
  }
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, currentPassword)
  .then((userCredential: any) => {
    return updatePassword(auth.currentUser, newPassword)
  })
  .catch((error: any) => {
    let code = httpStatus.INTERNAL_SERVER_ERROR;
    let message = error.message;
    if (error.code === "auth/wrong-password") {
      code = httpStatus.UNAUTHORIZED;
      message = "Old password isn't valid";
    } else if (error.code === "auth/too-many-requests") {
      code = httpStatus.TOO_MANY_REQUESTS;
      message = error.message;
    }
    throw new ApiError(code, message);
  });
  
  res.status(httpStatus.OK).json({email});
  
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
  let uid = "";
  let isVerified = false;
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: any) => {
      token = userCredential.user.accessToken;
      uid = userCredential.user.uid
      isVerified = userCredential.user.emailVerified;
    })
    .catch((error: any) => {
      let code = httpStatus.INTERNAL_SERVER_ERROR;
      let message = error.message;
      if (error.code === "auth/wrong-password") {
        code = httpStatus.UNAUTHORIZED;
        message = "You have entered an invalid username or password. Please try again";
      } else if (error.code === "auth/too-many-requests") {
        code = httpStatus.TOO_MANY_REQUESTS;
        message = error.message;
      }
      throw new ApiError(code, message);
    });

  let customTokenAuthFirebase = ""
  const admin = require("../config/firebaseAdmin").firebase_admin_connect();
  await admin.auth().createCustomToken(uid)
    .then((resCustomToken:any) => {
      // Send token back to client
      customTokenAuthFirebase=resCustomToken
    })
    .catch((error:any) => {
      console.log('Error creating custom token:', error);
    });

  if (token === "")
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not retrieve token."
    );

  if (!currentUser.isVerified && isVerified) {
    currentUser.isVerified = true;
    await currentUser.save().catch((error: any) => {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    });
  }
  res.status(httpStatus.OK).json({
    user: pick(currentUser, ["firstName", "lastName", "email", "country", "authorized"]),
    token: token,
    customTokenAuthFirebase
  });
});

const refresh = catchAsync(async (req: any, res: any) => {
  let customTokenAuthFirebase = ""
  const admin = require("../config/firebaseAdmin").firebase_admin_connect();
  await admin.auth().createCustomToken(req.currentUser.uuid)
    .then((resCustomToken:any) => {
      // Send token back to client
      customTokenAuthFirebase=resCustomToken
      // console.log({customTokenAuthFirebase})
    })
    .catch((error:any) => {
      console.log('Error creating custom token:', error);
    });
  res.status(httpStatus.OK).json({
    user: pick(req.currentUser, ["firstName", "lastName", "email", "country"]),
    token: req.get('authorization').replace('Bearer ', ''),
    customTokenAuthFirebase
  });
});

const logout = catchAsync(async (req: any, res: any) => {
  const admin = require("../config/firebaseAdmin").firebase_admin_connect();
  const response = await admin.auth().revokeRefreshTokens(req.currentUser.uuid)
  res.status(httpStatus.OK).json(response);
});

const restorePassword = catchAsync(async (req: any, res: any) => {
  const { email } = req.body
  
  await sendPasswordResetEmail(getAuth(), email).catch((error:any) => {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  });
  
  res.status(httpStatus.OK).json({email});
});

// endpoint to create a stripe checkout session


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
  refresh,
  logout,
  restorePassword,
  updateUser,
  updateUserPassword
  // refreshTokens,
  // forgotPassword,
  // resetPassword,
  // sendVerificationEmail,
  // verifyEmail,
};
