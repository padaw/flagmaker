<script lang="ts">
    let { label, handler, initialValue } = $props<{
        label: string;
        handler: (val: string) => any;
        initialValue?: string;
    }>();

    let init = initialValue ?? "";
    let text = $state(init);

    $effect(() => {
        if (initialValue !== init) {
            text = initialValue;
            init = initialValue;
        }
    });

    // idk?
    $effect(() => {
        handler(text);
    });
</script>

<div
    class="overflow-hidden bg-white flex gap-2 justify-between w-full shadow-lg items-center h-8 border border-gray-600/30 border-l-8 rounded text-start px-2 transition-all"
>
    <span class="font-bold">{label}:</span>
    <input
        type="text"
        placeholder="Your Text"
        class="grow outline-none"
        bind:value={text}
    />
</div>

<style>
    div {
        @apply shadow-gray-600/30;
    }
    div:has(input:focus) {
        @apply shadow-zinc-500;
    }
</style>
