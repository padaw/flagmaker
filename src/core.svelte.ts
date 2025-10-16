import { colors, patterns } from "./definitions";
import { resizedArray } from "./utils";

const whiteIdx = colors.findIndex((p) => p.name === "White");

export let current: FlagState = $state({
    patternIdx: 0,
    colorsIdx: resizedArray([], patterns[0].colorCount),
    symbolIdx: 0,
    symbolColorIdx: whiteIdx,
    texts: ["", ""],
    textColorsIdx: [whiteIdx, whiteIdx],
});

export function setModal(val?: Modal) {
    current.activeModal = val;
}

export function toggleFullScreen() {
    current.inFullScreen = !current.inFullScreen;
}

export type FlagState = {
    patternIdx: number;
    colorsIdx: number[];
    symbolIdx: number;
    symbolColorIdx: number;
    texts: string[];
    textColorsIdx: number[];
    activeModal?: Modal;
    inFullScreen?: boolean;
};

export type Modal =
    | "palette"
    | "symbols"
    | "symbol-palette"
    | "patterns"
    | "text-palette";
