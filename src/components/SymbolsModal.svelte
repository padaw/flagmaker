<script lang="ts">
    import Icon from "@iconify/svelte";
    import Modal from "./Modal.svelte";
    import { symbolSet } from "../core";

    let {
        exitHandler,
        choiceHandler,
        activeIdx,
        fullScreenToggler,
        fullScreenEnabled,
    } = $props<{
        exitHandler: Function;
        choiceHandler: (idx: number) => void;
        activeIdx: number;
        fullScreenToggler: Function;
        fullScreenEnabled: boolean;
    }>();
</script>

{#snippet header()}
    Pick a symbol
{/snippet}

<Modal {exitHandler} {header} {fullScreenEnabled} {fullScreenToggler}>
    <div
        class="grid grid-flow-row w-full grow"
        class:grid-cols-8={!fullScreenEnabled}
        class:grid-cols-12={fullScreenEnabled}
    >
        {#each symbolSet as { code, name }, idx}
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
