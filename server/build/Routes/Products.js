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
exports.routerProduct = void 0;
var express_1 = require("express");
var products_1 = __importDefault(require("../Controllers/products"));
var Authentication_1 = require("./Authentication");
var products = new products_1.default();
exports.routerProduct = (0, express_1.Router)();
exports.routerProduct.route('/api/productos/:id?')
    .get(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.id) {
                    id = Number(req.body.id);
                }
                else {
                    id = Number(req.params.id);
                }
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, products.getById(id)];
            case 1:
                product = _a.sent();
                product ? res.status(200).json(product) : res.status(404).json({ error: ' Error with ID ' });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, products.getAll()];
            case 3:
                allProducts = _a.sent();
                allProducts ? res.status(200).json(allProducts) : res.status(404);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); })
    .post(Authentication_1.isAdministrator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newObj, newId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id) return [3 /*break*/, 1];
                res.status(400).json({ error: ' No se puede crear un producto con un id' });
                return [3 /*break*/, 3];
            case 1:
                newObj = req.body;
                return [4 /*yield*/, products.save(newObj)];
            case 2:
                newId = _a.sent();
                res.status(200).json("El producto ".concat(newObj.nombre, " con el id ").concat(newId, " se gener\u00F3 correctamente"));
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .put(Authentication_1.isAdministrator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newValues, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newValues = req.body;
                id = Number(req.body.id);
                return [4 /*yield*/, products.modifyById(newValues, id).then(function (result) { return (result ? res.status(202).json('Producto modificado') : res.status(404).json('No se encontró el producto')); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .delete(Authentication_1.isAdministrator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        if (req.body.id) {
            id = Number(req.body.id);
        }
        else {
            id = Number(req.params.id);
        }
        products.deleteById(id).then(function (result) { return (result ? res.status(202).json('Producto eliminado') : res.status(404).json({ error: 'El producto no existe' })); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=Products.js.map