<script lang="ts">
    import Modal from "./Modal.svelte";
    import Flag from "./Flag.svelte";
    import { resizedArray } from "../utils";
    import { patterns } from "../definitions";

    let {
        choiceHandler,
        activeIdx,
        colorsIdx,
        symbolIdx,
        symbolColorIdx,
        texts,
        textColorsIdx,
    } = $props<{
        choiceHandler: (idx: number) => void;
        activeIdx: number;
        colorsIdx: number[];
        symbolIdx: number;
        symbolColorIdx: number;
        texts: string[];
        textColorsIdx: number[];
    }>();
</script>

{#snippet header()}
    Pick a pattern
{/snippet}

<Modal {header}>
    <div class="grid grid-cols-2 w-full grow">
        {#each patterns as pattern, idx}
            <button
                class="w-full aspect-[3/2] border-2 transition-all"
                class:active={activeIdx === idx}
                title={pattern.name}
                onclick={() => {
                    choiceHandler(idx);
                }}
            >
                <Flag
                    colorsIdx={resizedArray(colorsIdx, pattern.colorCount)}
                    {pattern}
                    {symbolIdx}
                    {symbolColorIdx}
                    {texts}
                    {textColorsIdx}
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
