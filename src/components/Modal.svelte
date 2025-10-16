<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onDestroy, type Snippet } from "svelte";
    import { current, setModal, toggleFullScreen } from "../core.svelte";

    let { header, children } = $props<{
        header?: Snippet;
        children: Snippet;
    }>();

    const originalFullScreenState = current.inFullScreen;

    onDestroy(() => {
        if (originalFullScreenState !== current.inFullScreen) {
            toggleFullScreen();
        }
    });
</script>

<div class="flex flex-col gap-4 p-4 grow w-full h-max">
    <div class="flex justify-between items-center">
        {@render header()}
        <div class="flex gap-4" style="font-size: 1.25em">
            <button title="Toggle Full Screen (F)" onclick={toggleFullScreen}
                ><Icon
                    icon={current.inFullScreen
                        ? "mdi:fullscreen-exit"
                        : "mdi:fullscreen"}
                /></button
            >
            <button title="Cancel (Esc)" onclick={() => setModal()}
                ><Icon icon="mdi:close-outline" /></button
            >
        </div>
    </div>
    {@render children()}
</div>
