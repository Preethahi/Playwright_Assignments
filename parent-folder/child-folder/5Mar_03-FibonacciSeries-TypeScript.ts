function fibonacci(n: number): number[] {
    const series: number[] = [];

    let a = 0, b = 1;

    for (let i = 0; i < n; i++) {
        series.push(a);
        let next = a + b;
        a = b;
        b = next;
    }

    return series;
}

console.log(fibonacci(10));
