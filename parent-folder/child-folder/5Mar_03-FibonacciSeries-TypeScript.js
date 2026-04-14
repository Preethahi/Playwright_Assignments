function fibonacci(n) {
    var series = [];
    var a = 0, b = 1;
    for (var i = 0; i < n; i++) {
        series.push(a);
        var next = a + b;
        a = b;
        b = next;
    }
    return series;
}
console.log(fibonacci(10));
