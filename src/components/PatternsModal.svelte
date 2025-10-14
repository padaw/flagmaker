<script lang="ts">
    import Modal from "./Modal.svelte";
    import { patterns } from "../core";
    import Flag from "./Flag.svelte";
    import { resizedArray } from "../utils";

    let {
        exitHandler,
        choiceHandler,
        activeIdx,
        fullScreenToggler,
        fullScreenEnabled,
        symbolColorHex,
        symbolCode,
        colors,
        texts,
        textColors,
    } = $props<{
        exitHandler: Function;
        choiceHandler: (idx: number) => void;
        activeIdx: number;
        colors: number[];
        symbolCode: string;
        symbolColorHex: string;
        fullScreenToggler: Function;
        fullScreenEnabled: boolean;
        texts: string[];
        textColors: number[];
    }>();
</script>

{#snippet header()}
    Pick a pattern
{/snippet}

<Modal {exitHandler} {header} {fullScreenEnabled} {fullScreenToggler}>
    <div class="grid grid-cols-2 w-full grow">
        {#each patterns as pattern, idx}
            <button
                class="w-full aspect-[3/2] border-2 transition-all"
                style="font-size: .5em"
                class:active={activeIdx === idx}
                title={pattern.name}
                onclick={() => {
                    choiceHandler(idx);
                }}
            >
                <Flag
                    colors={resizedArray(colors, pattern.colorCount)}
                    {pattern}
                    {symbolCode}
                    {symbolColorHex}
                    {texts}
                    {textColors}
                />
            </button>
        {/each}
    </div>
</Modal>

<style>
    button {
        @apply border-gray-200;
    }
    button.active {
        @apply border-black;
    }
</style>
