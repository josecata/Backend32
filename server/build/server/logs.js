"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var config_1 = require("../config");
var path_1 = __importDefault(require("path"));
var pathLogs = path_1.default.join(__dirname, '..', 'Logs');
var buildProdLogger = function () {
    var prodLogger = winston_1.default.createLogger({
        transports: [new winston_1.default.transports.File({ filename: "".concat(pathLogs, "/debug.log"), level: 'debug' }), new winston_1.default.transports.File({ filename: "".concat(pathLogs, "/error.log"), level: 'error' })],
    });
    return prodLogger;
};
var buildDevLogger = function () {
    var devLogger = winston_1.default.createLogger({
        transports: [new winston_1.default.transports.Console({ level: 'info' })]
    });
    return devLogger;
};
exports.logger = null;
if (config_1.config.NODE_ENV === 'PROD') {
    exports.logger = buildProdLogger();
}
else {
    exports.logger = buildDevLogger();
}
//# sourceMappingURL=logs.js.map