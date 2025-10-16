import html2canvas from "html2canvas";
import { colors, patterns } from "./definitions";
import { download, makeId, resizedArray, upload } from "./utils";

const whiteIdx = colors.findIndex((p) => p.name === "White");

export let current: FlagState = $state({
    id: makeId(),
    patternIdx: 0,
    colorsIdx: resizedArray([], patterns[0].colorCount),
    symbolIdx: 0,
    symbolColorIdx: whiteIdx,
    texts: ["", ""],
    initialTexts: ["", ""],
    textColorsIdx: [whiteIdx, whiteIdx],
});

export function setModal(val?: Modal) {
    current.activeModal = val;
}

export function toggleFullScreen() {
    current.inFullScreen = !current.inFullScreen;
}

export async function importDesignConfig() {
    const file = await upload("application/json");
    if (!file) {
        return;
    }
    const str = await file.text();
    const obj = JSON.parse(str);
    for (const key in current) {
        if (key in obj) {
            // @ts-ignore
            current[key] = obj[key];
        }
    }
    current.initialTexts = obj.texts;
}

export function exportDesignConfig() {
    const { initialTexts, activeModal, inFullScreen, ...obj } = current;
    const str = JSON.stringify(obj);
    const file = new File([str], `flagmaker-${current.id}.json`, {
        type: "application/json",
    });
    download(file);
}

export function exportDesignImage() {
    async function downloadImg() {
        const canvas = await html2canvas(document.querySelector("main")!);
        document.body.appendChild(canvas);
        canvas.toBlob((blob) => {
            if (!blob) {
                return;
            }
            const file = new File([blob], `flagmaker-${current.id}.png`);
            download(file);
        });
        document.body.removeChild(canvas);
    }

    if (!current.inFullScreen) {
        const splash = document.getElementById("splash")!;
        splash.style.display = "block";
        toggleFullScreen();
        setTimeout(() => {
            downloadImg();
            toggleFullScreen();
            splash.style.display = "none";
        }, 300);
    } else {
        downloadImg();
    }
}

export type FlagState = {
    id: number;
    patternIdx: number;
    colorsIdx: number[];
    symbolIdx: number;
    symbolColorIdx: number;
    texts: string[];
    /** cheat to update text fields after importing a design :/ */
    initialTexts: string[];
    textColorsIdx: number[];
    activeModal?: Modal;
    inFullScreen?: boolean;
};

export type Modal =
    | "colors"
    | "symbols"
    | "symbol-colors"
    | "patterns"
    | "text-colors";
