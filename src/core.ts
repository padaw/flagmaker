export const palette = [
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

export const symbolSet = [
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

export const patterns: Pattern[] = [
    {
        name: "2 Colors Horizontal",
        props: ["horizontal"],
        colorCount: 2,
    },
    {
        name: "3 Colors Horizontal",
        props: ["horizontal"],
        colorCount: 3,
    },
    {
        name: "2 Colors Vertical",
        props: ["vertical"],
        colorCount: 2,
    },
    {
        name: "3 Colors Vertical",
        props: ["vertical"],
        colorCount: 3,
    },
];

export type Pattern = {
    name: string;
    colorCount: number;
    props: string[];
};
