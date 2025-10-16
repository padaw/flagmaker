<script lang="ts">
    import { onMount } from "svelte";
    import { resizedArray } from "./utils";
    import PatternsModal from "./components/PatternsModal.svelte";
    import SymbolsModal from "./components/SymbolsModal.svelte";
    import FieldButton from "./components/FieldButton.svelte";
    import Flag from "./components/Flag.svelte";
    import FieldInput from "./components/FieldInput.svelte";
    import { colors, symbols, patterns } from "./definitions";
    import {
        current,
        exportDesignConfig,
        exportDesignImage,
        importDesignConfig,
        setModal,
        toggleFullScreen,
    } from "./core.svelte";
    import ColorsModal from "./components/ColorsModal.svelte";

    let activeColorSlot = $state(-1);
    let activeTextSlot = $state(-1);

    function choiceHandler(setter: (idx: number) => any) {
        return (idx: number) => {
            setter(idx);
            setModal();
        };
    }

    $effect(() => {
        const len = current.colorsIdx.length;
        const req = patterns[current.patternIdx].colorCount;
        if (req !== len) {
            current.colorsIdx = resizedArray(current.colorsIdx, req);
        }
    });

    onMount(() => {
        window.addEventListener("keydown", (e) => {
            if (e.target instanceof Element && "INPUT" === e.target.tagName) {
                return;
            }
            if (e.key === "f" || (e.key === "Escape" && current.inFullScreen)) {
                toggleFullScreen();
            }
            if (e.key === "Escape" && current.activeModal !== undefined) {
                setModal();
            }
        });
    });
</script>

<div
    id="splash"
    class="fixed top-0 left-0 w-dvw h-dvh bg-gray-100 z-50 hidden"
></div>

<div
    class="flex flex-col gap-4 w-full lg:w-5/6 xl:w-2/3 2xl:w-1/2 max-h-full"
    class:fullscreen={current.inFullScreen}
>
    <div class="grid grid-cols-2 gap-4">
        <FieldButton
            title="Pattern"
            onclick={() => setModal("patterns")}
            active={current.activeModal === "patterns"}
        >
            <span class="font-bold">Pattern:</span>
            <span>{patterns[current.patternIdx].name}</span>
        </FieldButton>
        <div class="w-full flex gap-1">
            <FieldButton
                title="Symbol"
                onclick={() => setModal("symbols")}
                active={current.activeModal === "symbols"}
            >
                <div class="flex gap-2 grow">
                    <span class="font-bold">Symbol:</span>
                    <span>{symbols[current.symbolIdx].name}</span>
                </div>
            </FieldButton>
            <FieldButton
                title="Symbol color"
                style={`border: 0; width: max-content;`}
                active={current.activeModal === "symbol-colors"}
                onclick={() => setModal("symbol-colors")}
            >
                <div
                    class="h-full aspect-[2/1] -ml-2"
                    style={`background: ${colors[current.symbolColorIdx].hex}`}
                ></div>
            </FieldButton>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
        {#each current.texts as _, i}
            <div class="flex gap-1">
                <FieldInput
                    label={`Text ${i + 1}`}
                    handler={(val) => (current.texts[i] = val)}
                    initialValue={current.initialTexts[i]}
                />

                <FieldButton
                    title={`Text ${i + 1} color`}
                    style={`border: 0; width: max-content;`}
                    active={current.activeModal === "text-colors" &&
                        activeTextSlot === i}
                    onclick={() => {
                        activeTextSlot = i;
                        setModal("text-colors");
                    }}
                >
                    <div
                        class="h-full aspect-[2/1] -ml-2"
                        style={`background: ${colors[current.textColorsIdx[i]].hex}`}
                    ></div>
                </FieldButton>
            </div>
        {/each}
    </div>
    <div class="flex gap-4 w-full">
        {#each current.colorsIdx as cIdx, i}
            <FieldButton
                style={`border-color: ${colors[cIdx].hex}`}
                title={`Color ${i + 1}`}
                active={current.activeModal === "colors" &&
                    activeColorSlot === i}
                onclick={() => {
                    activeColorSlot = i;
                    setModal("colors");
                }}
            >
                <div class="grow flex gap-2">
                    <span class="font-bold">{i + 1}:</span>
                    <span>{colors[cIdx].name}</span>
                </div>
                <div
                    class="transition-all h-full aspect-[2/1] -mr-2 border-l border-gray-600/30"
                    style={`background: ${colors[cIdx].hex}`}
                ></div>
            </FieldButton>
        {/each}
    </div>
    <main
        class="bg-white aspect-[8/5] h-full w-full max-h-dvh border border-gray-600/60 shadow-xl shadow-gray-600/60"
        class:overflow-y-scroll={!!current.activeModal}
    >
        {#if current.activeModal === undefined}
            <button class="w-full h-full" onclick={toggleFullScreen}>
                <Flag
                    pattern={patterns[current.patternIdx]}
                    colorsIdx={current.colorsIdx}
                    symbolIdx={current.symbolIdx}
                    symbolColorIdx={current.symbolColorIdx}
                    texts={current.texts}
                    textColorsIdx={current.textColorsIdx}
                />
            </button>
        {:else if current.activeModal === "colors"}
            <ColorsModal
                title={`Pick color ${activeColorSlot + 1}`}
                choiceHandler={choiceHandler(
                    (idx) => (current.colorsIdx[activeColorSlot] = idx),
                )}
                activeIdx={current.colorsIdx[activeColorSlot]}
            />
        {:else if current.activeModal === "symbols"}
            <SymbolsModal
                choiceHandler={choiceHandler(
                    (idx) => (current.symbolIdx = idx),
                )}
                activeIdx={current.symbolIdx}
            />
        {:else if current.activeModal === "symbol-colors"}
            <ColorsModal
                title="Pick symbol color"
                choiceHandler={choiceHandler(
                    (idx) => (current.symbolColorIdx = idx),
                )}
                activeIdx={current.symbolColorIdx}
            />
        {:else if current.activeModal === "text-colors"}
            <ColorsModal
                title={`Pick text ${activeTextSlot + 1} color`}
                choiceHandler={choiceHandler(
                    (idx) => (current.textColorsIdx[activeTextSlot] = idx),
                )}
                activeIdx={current.textColorsIdx[activeTextSlot]}
            />
        {:else}
            <PatternsModal
                choiceHandler={choiceHandler(
                    (idx) => (current.patternIdx = idx),
                )}
                activeIdx={current.patternIdx}
                colorsIdx={current.colorsIdx}
                symbolIdx={current.symbolIdx}
                symbolColorIdx={current.symbolColorIdx}
                texts={current.texts}
                textColorsIdx={current.textColorsIdx}
            />
        {/if}
    </main>
    <div class="flex justify-end gap-2">
        <FieldButton
            title="Import a design config"
            style="width: max-content"
            onclick={importDesignConfig}>Import</FieldButton
        >
        <FieldButton
            title="Export current design config"
            style="width: max-content"
            onclick={exportDesignConfig}>Export</FieldButton
        >
        <FieldButton
            title="Download the image of current design"
            style="width: max-content; border-color: #F15BB5"
            onclick={exportDesignImage}
            ><b>Save this masterpiece!</b></FieldButton
        >
    </div>
</div>

<style>
    .fullscreen {
        @apply fixed top-0 left-0 w-dvw max-h-dvh border-0;
    }
    .fullscreen div {
        display: none;
    }
    .fullscreen main {
        @apply border-0;
    }
</style>
