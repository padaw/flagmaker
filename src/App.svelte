<script lang="ts">
    import { onMount } from "svelte";
    import { resizedArray } from "./utils";
    import { palette, patterns, symbolSet } from "./core";
    import PaletteModal from "./components/PaletteModal.svelte";
    import SymbolsModal from "./components/SymbolsModal.svelte";
    import FieldButton from "./components/FieldButton.svelte";
    import Flag from "./components/Flag.svelte";
    import PatternsModal from "./components/PatternsModal.svelte";

    let patternIdx = $state(0);
    let colors = $state(resizedArray([], patterns[0].colorCount));
    let symbol = $state(0);
    let symbolColor = $state(palette.findIndex((p) => p.name === "White"));
    let fullScreenEnabled = $state(false);

    let modal:
        | "palette"
        | "symbols"
        | "symbol-palette"
        | "patterns"
        | undefined = $state();
    let activeColorSlot = $state(0);

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
    <div class="flex gap-4">
        <FieldButton title="Pattern" onclick={() => setModal("patterns")}>
            <span class="font-bold">Pattern: </span>
            <span>{patterns[patternIdx].name}</span>
        </FieldButton>
        <FieldButton
            title="Symbol"
            style="flex-grow: 1"
            onclick={() => setModal("symbols")}
        >
            <span class="font-bold">Symbol: </span>
            <span>{symbolSet[symbol].name}</span>
        </FieldButton>
        <FieldButton
            title="Symbol color"
            style={`width: max-content; border-left-width: 1px`}
            onclick={() => setModal("symbol-palette")}
        >
            <div
                class="h-full aspect-[2/1] -mx-2"
                style={`background: ${palette[symbolColor].hex}`}
            ></div>
        </FieldButton>
    </div>
    <div class="flex gap-4 w-full">
        {#each colors as pIdx, i}
            <FieldButton
                style={`border-color: ${palette[pIdx].hex}`}
                title={`Color ${i + 1}`}
                onclick={() => {
                    activeColorSlot = i;
                    setModal("palette");
                }}
            >
                <div class="grow">
                    <span class="font-bold">{i + 1}: </span>
                    <span>{palette[pIdx].name}</span>
                </div>
                <div
                    class="h-full aspect-[2/1] -mr-2"
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
            {:else}
                <PatternsModal
                    choiceHandler={choiceHandler((idx) => (patternIdx = idx))}
                    exitHandler={modalExitHandler}
                    activeIdx={patternIdx}
                    {colors}
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
        @apply fixed top-0 left-0 w-dvw max-h-dvh border-0 2xl:text-4xl;
    }
</style>
