<script lang="ts">
    import type { Snippet } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let { title, children, onclick, active, style } = $props<{
        onclick: MouseEventHandler<HTMLButtonElement>;
        active?: boolean;
        style?: string;
        title: string;
        children: Snippet;
    }>();
</script>

<button
    class="field-btn transition-all overflow-hidden bg-white flex justify-between w-full shadow-lg items-center h-8 border border-gray-600/30 border-l-8 rounded text-start px-2"
    class:active
    {style}
    {title}
    {onclick}
>
    {@render children()}
</button>

<style>
    button {
        @apply shadow-gray-600/30;
    }
    button.active {
        @apply shadow-zinc-500;
    }
</style>
