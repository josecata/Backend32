"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cart = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    timestamp: { type: Number },
    productos: { type: Array }
});
exports.default = mongoose_1.default.model('carts', cart);
//# sourceMappingURL=CartModel.js.map