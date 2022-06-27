"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var product = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    timestamps: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number },
});
exports.default = mongoose_1.default.model('products', product);
//# sourceMappingURL=ProductModel.js.map