<script lang="ts">
    import Icon from "@iconify/svelte";
    import { palette, type Pattern } from "../core";

    let { pattern, symbolColorHex, symbolCode, colors, texts, textColors } =
        $props<{
            pattern: Pattern;
            colors: number[];
            symbolCode: string;
            symbolColorHex: string;
            texts: string[];
            textColors: number[];
        }>();
</script>

<div
    class="flex flex-col h-full w-full relative"
    class:flex-row={pattern.props.includes("vertical")}
    class:flex-col={pattern.props.includes("horizontal")}
>
    <div
        class="absolute flex flex-col justify-evenly items-center w-full h-full"
    >
        <div class="h-full flex items-center">
            <h1 class="font-bold" style={`color: ${palette[textColors[0]].hex}`}>
                {texts[0]}
            </h1>
        </div>
        <div class="h-full flex items-center" style={`color: ${symbolColorHex}; font-size: 10em`}>
            <Icon icon={symbolCode} />
        </div>
        <div class="h-full flex items-center">
            <h2 class="font-bold" style={`color: ${palette[textColors[1]].hex}`}>
                {texts[1]}
            </h2>
        </div>
    </div>
    {#each colors as pIdx}
        <div
            class="grow w-full"
            style={`background: ${palette[pIdx].hex}`}
        ></div>
    {/each}
</div>

<style>
    h1,
    h2 {
        text-shadow: 0px 1px 1px #000;
    }

    h1 {
        font-size: 2.5em;
    }

    h2 {
        font-size: 1.5em;
    }
</style>
