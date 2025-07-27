import React from "react";

export default function ReactionOverlay({ currentReaction, onReact, type }) {
  const PORTRAIT_EMOJIS = ["🫂", "💙", "✨", "🌱", "💫"];
  const GUT_TEXTS = ["trust it", "wait", "you got this", "been there", "it's valid"];

  const options = type === "portrait" ? PORTRAIT_EMOJIS : GUT_TEXTS;

  return (
    <div
      className="reaction-overlay-container" // Added this class
      style={{
        // Remove most of these inline styles and move them to .reaction-overlay-container in Feed.css
        // Keep only if they are truly dynamic or unique for some reason
        // position: "absolute", // Moved to CSS
        // bottom: 8, // Moved to CSS
        // left: "50%", // Moved to CSS
        // transform: "translateX(-50%)", // Moved to CSS
        // background: "rgba(0,0,0,0.6)", // Moved to CSS
        // borderRadius: 20, // Moved to CSS
        // padding: "4px 12px", // Moved to CSS
        // display: "flex", // Moved to CSS
        // gap: 12, // Moved to CSS
        // zIndex: 10, // Moved to CSS
        // userSelect: "none", // Moved to CSS
        // color: "white", // Moved to CSS
        // fontWeight: "600", // Moved to CSS
        // fontSize: 16, // Moved to CSS
      }}
    >
      {options.map((option) => (
        <span
          key={option}
          style={{
            cursor: "pointer",
            padding: "4px 10px",
            borderRadius: 12,
            background: currentReaction === option ? "var(--color-accent)" : "transparent", // Use CSS variable
            transition: "background-color 0.3s",
            userSelect: "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onReact(option);
          }}
          role="button"
          aria-label={`React with ${option}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onReact(option);
          }}
        >
          {option}
        </span>
      ))}
    </div>
  );
}