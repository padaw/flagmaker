<script lang="ts">
    import Icon from "@iconify/svelte";

    let palette = [
        { hex: "#E63946", name: "Vibrant Red" },
        { hex: "#FFD166", name: "Sunny Yellow" },
        { hex: "#118AB2", name: "Strong Blue" },
        { hex: "#06D6A0", name: "Grass Green" },
        { hex: "#588157", name: "Earth Green" },
        { hex: "#FB5607", name: "Bright Orange" },
        { hex: "#9B5DE5", name: "Warm Purple" },
        { hex: "#5A189A", name: "Deep Purple" },
        { hex: "#A2D2FF", name: "Sky Blue" },
        { hex: "#6A687A", name: "Warm Gray" },
        { hex: "#FF6B6B", name: "Coral Pink" },
        { hex: "#4ECDC4", name: "Turquoise" },
        { hex: "#FF9E6D", name: "Peach" },
        { hex: "#F15BB5", name: "Bubblegum Pink" },
        { hex: "#FFF", name: "White" },
        { hex: "#000", name: "Black" },
    ];

    let symbolSet = [
        // 🏆 Achievement & Success
        { code: "material-symbols:trophy", name: "Trophy" },
        { code: "material-symbols:star", name: "Star" },
        { code: "material-symbols:military-tech", name: "Medal" },
        { code: "material-symbols:workspace-premium", name: "Award" },
        { code: "material-symbols:emoji-events", name: "Winner Cup" },

        // ❤️ Positive Feelings & Community
        { code: "material-symbols:favorite", name: "Heart" },
        { code: "material-symbols:group", name: "Group" },
        { code: "material-symbols:handshake", name: "Handshake" },
        { code: "material-symbols:psychology", name: "Idea" },
        { code: "material-symbols:lightbulb", name: "Lightbulb" },

        // 🧠 Learning & Knowledge
        { code: "material-symbols:book", name: "Book" },
        { code: "material-symbols:school", name: "School" },
        { code: "material-symbols:history-edu", name: "Graduation" },
        { code: "material-symbols:auto-stories", name: "Stack of Books" },
        { code: "material-symbols:menu-book", name: "Open Book" },

        // ✨ Creativity & Expression
        { code: "material-symbols:palette", name: "Palette" },
        { code: "material-symbols:draw", name: "Pencil" },
        { code: "material-symbols:brush", name: "Paintbrush" },
        { code: "material-symbols:music-note", name: "Music Note" },
        { code: "material-symbols:theater-comedy", name: "Comedy Masks" },

        // 🔭 Exploration & Nature
        { code: "material-symbols:explore", name: "Compass" },
        { code: "material-symbols:public", name: "Globe" },
        { code: "material-symbols:park", name: "Tree" },
        { code: "material-symbols:flutter-dash", name: "Bird" },
        { code: "material-symbols:pets", name: "Paw Print" },

        // ⚡ Actions & Movement
        { code: "material-symbols:sports-handball", name: "Active Person" },
        { code: "material-symbols:directions-run", name: "Running" },
        { code: "material-symbols:flight", name: "Paper Airplane" },
        { code: "material-symbols:rocket-launch", name: "Rocket" },
        { code: "material-symbols:play-arrow", name: "Play Arrow" },

        // 🤝 Safety & Guidance
        { code: "material-symbols:shield", name: "Shield" },
        { code: "material-symbols:home", name: "Home" },
    ];

    let colors = $state([0, 1]);
    let symbol = $state(0);

    let modal: "palette" | "symbols" | undefined = $state();
    let activeColor = $state(0);
</script>

<main class="flex flex-col gap-4 w-full lg:w-5/6 xl:w-2/3 2xl:w-1/3 max-h-full">
    <div class="flex gap-4 w-full">
        {#each colors as pIdx, i}
            <button
                class="transition-all bg-white flex grow h-8 justify-between items-center rounded border border-l-8 pl-2 shadow-lg shadow-gray-600/30 text-start"
                style={`border-color: ${palette[pIdx].hex}`}
                title={`Color ${i + 1}`}
                onclick={() => {
                    modal = "palette";
                    activeColor = i;
                }}
            >
                <div class="grow">
                    <span class="font-bold">{i + 1}: </span>
                    <span>{palette[pIdx].name}</span>
                </div>
                <div
                    class="h-full aspect-[3/1]"
                    style={`background: ${palette[pIdx].hex}`}
                ></div>
            </button>
        {/each}
    </div>
    <button
        class="bg-white flex justify-between w-full shadow-lg shadow-gray-600/30 items-center h-8 border border-gray-600/30 border-l-8 rounded px-2"
        title={`Selected symbol`}
        onclick={() => {
            modal = "symbols";
        }}
    >
        <span class="font-bold">Symbol: </span>
        <span>{symbolSet[symbol].name}</span>
    </button>
    <section
        class="bg-white aspect-[3/2] w-full border border-gray-600/60 shadow-xl shadow-gray-600/60 overflow-y-scroll"
    >
        {#if modal !== undefined}
            <div class="flex flex-col gap-4 p-4 grow w-full h-full">
                <button
                    class="ml-auto"
                    title="Cancel"
                    onclick={() => {
                        modal = undefined;
                    }}>cancel</button
                >
                {#if modal === "palette"}
                    <div
                        class="grid grid-cols-4 grid-rows-4 grid-flow-row w-full grow"
                    >
                        {#each palette as { hex, name }, pIdx}
                            <button
                                class="h-full w-full border-2"
                                style={`background: ${hex}`}
                                class:border-black={colors[activeColor] ===
                                    pIdx}
                                class:border-transparent={colors[
                                    activeColor
                                ] !== pIdx}
                                title={name}
                                onclick={() => {
                                    colors[activeColor] = pIdx;
                                    modal = undefined;
                                }}
                            ></button>
                        {/each}
                    </div>
                {:else}
                    <div class="grid grid-cols-4 grid-rows-8 w-full grow">
                        {#each symbolSet as { code, name }, sIdx}
                            <button
                                class="h-full w-full border-2 text-4xl flex justify-center"
                                class:border-black={symbol === sIdx}
                                class:border-gray-200={symbol !== sIdx}
                                title={name}
                                onclick={() => {
                                    symbol = sIdx;
                                    modal = undefined;
                                }}><Icon icon={code} /></button
                            >
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <div class="flex flex-col h-full w-full relative">
                <div
                    class="absolute flex justify-center items-center text-white w-full h-full"
                    style="font-size: 10rem"
                >
                    <Icon icon={symbolSet[symbol].code} />
                </div>
                {#each colors as pIdx}
                    <div
                        class="grow w-full"
                        style={`background: ${palette[pIdx].hex}`}
                    ></div>
                {/each}
            </div>
        {/if}
    </section>
</main>
