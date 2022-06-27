"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerRandom = void 0;
var express_1 = require("express");
var child_process_1 = require("child_process");
exports.routerRandom = (0, express_1.Router)();
exports.routerRandom.get('/api/randoms', function (req, res) {
    var randomFork = (0, child_process_1.fork)('./src/Controllers/random');
    randomFork.on('message', function (result) {
        randomFork.send(req.body.cant);
        result !== 'start' && res.send(result);
    });
});
//# sourceMappingURL=Random.js.map