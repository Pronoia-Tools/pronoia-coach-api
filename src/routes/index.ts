export {};
const express = require("express");
const router = express.Router();
const config = require("../config/config");

// Import routes
const authRoute = require("./auth.route");
const workbookRoute = require("./workbook.route");
const questionsRoute = require("./questions.route");
const reportController = require("./report.route")
const unitRoute = require("./unit.route");
const imageRoute = require("./image.route");
const utilRoute = require("./util.route");

// Create routing
const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/workbook",
    route: workbookRoute,
  },
  {
    path: '/unit',
    route: unitRoute,
  },
  {
    path: "/image",
    route: imageRoute,
  },
  {
    path: "/questions",
    route: questionsRoute,
  },
  {
    path: "/report",
    route: reportController,
  },
  {
    path: "/util",
    route: utilRoute,
  }
];

const devRoutes: any[] = [
  // routes available only in development mode
  // {
  //     path: '/docs',
  //     route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

if (config.version) {
  router.get('/version', function (req: any, res:any ) {
    res.status(200).json({version: config.version});
  })
}

module.exports = router;
