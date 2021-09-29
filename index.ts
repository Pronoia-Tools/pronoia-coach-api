#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './src/app';
import { intializeDB } from './src/config/db';
const cluster = require('cluster');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

/**
 * Handle clusters configuration
 */

var workers: any = {};
var count = 1;
if(config.env === 'production') {
  count = require('os').cpus().length;
}

/** 
 * Services Initialization
 */
intializeDB();
require('./src/config/firebase').firebase_connect();

/**
 * Create HTTP server.
 */

if (cluster.isMaster) {
  for (var i = 0; i < count; i++) {
    spawn();
  }
} else {
  let server = app.listen(config.port);
  server.on('error', onError);
  server.on('listening', onListening);
}

/**
 * Workers creation funciton
 */

function spawn() {
  var worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  logger.info(`Listening to port ${config.port}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}