export {};
const express = require("express");
const router = express.Router();
const config = require("../config/config");

// Import routes
const authRoute = require("./auth.route");
const workbookRoute = require("./workbook.route");
const questionsRoute = require("./questions.route");
const unitRoute = require("./unit.route");

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
  // {
  //   path: '/unit',
  //   route: unitRoute,
  // },
  {
    path: "/questions",
    route: questionsRoute,
  },
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
  router.get('/version', function (req, res) {
    res.send()
  })
}

module.exports = router;
