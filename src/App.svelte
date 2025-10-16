<script lang="ts">
    import { onMount } from "svelte";
    import { resizedArray } from "./utils";
    import PatternsModal from "./components/PatternsModal.svelte";
    import SymbolsModal from "./components/SymbolsModal.svelte";
    import FieldButton from "./components/FieldButton.svelte";
    import Flag from "./components/Flag.svelte";
    import FieldInput from "./components/FieldInput.svelte";
    import { colors, symbols, patterns } from "./definitions";
    import { current, setModal, toggleFullScreen } from "./core.svelte";
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

<div class="flex flex-col gap-4 w-full lg:w-5/6 xl:w-2/3 2xl:w-5/12 max-h-full">
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
                active={current.activeModal === "symbol-palette"}
                onclick={() => setModal("symbol-palette")}
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
                />
                <FieldButton
                    title={`Text ${i + 1} color`}
                    style={`border: 0; width: max-content;`}
                    active={current.activeModal === "text-palette" &&
                        activeTextSlot === i}
                    onclick={() => {
                        activeTextSlot = i;
                        setModal("text-palette");
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
                active={current.activeModal === "palette" &&
                    activeColorSlot === i}
                onclick={() => {
                    activeColorSlot = i;
                    setModal("palette");
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
        class="bg-white aspect-[3/2] w-full border border-gray-600/60 shadow-xl shadow-gray-600/60"
        class:overflow-y-scroll={!!current.activeModal}
        class:fullscreen={current.inFullScreen}
    >
        {#if current.activeModal !== undefined}
            {#if current.activeModal === "palette"}
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
            {:else if current.activeModal === "symbol-palette"}
                <ColorsModal
                    title="Pick symbol color"
                    choiceHandler={choiceHandler(
                        (idx) => (current.symbolColorIdx = idx),
                    )}
                    activeIdx={current.symbolColorIdx}
                />
            {:else if current.activeModal === "text-palette"}
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
        {:else}
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
        {/if}
    </main>
</div>

<style>
    main.fullscreen {
        @apply fixed top-0 left-0 w-dvw max-h-dvh border-0;
    }
</style>
