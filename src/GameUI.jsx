import { useState, useRef, useEffect } from "react";
import { Engine } from "./game/Engine";

// filler for future blocks
const BLOCKS = [
    { id: "ramp", label: "ramp", color: "#ffffff" }
];

export default function GameUI() {
    const [selected, setSelected] = useState(null);
    const canvasRef = useRef(null);
    const engineRef = useRef(null);

    // engine
    useEffect(() => {
        if (!canvasRef.current) return;

        const gameEngine = new Engine(canvasRef.current, 800, 400);
        engineRef.current = gameEngine;

        // creates ball
        gameEngine.addBall(400, 200, 8, 5, -5);

        return () => {
            gameEngine.stop();
        };
    }, []);

    // run button
    const handleRun = () => {
        if (engineRef.current) {
            engineRef.current.stop();
            engineRef.current.resetBall(400, 200);
            engineRef.current.start();
        }
    };

    return (
        <div style={css.root}>

            {/* block panel */}
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

                <canvas ref={canvasRef} width={800} height={400} style={css.playfield} />

                <button style={css.runButton} onClick={handleRun}>
                    Run
                </button>
            </main>
        </div>
    );
}

// styles (might move this to another file)

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
        width: "100px",
        height: "flex",
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
        borderRadius: "8px",
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

    playfield: {
        height: "400px",
        width: "800px",
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "8px"
    },

    runButton: {
        padding: "12px 24px",
        background: "#222",
        color: "#fff",
        border: "1px solid #444",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.2s"
    }
}

