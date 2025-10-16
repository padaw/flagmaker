<script lang="ts">
    import Icon from "@iconify/svelte";
    import { colors, symbols, type PatternProps } from "../definitions";
    import { onMount } from "svelte";
    import { current } from "../core.svelte";

    let {
        pattern,
        colorsIdx,
        symbolIdx,
        symbolColorIdx,
        texts,
        textColorsIdx,
    } = $props<{
        pattern: PatternProps;
        colorsIdx: number[];
        symbolIdx: number;
        symbolColorIdx: number;
        texts: string[];
        textColorsIdx: number[];
    }>();

    let el: HTMLDivElement;
    let symbolSize = $state(0);
    let h1Size = $state(0);
    let h2Size = $state(0);

    function resize() {
        const height = el.offsetHeight;
        symbolSize = height / 3;
        h1Size = height / 12;
        h2Size = height / 15;
    }
    $effect(() => {
        // trick into re-render
        current.inFullScreen;
        resize();
    });

    onMount(resize);
</script>

<div
    class="flex h-full w-full relative"
    class:flex-row={pattern.props.includes("vertical")}
    class:flex-col={pattern.props.includes("horizontal")}
    bind:this={el}
>
    <div class="absolute flex flex-col items-center w-full h-full overflow-hidden">
        <div class="h-full flex items-center">
            <h1
                class="font-bold"
                style={`color: ${colors[textColorsIdx[0]].hex}; font-size: ${h1Size}px`}
            >
                {texts[0]}
            </h1>
        </div>
        <div
            class="h-full flex items-center"
            style={`color: ${colors[symbolColorIdx].hex}; font-size: ${symbolSize}px`}
        >
            <Icon icon={symbols[symbolIdx].code} />
        </div>
        <div class="h-full flex items-center">
            <h2
                class="font-bold"
                style={`color: ${colors[textColorsIdx[1]].hex}; font-size: ${h2Size}px`}
            >
                {texts[1]}
            </h2>
        </div>
    </div>
    {#each colorsIdx as cIdx}
        <div
            class="grow w-full h-full"
            style={`background: ${colors[cIdx].hex}`}
        ></div>
    {/each}
</div>

<style>
    h1,
    h2 {
        text-shadow: 0px 1px 1px #000;
    }
</style>
