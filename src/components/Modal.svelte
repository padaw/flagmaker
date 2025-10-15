<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onDestroy, type Snippet } from "svelte";

    let {
        exitHandler,
        header,
        children,
        fullScreenToggler,
        fullScreenEnabled,
    } = $props<{
        exitHandler: Function;
        fullScreenToggler: Function;
        fullScreenEnabled: boolean;
        header?: Snippet;
        children: Snippet;
    }>();

    const originalFullScreenState = fullScreenEnabled;

    onDestroy(() => {
        if (originalFullScreenState !== fullScreenEnabled) {
            fullScreenToggler();
        }
    });
</script>

<div class="flex flex-col gap-4 p-4 grow w-full h-max">
    <div class="flex justify-between items-center">
        {@render header()}
        <div class="flex gap-4" style="font-size: 1.25em">
            <button title="Toggle Full Screen (F)" onclick={fullScreenToggler}
                ><Icon
                    icon={fullScreenEnabled
                        ? "mdi:fullscreen-exit"
                        : "mdi:fullscreen"}
                /></button
            >
            <button title="Cancel (Esc)" onclick={exitHandler}
                ><Icon icon="mdi:close-outline" /></button
            >
        </div>
    </div>
    {@render children()}
</div>
