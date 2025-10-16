<script lang="ts">
    import { current } from "../core.svelte";
    import { colors } from "../definitions";
    import Modal from "./Modal.svelte";

    let { title, choiceHandler, activeIdx } = $props<{
        title: string;
        choiceHandler: (idx: number) => void;
        activeIdx: number;
    }>();
</script>

{#snippet header()}
    {title}
{/snippet}

<Modal {header}>
    <div
        class="grid grid-cols-6 grid-flow-row w-full grow"
        class:large={current.inFullScreen}
    >
        {#each colors as { hex, name }, idx}
            <button
                class="w-full border-2 transition-all"
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
    div.large button {
        @apply aspect-[3/2];
    }
    div:not(.large) button {
        @apply aspect-[4/3];
    }
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
