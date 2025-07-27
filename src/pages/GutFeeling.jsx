import React, { useState } from "react";
import Confetti from "../Confetti.jsx";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function GutFeelingChecker() {
  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const playYaySound = () => {
    const yaySound = new Audio("/sounds/yay.mp3");
    yaySound.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "gutFeelings"), {
        question: question.trim(),
        details: details.trim(),
        submittedAt: serverTimestamp(),
        reactions: {}
      });

      setQuestion("");
      setDetails("");
      setShowConfetti(true);
      setStatus("it’s okay to not know. you’re here. that’s enough✨");
      playYaySound();

    } catch (error) {
      console.error("Error saving gut feeling:", error);
      setStatus("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="gut-container"
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: 30,
        borderRadius: 12,
        backgroundColor: "#fdf8f0",
        boxShadow: "0 6px 15px rgba(139, 111, 71, 0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <label style={{ fontWeight: "600", color: "#A0845C", fontSize: "1.1rem" }}>
          what's on your mind?
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            placeholder="e.g. should I switch jobs or nah?"
            style={{
              width: "100%",
              marginTop: 8,
              padding: 12,
              borderRadius: 8,
              border: "1.5px solid #cbbfaa",
              backgroundColor: "#fff",
              fontSize: "1rem",
              resize: "vertical",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8B6F47")}
            onBlur={(e) => (e.target.style.borderColor = "#cbbfaa")}
            required
          />
        </label>

        <label style={{ fontWeight: "600", color: "#A0845C", fontSize: "1.1rem" }}>
          spill the tea
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            placeholder="tell us the deets, if you feel like it"
            style={{
              width: "100%",
              marginTop: 8,
              padding: 12,
              borderRadius: 8,
              border: "1.5px solid #cbbfaa",
              backgroundColor: "#fff",
              fontSize: "1rem",
              resize: "vertical",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#8B6F47")}
            onBlur={(e) => (e.target.style.borderColor = "#cbbfaa")}
          />
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#8B6F47",
            color: "white",
            padding: "14px 0",
            borderRadius: 10,
            cursor: "pointer",
            border: "none",
            fontWeight: "700",
            fontSize: "1.2rem",
            boxShadow: "0 5px 10px rgba(139, 111, 71, 0.3)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#9c7f50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#8B6F47")}
        >
          hit me with it!
        </button>
      </form>

      {status && (
        <p
          style={{
            marginTop: 20,
            fontStyle: "italic",
            color: status.startsWith("Oops") ? "red" : "green",
            textAlign: "center",
            fontSize: "1.1rem",
            minHeight: "1.5rem",
            userSelect: "none",
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}
