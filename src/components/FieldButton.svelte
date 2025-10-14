<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, children, onclick, style } = $props<{
        onclick: Function;
        style?: string;
        title: string;
        children: Snippet;
    }>();
</script>

<button
    class="bg-white flex justify-between w-full shadow-lg shadow-gray-600/30 items-center h-8 border border-gray-600/30 border-l-8 rounded text-start px-2"
    {style}
    {title}
    {onclick}
>
    {@render children()}
</button>
