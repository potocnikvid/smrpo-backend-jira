"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = __importDefault(require("./swagger"));
const routes_1 = __importDefault(require("./src/api/routes"));
const cors = require('cors');
const schedule = require('node-schedule');
const app = (0, express_1.default)();
const errorHandler = require('errorhandler');
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.default);
const swaggerUiOptions = {
    explorer: true
};
require('dotenv').config();
const APP_HTTP_PORT = process.env.APP_HTTP_PORT || '3000';
const FRONTEND_CORS_URL = process.env.FRONTEND_CORS_URL || 'http://localhost:3000';
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
app.use(cors({ origin: FRONTEND_CORS_URL, credentials: true }));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec, swaggerUiOptions));
http_1.default.createServer(app).listen(APP_HTTP_PORT, function () {
    console.log(`App is listening on port ${APP_HTTP_PORT} (http)`);
}).on('error', function (error) {
    console.log(`Error in http server startup: ${error.message}`);
});
module.exports = app;
