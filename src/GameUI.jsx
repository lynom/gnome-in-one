import { useState } from "react";

const BLOCKS = [
    { id: "ramp", label: "ramp", icon: "R", color: "#ffffff" }
];

export default function GameUI() {
    const [phase, setPhase] = useState("placing");
    const [selected, setSelected] = useState(null);
    const [placed, setPlaced] = useState([]);

    // placing objects
    const handleCanvasClick = (e) => {
        // placeholder for object logic
        if (phase !== "placing" || !selected) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const block = BLOCKS.find(b => b.id === selected);
        setPlaced(p => [...p, { ...block, x, y, uid: Math.random() }]);
    };

    return (
        <div style={css.root}>
            {/* Block panel */}
            <div style={css.leftPanel}>
                <h3 style={css.leftPanelTitle}>Blocks</h3>
                {BLOCKS.map(block => (
                    <button
                        key={block.id}
                        onClick={() => setSelected(block.id)}
                        style={{
                            ...css.leftPanelButton,
                            backgroundColor: selected === block.id ? "#444" : "#222"
                        }}
                    >
                        {block.label}
                    </button>
                ))}
            </div>

            {/* playfield and play button*/}
            <main style={css.main}>
                {/*playfield*/}
                <div style={{ ...css.canvas, cursor: selected && phase === "placing" ? "crosshair" : "default", }}
                    onClick={handleCanvasClick}>
                </div>

                {/*buttons*/}
                <div style={css.buttonPanel}>
                    Run
                </div>

            </main>
        </div>
    );
}

// styles (may move this to another file)

const css = {
    root: {
        display: "flex",
        height: "auto",
        background: "#000000",
        fontFamily: "'Calibri', system-ui, sans-serif",
        color: "#ffffff",
        padding: "8px",
        gap: "8px"
    },

    // blocks panel  
    leftPanel: {
        width: "200px",
        height: "600px",
        background: "#111",
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid #333"
    },

    leftPanelTitle: {
        margin: "0 0 16px 0",
        fontSize: "16px",
        fontWeight: "bold"
    },

    leftPanelButton: {
        width: "100%",
        padding: "12px",
        marginBottom: "8px",
        background: "#222",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.2s"
    },

    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    canvas: {
        flex: 1,
        width: "800px",
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "8px"
    },

    // play button
    buttonPanel: {
        padding: "12px",
        background: "#111",
        borderRadius: "8px",
        border: "1px solid #333",
        textAlign: "center"
    }
}

