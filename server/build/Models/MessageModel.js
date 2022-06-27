"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var message = new mongoose_1.default.Schema({
    author: {
        // id: { type: String, required: true },
        // firstName: { type: String, required: true, max: 50 },
        // lastName: { type: String, required: true, max: 50 },
        // age: { type: Number, required: true },
        alias: { type: String, required: true, max: 20 },
        // avatar: { type: String, required: true },
    },
    text: { type: String, required: true, max: 500 },
});
exports.default = mongoose_1.default.model('messages', message);
//# sourceMappingURL=MessageModel.js.map