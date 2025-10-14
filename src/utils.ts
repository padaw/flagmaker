export function resizedArray(arr: number[], n: number): number[] {
    if (n < arr.length) {
        return arr.slice(0, n);
    }
    if (n > arr.length) {
        let next = [...arr];
        for (let i = next.length; i < n; i++) {
            next.push(i);
        }
        return next;
    }
    return arr;
}
