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
exports.routerCart = void 0;
var express_1 = require("express");
var cart_1 = __importDefault(require("../Controllers/cart"));
var products_1 = __importDefault(require("../Controllers/products"));
var products = new products_1.default();
var cart = new cart_1.default();
exports.routerCart = (0, express_1.Router)();
exports.routerCart
    .route('/api/carrito')
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.id) return [3 /*break*/, 1];
                res.status(400).json({ error: 'No se puede crear un carrito con ID manual' });
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, cart.create()];
            case 2:
                id = _a.sent();
                res.status(200).json(id);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = Number(req.body.id);
        cart.deleteCartById(id).then(function (result) { return (result ? res.status(202).json('Carrito eliminado') : res.status(404).json('No se encontr?? el carrito')); });
        return [2 /*return*/];
    });
}); })
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.body.id;
        cart.getCartById(id).then(function (result) { return (result ? res.status(202).json(result) : res.status(400).json({ error: 'error getting the cart' })); });
        return [2 /*return*/];
    });
}); });
exports.routerCart
    .route('/api/carrito/productos')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, products_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, cart.getAllProdById(id)];
            case 1:
                products_2 = _a.sent();
                products_2 ? res.status(200).json(products_2) : res.status(404).json({ error: 'No se encontr?? el carrito solicitado' });
                return [3 /*break*/, 3];
            case 2:
                res.status(404).json({ error: 'Es necesario un ID para buscar el carrito' });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, id_prod, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.body.id);
                id_prod = Number(req.body.id_prod);
                return [4 /*yield*/, products.getById(id_prod)];
            case 1:
                product = _a.sent();
                if (product != null) {
                    cart.addProduct(id, product);
                    res.status(202).json("El producto fue agregado al carrito.");
                }
                else {
                    res.status(400).json("Error adding the product.");
                }
                return [2 /*return*/];
        }
    });
}); })
    .delete(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, id_prod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.body.id);
                id_prod = Number(req.body.id_prod);
                return [4 /*yield*/, cart.deleteProdById(id, id_prod).then(function (response) {
                        response ? res.status(202).json("El producto fue eliminado") : res.status(400).json('No se encontr?? el producto a eliminar');
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=Cart.js.map