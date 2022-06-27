"use strict";
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
var CartModel_1 = __importDefault(require("../Models/CartModel"));
var Cart = /** @class */ (function () {
    function Cart() {
        var _this = this;
        this.create = function () { return __awaiter(_this, void 0, void 0, function () {
            var carts, newID, timestamp, newCart, cart, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getAllCart()];
                    case 1:
                        carts = _a.sent();
                        newID = void 0;
                        if (carts.length == 0) {
                            newID = 1;
                        }
                        else {
                            newID = Number(carts[carts.length - 1].id) + 1;
                        }
                        timestamp = Date.now();
                        newCart = { id: newID, timestamp: timestamp, productos: [] };
                        cart = new this.collection(newCart);
                        return [4 /*yield*/, cart.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newID];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw new Error("Can't create cart");
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllCart = function () { return __awaiter(_this, void 0, void 0, function () {
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
                        throw new Error('Error getting all carts');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getCartById = function (cartId) { return __awaiter(_this, void 0, void 0, function () {
            var carts, el, id, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAllCart()];
                    case 1:
                        carts = _a.sent();
                        el = carts.findIndex(function (e) { return e.id === cartId; });
                        id = carts[el]._id;
                        return [2 /*return*/, this.collection.findById(id)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        throw new Error('Error getting cart by ID');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addProduct = function (cartId, obj) { return __awaiter(_this, void 0, void 0, function () {
            var productToAdd, cart, cartIndex, productsInCart, duplicatedIndex, priceOfProduct, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        productToAdd = obj;
                        return [4 /*yield*/, this.getAllCart()];
                    case 1:
                        cart = _a.sent();
                        cartIndex = cart.findIndex(function (e) { return e.id === cartId; });
                        productsInCart = cart[cartIndex].productos;
                        duplicatedIndex = productsInCart.findIndex(function (e) { return e.id === obj.id; });
                        if (!(duplicatedIndex != -1)) return [3 /*break*/, 6];
                        priceOfProduct = productsInCart[duplicatedIndex].precio;
                        if (!productsInCart[duplicatedIndex].stock) return [3 /*break*/, 3];
                        productsInCart[duplicatedIndex].stock++;
                        productsInCart[duplicatedIndex].precio = priceOfProduct * productsInCart[duplicatedIndex].stock;
                        return [4 /*yield*/, this.collection.updateOne({ id: cartId }, {
                                $set: { productos: productsInCart },
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        productsInCart[duplicatedIndex].stock = 2;
                        productsInCart[duplicatedIndex].precio = priceOfProduct * productsInCart[duplicatedIndex].stock;
                        return [4 /*yield*/, this.collection.updateOne({ id: cartId }, {
                                $set: { productos: productsInCart },
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        productsInCart.push(productToAdd);
                        return [4 /*yield*/, this.collection.updateOne({ id: cartId }, {
                                $set: { productos: productsInCart },
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error('Error adding product');
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getAllProdById = function (cartId) { return __awaiter(_this, void 0, void 0, function () {
            var cart, products, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.findOne({ id: cartId })];
                    case 1:
                        cart = _b.sent();
                        products = cart.productos;
                        if (products) {
                            return [2 /*return*/, products];
                        }
                        else {
                            throw new Error("Product didn't exist");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        throw new Error('Error getting the product');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteCartById = function (cartId) { return __awaiter(_this, void 0, void 0, function () {
            var cartToDelete, cartIndex, _id, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.getAllCart()];
                    case 1:
                        cartToDelete = _a.sent();
                        cartIndex = cartToDelete.findIndex(function (e) { return e.id == cartId; });
                        _id = cartToDelete[cartIndex]._id;
                        if (!(cartToDelete.length === 0)) return [3 /*break*/, 2];
                        return [2 /*return*/, false];
                    case 2:
                        if (!(cartIndex >= 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.collection.deleteOne({ _id: _id })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        console.log(err_4);
                        throw new Error('Error deleting cart');
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.deleteProdById = function (cartId, prodId) { return __awaiter(_this, void 0, void 0, function () {
            var carts, cartIndex, productsOnCart, prodToDeleteIndex, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.getAllCart()];
                    case 1:
                        carts = _b.sent();
                        cartIndex = carts.findIndex(function (e) { return e.id == cartId; });
                        if (!(cartIndex >= 0)) return [3 /*break*/, 5];
                        productsOnCart = carts[cartIndex].productos;
                        prodToDeleteIndex = productsOnCart.findIndex(function (e) { return e.id == prodId; });
                        if (!(prodToDeleteIndex >= 0)) return [3 /*break*/, 3];
                        productsOnCart.splice(prodToDeleteIndex, 1);
                        return [4 /*yield*/, this.collection.updateOne({ id: cartId }, {
                                $set: { productos: productsOnCart },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, false];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _a = _b.sent();
                        throw new Error('Error deleting the product');
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.deleteAllCarts = function () { return __awaiter(_this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.collection.remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_5 = _a.sent();
                        console.log(err_5);
                        throw new Error('error deleting all carts');
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.collection = CartModel_1.default;
    }
    return Cart;
}());
exports.default = Cart;
//# sourceMappingURL=cart.js.map