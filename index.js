// server.js

// BASE SETUP
// =============================================================================

import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import config from 'nconf'
import logger from './lib/logger'
import server from './config/initializers/server'   // define our app using express
import db from './config/initializers/database'

// CONFIG
// =============================================================================

// .env file
dotenv.config()
// Set up configs
config.use('memory');
// First load command line arguments
config.argv();
// Load environment variables
config.env();

config.set('PUBLIC_DIR', path.join(__dirname, config.get('PUBLIC_FOLDER')))

require ('./config/environments/' + config.get('NODE_ENV'));
let app = server()
db.initPool()

// var port = process.env.PORT || 8080;        // set our port
// server.listen(port);
// logger.add(new logger.transports.Console());
logger.log('info','[APP] initialized SUCCESSFULLY',{ test: "yes"});