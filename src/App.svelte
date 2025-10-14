<script lang="ts">
    import Icon from "@iconify/svelte";
    import { palette, symbolSet } from "./core.svelte";
    import PaletteModal from "./components/PaletteModal.svelte";
    import SymbolsModal from "./components/SymbolsModal.svelte";
    import FieldButton from "./components/FieldButton.svelte";
    import { onMount } from "svelte";

    let colors = $state([0, 1]);
    let symbol = $state(0);
    let symbolColor = $state(palette.findIndex((p) => p.name === "White"));
    let fullScreenEnabled = $state(false);

    let modal: "palette" | "symbols" | "symbol-palette" | undefined = $state();
    let activeColorSlot = $state(0);

    function setModal(name?: typeof modal) {
        modal = name;
    }

    const modalExitHandler = () => setModal(undefined);

    function colorChoiceHandler(idx: number) {
        colors[activeColorSlot] = idx;
        setModal();
    }

    function symbolChoiceHandler(idx: number) {
        symbol = idx;
        setModal();
    }

    function symbolColorChoiceHandler(idx: number) {
        symbolColor = idx;
        setModal();
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

<div class="flex flex-col gap-4 w-full lg:w-5/6 xl:w-2/3 2xl:w-1/3 max-h-full">
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
                    class="h-full aspect-[3/1] -mr-2"
                    style={`background: ${palette[pIdx].hex}`}
                ></div>
            </FieldButton>
        {/each}
    </div>
    <div class="flex gap-4">
        <FieldButton
            title="Selected symbol"
            style="flex-grow: 1"
            onclick={() => setModal("symbols")}
        >
            <span class="font-bold">Symbol: </span>
            <span>{symbolSet[symbol].name}</span>
        </FieldButton>
        <FieldButton
            title="Selected symbol"
            style={`border-color: ${palette[symbolColor].hex}; width: max-content`}
            onclick={() => setModal("symbol-palette")}
        >
            <div
                class="h-full aspect-[3/1] -mx-2"
                style={`background: ${palette[symbolColor].hex}`}
            ></div>
        </FieldButton>
    </div>
    <main
        class="bg-white aspect-[3/2] w-full border border-gray-600/60 shadow-xl shadow-gray-600/60 overflow-y-scroll"
        class:fullscreen={fullScreenEnabled}
    >
        {#if modal !== undefined}
            {#if modal === "palette"}
                <PaletteModal
                    title={`Pick color ${activeColorSlot + 1}`}
                    choiceHandler={colorChoiceHandler}
                    exitHandler={modalExitHandler}
                    activeIdx={colors[activeColorSlot]}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else if modal === "symbols"}
                <SymbolsModal
                    choiceHandler={symbolChoiceHandler}
                    exitHandler={modalExitHandler}
                    activeIdx={symbol}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {:else}
                <PaletteModal
                    title="Pick symbol color"
                    choiceHandler={symbolColorChoiceHandler}
                    exitHandler={modalExitHandler}
                    activeIdx={symbolColor}
                    {fullScreenEnabled}
                    fullScreenToggler={toggleFullScreen}
                />
            {/if}
        {:else}
            <button
                class="flex flex-col h-full w-full relative"
                aria-label="Current flag"
                onclick={toggleFullScreen}
            >
                <div
                    class="flag-symbol absolute flex justify-center items-center text-white w-full h-full"
                    style={`color: ${palette[symbolColor].hex}; font-size: 10em`}
                >
                    <Icon icon={symbolSet[symbol].code} />
                </div>
                {#each colors as pIdx}
                    <div
                        class="grow w-full"
                        style={`background: ${palette[pIdx].hex}`}
                    ></div>
                {/each}
            </button>
        {/if}
    </main>
</div>

<style>
    main.fullscreen {
        @apply fixed top-0 left-0 w-dvw max-h-dvh border-0 2xl:text-4xl;
    }
</style>
