"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ProductModel_1 = __importDefault(require("../Models/ProductModel"));
var Products = /** @class */ (function () {
    function Products() {
        var _this = this;
        this.save = function (obj) { return __awaiter(_this, void 0, void 0, function () {
            var products, timestamp, newID, newProduct, productToAdd, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAll()];
                    case 1:
                        products = _a.sent();
                        timestamp = Date.now();
                        newID = void 0;
                        if (products.length == 0) {
                            newID = 1;
                        }
                        else {
                            newID = Number(products[products.length - 1].id) + 1;
                        }
                        newProduct = __assign({ id: newID, timestamp: timestamp }, obj);
                        productToAdd = new this.collection(newProduct);
                        return [4 /*yield*/, productToAdd.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newID];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error("Can't save product");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        throw new Error('Error returning all products');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.findOne({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error('Error getting the product');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.modifyById = function (newValues, id) { return __awaiter(_this, void 0, void 0, function () {
            var product, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, this.getById(id)];
                    case 1:
                        product = _a.sent();
                        console.log(product);
                        if (!(product != null)) return [3 /*break*/, 10];
                        if (!newValues.nombre) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.collection
                                .findOneAndUpdate({ id: id }, {
                                nombre: newValues.nombre,
                            }, { new: true })
                                .catch(function (err) {
                                throw err;
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!newValues.descripcion) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.collection.updateOne({ id: id }, {
                                $set: { descripcion: newValues.descripcion },
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!newValues.url) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.collection.updateOne({ id: id }, {
                                $set: { url: newValues.url },
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!newValues.precio) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.collection.updateOne({ id: id }, {
                                $set: { precio: newValues.precio },
                            })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/, true];
                    case 10: return [2 /*return*/, false];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        err_4 = _a.sent();
                        console.log(err_4);
                        throw new Error('Error trying to modify the product');
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        this.deleteById = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var productToDelete, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        productToDelete = this.getById(id);
                        if (!(productToDelete != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.collection.deleteOne({ id: id })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        throw new Error('Error deleting the product');
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAll = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.remove()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        throw new Error('Error deleting all products');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.collection = ProductModel_1.default;
    }
    return Products;
}());
exports.default = Products;
//# sourceMappingURL=products.js.map