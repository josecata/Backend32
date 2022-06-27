var randoms = function (x) {
    var numbers = {};
    var cant = x;
    if (!cant || isNaN(cant)) {
        cant = 100000000;
    }
    else {
        cant = Number(cant);
    }
    for (var i = 0; i <= cant; i++) {
        var a = Math.floor(Math.random() * 2000 + 1);
        if (isNaN(numbers[a])) {
            numbers[a] = 1;
        }
        else {
            numbers[a]++;
        }
    }
    return numbers;
};
process.on('message', function (req) {
    process.send(randoms(req));
    process.exit();
});
process.send('start');
//# sourceMappingURL=random.js.map