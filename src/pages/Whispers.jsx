import React, { useState } from "react";

const mockStories = [
  { id: 1, text: "Today I felt hopeful after a long time. Small wins matter." },
  { id: 2, text: "Sometimes sharing a whisper feels like a weight lifted off my chest." },
  { id: 3, text: "I appreciate this safe space where no one judges. Thank you!" },
];

export default function Whispers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");

  const maxChars = 300;

  const prevStory = () => {
    setCurrentIndex((i) => (i === 0 ? mockStories.length - 1 : i - 1));
  };

  const nextStory = () => {
    setCurrentIndex((i) => (i === mockStories.length - 1 ? 0 : i + 1));
  };

  const toggleInput = () => {
    setShowInput((v) => !v);
    setInputText("");
  };

  const handleSubmit = () => {
    if (inputText.trim() === "") {
      alert("Please write something before submitting.");
      return;
    }
    alert("Thank you for sharing your whisper!");
    setInputText("");
    setShowInput(false);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: 30,
        borderRadius: 12,
        backgroundColor: "#fdf8f0",
        boxShadow: "0 6px 15px rgba(139, 111, 71, 0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: "relative",
      }}
    >
      {/* Mock disclaimer */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 12,
          fontWeight: "600",
          color: "#b8b8b8",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          opacity: 0.5,
          letterSpacing: 1,
        }}
      >
        MOCK ONLY — input not saved
      </div>

      {/* Write/Close icon button top-right */}
      <button
        onClick={toggleInput}
        aria-label={showInput ? "Close write form" : "Write a whisper"}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f6f1e7",
          cursor: "pointer",
          fontSize: 24,
          color: "#8B6F47",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
          transition: "background-color 0.3s, color 0.3s",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#5e4b26";
          e.currentTarget.style.backgroundColor = "#e5dbbf";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#8B6F47";
          e.currentTarget.style.backgroundColor = "#f6f1e7";
        }}
      >
        {showInput ? "✖️" : "✍️"}
      </button>

      {/* Input form toggle */}
      {showInput && (
        <div
          style={{
            marginBottom: 24,
            padding: 20,
            border: "1.5px solid #cbbfaa",
            borderRadius: 12,
            backgroundColor: "#fff",
            boxShadow: "inset 0 2px 6px rgba(139, 111, 71, 0.15)",
          }}
        >
          <textarea
            rows={5}
            maxLength={maxChars}
            placeholder="Share your whisper (max 300 characters)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1.5px solid #cbbfaa",
              padding: 16,
              fontSize: 16,
              resize: "vertical",
              fontFamily: "inherit",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8B6F47")}
            onBlur={(e) => (e.target.style.borderColor = "#cbbfaa")}
          />
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <small style={{ color: "#a0845c" }}>
              {inputText.length} / {maxChars}
            </small>
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#8B6F47",
                color: "white",
                padding: "12px 28px",
                borderRadius: 12,
                cursor: "pointer",
                border: "none",
                fontWeight: "700",
                fontSize: 16,
                boxShadow: "0 4px 12px rgba(139, 111, 71, 0.3)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6f5833")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B6F47")}
            >
              share whisper
            </button>
          </div>
        </div>
      )}

      {/* Story box */}
      <div
        style={{
          minHeight: 140,
          padding: 30,
          border: "1.5px solid #cbbfaa",
          borderRadius: 12,
          backgroundColor: "#fff",
          fontSize: 18,
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          userSelect: "none",
          boxShadow: "0 2px 8px rgba(139, 111, 71, 0.15)",
          color: "#5e4b26",
          fontWeight: "600",
        }}
      >
        "{mockStories[currentIndex].text}"
      </div>

      {/* Navigation buttons */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={prevStory}
          aria-label="Previous story"
          style={{
            backgroundColor: "#f6f1e7",
            border: "1.5px solid #cbbfaa",
            padding: "12px 24px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "600",
            color: "#5e4b26",
            boxShadow: "0 3px 8px rgba(139, 111, 71, 0.15)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5dbbf")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f6f1e7")}
        >
          ‹ Previous
        </button>
        <button
          onClick={nextStory}
          aria-label="Next story"
          style={{
            backgroundColor: "#f6f1e7",
            border: "1.5px solid #cbbfaa",
            padding: "12px 24px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "600",
            color: "#5e4b26",
            boxShadow: "0 3px 8px rgba(139, 111, 71, 0.15)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5dbbf")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f6f1e7")}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
