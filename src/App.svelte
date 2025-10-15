<script lang="ts">
    import { onMount } from "svelte";
    import { resizedArray } from "./utils";
    import { palette, patterns, symbolSet } from "./core";
    import PaletteModal from "./components/PaletteModal.svelte";
    import SymbolsModal from "./components/SymbolsModal.svelte";
    import FieldButton from "./components/FieldButton.svelte";
    import Flag from "./components/Flag.svelte";
    import PatternsModal from "./components/PatternsModal.svelte";
    import FieldInput from "./components/FieldInput.svelte";

    const whiteIdx = palette.findIndex((p) => p.name === "White");

    let patternIdx = $state(0);
    let colors = $state(resizedArray([], patterns[0].colorCount));
    let activeColorSlot = $state(0);
    let symbol = $state(0);
    let symbolColor = $state(whiteIdx);
    let texts = $state(["", ""]);
    let textColors = $state([whiteIdx, whiteIdx]);
    let activeTextSlot = $state(-1);

    let modal:
        | "palette"
        | "symbols"
        | "symbol-palette"
        | "patterns"
        | "text-palette"
        | undefined = $state();

    let fullScreenEnabled = $state(false);

    $effect(() => {
        if (patterns[patternIdx].colorCount != colors.length) {
            colors = resizedArray(colors, patterns[patternIdx].colorCount);
        }
    });

    function setModal(name?: typeof modal) {
        modal = name;
    }

    function modalExitHandler() {
        setModal(undefined);
    }

    function choiceHandler(setter: (idx: number) => any) {
        return (idx: number) => {
            setter(idx);
            setModal(undefined);
        };
    }

    function toggleFullScreen() {
        fullScreenEnabled = !fullScreenEnabled;
    }

    onMount(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && fullScreenEnabled) {
                toggleFullScreen();
            }
        });
    });
</script>

<div class="flex flex-col gap-4 w-full lg:w-5/6 xl:w-2/3 2xl:w-5/12 max-h-full">
    <div class="grid grid-cols-2 gap-4">
        <FieldButton
            title="Pattern"
            onclick={() => setModal("patterns")}
            active={modal === "patterns"}
        >
            <span class="font-bold">Pattern:</span>
            <span>{patterns[patternIdx].name}</span>
        </FieldButton>
        <div class="w-full flex gap-1">
            <FieldButton
                title="Symbol"
                onclick={() => setModal("symbols")}
                active={modal === "symbols"}
            >
                <div class="flex gap-2 grow">
                    <span class="font-bold">Symbol:</span>
                    <span>{symbolSet[symbol].name}</span>
                </div>
            </FieldButton>
            <FieldButton
                title="Symbol color"
                style={`border: 0; width: max-content;`}
                active={modal === "symbol-palette"}
                onclick={() => setModal("symbol-palette")}
            >
                <div
                    class="h-full aspect-[2/1] -ml-2"
                    style={`background: ${palette[symbolColor].hex}`}
                ></div>
            </FieldButton>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
        {#each texts as _, i}
            <div class="flex gap-1">
                <FieldInput
                    label={`Text ${i + 1}`}
                    handler={(val) => (texts[i] = val)}
                />
                <FieldButton
                    title={`Text ${i + 1} color`}
                    style={`border: 0; width: max-content;`}
                    active={modal === "text-palette" && activeTextSlot === i}
                    onclick={() => {
                        activeTextSlot = i;
                        setModal("text-palette");
                    }}
                >
                    <div
                        class="h-full aspect-[2/1] -ml-2"
                        style={`background: ${palette[textColors[i]].hex}`}
                    ></div>
                </FieldButton>
            </div>
        {/each}
    </div>
    <div class="flex gap-4 w-full">
        {#each colors as pIdx, i}
            <FieldButton
                style={`border-color: ${palette[pIdx].hex}`}
                title={`Color ${i + 1}`}
                active={modal === "palette" && activeColorSlot === i}
                onclick={() => {
                    activeColorSlot = i;
                    setModal("palette");
                }}
            >
                <div class="grow flex gap-2">
                    <span class="font-bold">{i + 1}:</span>
                    <span>{palette[pIdx].name}</span>
                </div>
                <div
                    class="transition-all h-full aspect-[2/1] -mr-2 border-l border-gray-600/30"
                    style={`background: ${palette[pIdx].hex}`}
                ></div>
            </FieldButton>
        {/each}
    </div>
    <main
        class="bg-white aspect-[3/2] w-full border border-gray-600/60 shadow-xl shadow-gray-600/60"
        class:overflow-y-scroll={!!modal}
        class:fullscreen={fullScreenEnabled}
    >
        {#if modal !== undefined}
            {#if modal === "palette"}
                <PaletteModal
                    title={`Pick color ${activeColorSlot + 1}`}
                    choiceHandler={choiceHandler(
                        (idx) => (colors[activeColorSlot] = idx),
                    )}
                    exitHandler={modalExitHandler}
                    activeIdx={colors[activeColorSlot]}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else if modal === "symbols"}
                <SymbolsModal
                    choiceHandler={choiceHandler((idx) => (symbol = idx))}
                    exitHandler={modalExitHandler}
                    activeIdx={symbol}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else if modal === "symbol-palette"}
                <PaletteModal
                    title="Pick symbol color"
                    choiceHandler={choiceHandler((idx) => (symbolColor = idx))}
                    exitHandler={modalExitHandler}
                    activeIdx={symbolColor}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else if modal === "text-palette"}
                <PaletteModal
                    title={`Pick text ${activeTextSlot + 1} color`}
                    choiceHandler={choiceHandler(
                        (idx) => (textColors[activeTextSlot] = idx),
                    )}
                    exitHandler={modalExitHandler}
                    activeIdx={textColors[activeTextSlot]}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else}
                <PatternsModal
                    choiceHandler={choiceHandler((idx) => (patternIdx = idx))}
                    exitHandler={modalExitHandler}
                    activeIdx={patternIdx}
                    {colors}
                    {texts}
                    {textColors}
                    symbolCode={symbolSet[symbol].code}
                    symbolColorHex={palette[symbolColor].hex}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {/if}
        {:else}
            <button class="w-full h-full" onclick={toggleFullScreen}>
                <Flag
                    {colors}
                    {texts}
                    {textColors}
                    pattern={patterns[patternIdx]}
                    symbolCode={symbolSet[symbol].code}
                    symbolColorHex={palette[symbolColor].hex}
                />
            </button>
        {/if}
    </main>
</div>

<style>
    main.fullscreen {
        @apply fixed top-0 left-0 w-dvw max-h-dvh border-0 2xl:text-3xl;
    }
</style>
