export function makeId(): number {
    return Math.round(Math.random() * 10_000_000_000);
}

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

// https://javascript.plainenglish.io/javascript-create-file-c36f8bccb3be
export function download(file: File) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(file);

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export function upload(accept: string): Promise<File | undefined> {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.click();

    return new Promise((resolve) => {
        input.addEventListener("change", (e: any) => {
            resolve(e.target.files[0]);
        });
    });
}
