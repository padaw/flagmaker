<script lang="ts">
    import Icon from "@iconify/svelte";
    import Modal from "./Modal.svelte";
    import { current } from "../core.svelte";
    import { symbols } from "../definitions";

    let { choiceHandler, activeIdx } = $props<{
        choiceHandler: (idx: number) => void;
        activeIdx: number;
    }>();
</script>

{#snippet header()}
    Pick a symbol
{/snippet}

<Modal {header}>
    <div
        class="grid grid-flow-row w-full grow"
        class:grid-cols-8={!current.inFullScreen}
        class:grid-cols-12={current.inFullScreen}
    >
        {#each symbols as { code, name }, idx}
            <button
                class="w-full border-2 flex justify-center items-center hover:bg-gray-200 transition-all"
                style="font-size: 2em; padding: .5em 0;"
                class:active={activeIdx === idx}
                title={name}
                onclick={() => {
                    choiceHandler(idx);
                }}><Icon icon={code} /></button
            >
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
