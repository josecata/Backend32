"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var yargs = __importStar(require("yargs"));
dotenv_1.default.config();
// Arguments
var argv = yargs.options({
    p: { type: 'number', alias: 'port', default: 8080 },
    m: { type: 'string', alias: 'mode', default: 'fork' },
}).argv;
exports.config = {
    PORT: argv.p,
    MODE: argv.m,
    NODE_ENV: process.env.NODE_ENV,
    mongoDB: process.env.PART1STRING + process.env.USER + ':' + process.env.PASSWORD + process.env.PART2STRING + process.env.DB + process.env.PART3STRING,
    FRONTEND: process.env.FRONTEND || 'http://localhost:3000',
    arguments: process.argv.slice(2),
    os: process.platform,
    NodeVersion: process.version,
    MemoryReservedRSS: process.memoryUsage().rss,
    ExecPath: process.argv[1],
    ProcessID: process.pid,
    Folder: process.cwd() // Carpeta del proyecto
};
//# sourceMappingURL=config.js.map