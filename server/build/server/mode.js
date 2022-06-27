"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
var cluster_1 = __importDefault(require("cluster"));
var os_1 = require("os");
var logs_1 = require("../server/logs");
var path_1 = __importDefault(require("path"));
var root = path_1.default.join(__dirname);
var Server = /** @class */ (function () {
    function Server() {
        this.fork = function (PORT, server) {
            try {
                var forkServer_1 = child_process_1.default.fork("".concat(root, "/fork"));
                server
                    .listen(PORT, function () {
                    forkServer_1.on('message', function () {
                        forkServer_1.send(PORT);
                        // console.log(`Listening from ${server.address().port} - http://localhost:${PORT}`)
                        logs_1.logger.info("Listening from ".concat(server.address().port, " - http://localhost:").concat(PORT));
                    });
                })
                    .on('error', function (error) {
                    console.log(error);
                });
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        };
        this.cluster = function (PORT, server) {
            var numCPUs = (0, os_1.cpus)().length;
            if (cluster_1.default.isPrimary) {
                logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info("CPU Processors: ".concat(numCPUs));
                logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info("Master ".concat(process.pid, " initialized"));
                for (var i = 0; i < numCPUs; i++) {
                    cluster_1.default.fork();
                }
                cluster_1.default.on('exit', function (worker) {
                    logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info('worker', worker.process.pid, 'killed -', new Date().toLocaleString());
                    cluster_1.default.fork();
                });
            }
            else {
                logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info("Process Cluster: on port ".concat(PORT, " - pid: ").concat(process.pid));
                server
                    .listen(PORT, function () {
                    // console.log(`Listening from ${server.address().port} - http://localhost:${PORT}`)
                    logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.info("Listening from ".concat(server.address().port, " - http://localhost:").concat(PORT));
                })
                    .on('error', function (error) {
                    logs_1.logger === null || logs_1.logger === void 0 ? void 0 : logs_1.logger.error(error);
                });
            }
        };
    }
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=mode.js.map