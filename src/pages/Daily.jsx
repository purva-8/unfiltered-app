import React, { useState } from "react";

const quotes = [
  "trust the timing of your life.",
  "you are not alone in this.",
  "when in doubt, pause, breathe, and trust your inner logic.",
  "any steps count as progress.",
  "you are enough.",
  "your feelings are valid.",
  "chaos can break you or make you — choose to rise",
  "self-care is the ultimate hack",
  "trust your gut — it’s the original algorithm for survival."
];

export default function Daily() {
  const [quote, setQuote] = useState("");
  const [rolling, setRolling] = useState(false);

  const getRandomQuote = () => {
    if (rolling) return;

    setRolling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
      setRolling(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <button
        onClick={getRandomQuote}
        className={rolling ? "dice-roll" : ""}
        style={{
          fontSize: "6rem",
          cursor: rolling ? "default" : "pointer",
          padding: 0,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "transparent",
          color: "#7A5F3F",
          userSelect: "none",
          marginBottom: "1.5rem",
          transition: "transform 0.2s ease",
        }}
        aria-label="Roll for your daily truth"
        disabled={rolling}
      >
        🎲
      </button>

      {quote && (
        <div
          style={{
            fontSize: "1.8rem",
            fontFamily: "'Shadows Into Light', cursive",
            color: "#4a4a4a",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            maxWidth: "600px",
            margin: "1rem auto 0",
            padding: 0,
            fontWeight: "600",
          }}
        >
          {quote}
        </div>
      )}

      <style>{`
        @keyframes diceRollAnimation {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50% { transform: rotate(180deg); }
          75% { transform: rotate(270deg); }
          100% { transform: rotate(360deg); }
        }
        .dice-roll {
          animation: diceRollAnimation 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
