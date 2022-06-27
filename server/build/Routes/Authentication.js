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
exports.isAdministrator = exports.authentication = void 0;
var passport_1 = __importDefault(require("passport"));
var express_1 = require("express");
var UserModel_1 = __importDefault(require("../Models/UserModel"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.authentication = (0, express_1.Router)();
// Middleware
var isAdministrator = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!user) return [3 /*break*/, 2];
                return [4 /*yield*/, UserModel_1.default.findOne({ username: user.username })
                        .then(function (doc) {
                        if (doc === null || doc === void 0 ? void 0 : doc.isAdmin) {
                            next();
                        }
                        else {
                            res.send('Invalid permissions');
                        }
                    })
                        .catch(function (err) { return res.status(400).send('Invalid user'); })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                res.send('You are not logged in');
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.isAdministrator = isAdministrator;
exports.authentication.route('/register').post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req === null || req === void 0 ? void 0 : req.body, username = _a.username, password = _a.password;
                if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
                    res.status(400).send('invalid username or password');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, UserModel_1.default.findOne({ username: username })
                        .catch(function (err) {
                        if (err)
                            throw err;
                    })
                        .then(function (doc) { return __awaiter(void 0, void 0, void 0, function () {
                        var hashedPassword, newUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (doc)
                                        res.status(400).send('username exist');
                                    if (!!doc) return [3 /*break*/, 3];
                                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                                case 1:
                                    hashedPassword = _a.sent();
                                    newUser = new UserModel_1.default({
                                        username: username,
                                        password: hashedPassword,
                                    });
                                    return [4 /*yield*/, newUser.save()];
                                case 2:
                                    _a.sent();
                                    res.send('success');
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.authentication.route('/login').post(passport_1.default.authenticate('local'), function (req, res) {
    res.send('success');
});
exports.authentication.route('/user').get(function (req, res) {
    res.send(req.user);
});
exports.authentication.route('/logout').get(function (req, res, next) {
    req.logout(function (err) {
        if (err)
            return next(err);
    });
    res.send('success');
});
exports.authentication.route('/deleteuser').post(exports.isAdministrator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = (req === null || req === void 0 ? void 0 : req.body).id;
                return [4 /*yield*/, UserModel_1.default.findByIdAndDelete(id).catch(function (err) {
                        throw err;
                    })];
            case 1:
                _a.sent();
                res.send('success');
                return [2 /*return*/];
        }
    });
}); });
exports.authentication.route('/getallusers').get(exports.isAdministrator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.find({})
                    .then(function (data) {
                    var filteredUsers = [];
                    data.forEach(function (item) {
                        var userInformation = {
                            id: item._id,
                            username: item.username,
                            isAdmin: item.isAdmin,
                        };
                        filteredUsers.push(userInformation);
                    });
                    res.send(filteredUsers);
                })
                    .catch(function (err) {
                    if (err)
                        res.status(400).send('Error getting users');
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=Authentication.js.map