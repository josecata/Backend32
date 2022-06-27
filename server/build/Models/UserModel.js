"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var user = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
});
exports.default = mongoose_1.default.model('users', user);
//# sourceMappingURL=UserModel.js.map