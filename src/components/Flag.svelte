<script lang="ts">
    import Icon from "@iconify/svelte";
    import { palette, type Pattern } from "../core";

    let { pattern, symbolColorHex, symbolCode, colors } = $props<{
        pattern: Pattern;
        colors: number[];
        symbolCode: string;
        symbolColorHex: string;
    }>();
</script>

<div
    class="flex flex-col h-full w-full relative"
    class:flex-row={pattern.props.includes("vertical")}
    class:flex-col={pattern.props.includes("horizontal")}
>
    <div
        class="flag-symbol absolute flex justify-center items-center text-white w-full h-full"
        style={`color: ${symbolColorHex}; font-size: 10em`}
    >
        <Icon icon={symbolCode} />
    </div>
    {#each colors as pIdx}
        <div
            class="grow w-full"
            style={`background: ${palette[pIdx].hex}`}
        ></div>
    {/each}
</div>
