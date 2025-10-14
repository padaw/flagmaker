<script lang="ts">
    import Modal from "./Modal.svelte";
    import { palette } from "../core";

    let {
        title,
        exitHandler,
        choiceHandler,
        activeIdx,
        fullScreenToggler,
        fullScreenEnabled,
    } = $props<{
        title: string;
        exitHandler: Function;
        fullScreenToggler: Function;
        fullScreenEnabled: boolean;
        choiceHandler: (idx: number) => void;
        activeIdx: number;
    }>();
</script>

{#snippet header()}
    {title}
{/snippet}

<Modal {exitHandler} {header} {fullScreenEnabled} {fullScreenToggler}>
    <div class="grid grid-cols-4 grid-rows-4 grid-flow-row w-full grow">
        {#each palette as { hex, name }, idx}
            <button
                class="h-full w-full border-2 transition-all"
                style={`background: ${hex}`}
                class:active={activeIdx === idx}
                title={name}
                onclick={() => {
                    choiceHandler(idx);
                }}
            ></button>
        {/each}
    </div>
</Modal>

<style>
    button {
        @apply border-transparent;
    }
    button.active {
        @apply border-black;
    }
    button:not(.active):hover {
        @apply border-gray-200;
    }
</style>
