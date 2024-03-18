import express from 'express';
import http from 'http';
import logger from './src/utils/winston-logger'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerDefinition from './swagger';
import router from './src/api/routes';

const cors = require('cors');
const schedule = require('node-schedule');
const app = express();
const errorHandler = require('errorhandler')
const swaggerSpec = swaggerJSDoc(swaggerDefinition);
const swaggerUiOptions = {
    explorer: true
  };
  
require('dotenv').config()

const APP_HTTP_PORT = process.env.APP_HTTP_PORT || '3000';
const FRONTEND_CORS_URL = process.env.FRONTEND_CORS_URL || 'http://localhost:3000';

app.use(errorHandler({ dumpExceptions: true, showStack: true })); 
app.use(cors({origin: FRONTEND_CORS_URL, credentials: true}))
app.use(express.json());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

http.createServer(app).listen(APP_HTTP_PORT, function() {
    console.log(`App is listening on port ${APP_HTTP_PORT} (http)`)
}).on('error', function(error: Error) {
    console.log(`Error in http server startup: ${error.message}`);
});

module.exports = app;