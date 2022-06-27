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
// Express || Server variables
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
// MongoDB
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel_1 = __importDefault(require("./Models/UserModel"));
// Encrypt
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// Env
var dotenv_1 = __importDefault(require("dotenv"));
var config_1 = require("./config");
dotenv_1.default.config();
// Routes
var Authentication_1 = require("./Routes/Authentication");
var Cart_1 = require("./Routes/Cart");
var Chat_1 = require("./Routes/Chat");
var Products_1 = require("./Routes/Products");
var Random_1 = require("./Routes/Random");
// Controllers
var messages_1 = require("./Controllers/messages");
// Server Mode
var mode_1 = __importDefault(require("./server/mode"));
// Compression
var compression_1 = __importDefault(require("compression"));
// Strategy
var LocalStrategy = passport_local_1.default.Strategy;
// Logs
var logs_1 = require("./server/logs");
// Connection to Mongo
mongoose_1.default.connect("".concat(config_1.config.mongoDB), function (err) {
    if (err)
        throw err;
    logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info('Connected to Mongo');
});
// Path folder
var path_1 = __importDefault(require("path"));
// Path public client
var root = path_1.default.join(__dirname, '..', '..', 'client/build');
// Middleware
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "".concat(config_1.config.FRONTEND), credentials: true }));
app.use((0, express_session_1.default)({ secret: 'secretcode', resave: true, saveUninitialized: true }));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.static(root));
// Passport
passport_1.default.use(new LocalStrategy(function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findOne({ username: username })
                    .catch(function (err) {
                    if (err)
                        throw err;
                })
                    .then(function (user) {
                    if (!user)
                        return done(null, false);
                    bcryptjs_1.default
                        .compare(password, user.password)
                        .catch(function (err) {
                        if (err)
                            throw err;
                    })
                        .then(function (result) {
                        if (result === true) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false);
                        }
                    });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); }));
passport_1.default.serializeUser(function (user, cb) {
    cb(null, user._id);
});
passport_1.default.deserializeUser(function (id, cb) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findOne({ _id: id })
                    .catch(function (err) {
                    cb(err, false);
                })
                    .then(function (user) {
                    var userInformation = {
                        username: user.username,
                        isAdmin: user.isAdmin,
                        id: user._id,
                    };
                    cb(null, userInformation);
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Routes
app.use(Authentication_1.authentication);
app.use(Cart_1.routerCart);
app.use(Chat_1.routerChat);
app.use(Products_1.routerProduct);
app.use(Random_1.routerRandom);
// solo para desafios
var info = {
    Arguments: config_1.config.arguments,
    OS: config_1.config.os,
    NodeVersion: config_1.config.NodeVersion,
    MemoryReservedRSS: config_1.config.MemoryReservedRSS,
    ExecPath: config_1.config.ExecPath,
    ProcessID: config_1.config.ProcessID,
    Folder: config_1.config.Folder,
};
app.get('/info', function (req, res) {
    res.send(info);
});
app.get('/infoCompressed', (0, compression_1.default)(), function (req, res) {
    res.send(info);
});
app.get('/*', function (req, res) {
    res.sendFile(root, 'index.html');
});
// Socket io
var httpserver = http_1.default.createServer(app);
var io = new socket_io_1.Server(httpserver, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', function (socket) {
    console.log("User Connected: ".concat(socket.id));
    socket.on('disconnect', function () {
        console.log('user disconnected', socket.id);
    });
    socket.on('join_room', function (data) {
        socket.join(data);
        // console.log(`user with ID: ${socket.id} connect to room: ${data}`)
    });
    socket.on('send_message', function (data) {
        (0, messages_1.save)(data);
        socket.to('chatRoom').emit('receive_message', data);
    });
});
// Server listener
var PORT = config_1.config.PORT;
var MODE = config_1.config.MODE;
var server = new mode_1.default();
server[MODE](PORT, httpserver);
//# sourceMappingURL=index.js.map