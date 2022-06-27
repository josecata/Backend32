process.on('exit', function () {
    console.log("worker ".concat(process.pid, " killed"));
});
process.send('start');
process.on('message', function (PORT) {
    console.log("Process Fork: on port: ".concat(PORT, " - pid: ").concat(process.pid));
});
//# sourceMappingURL=fork.js.map