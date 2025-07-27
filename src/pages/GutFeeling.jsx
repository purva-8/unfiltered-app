import React, { useState } from "react";
import Confetti from "../Confetti.jsx";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function GutFeelingChecker() {
  const [question, setQuestion] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

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
    } catch (error) {
      console.error("Error saving gut feeling:", error);
    }
  };

  return (
    <div
      className="gut-container"
      style={{
        maxWidth: 1000,
        margin: "2rem auto",
        padding: 40,
        border: "1px solid #8B6F47",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <h2 style={{ textAlign: "center", color: "#8B6F47", marginBottom: "1.25rem" }}>
        gut feeling
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: 12, fontWeight: "600", color: "#A0845C" }}>
          what's on your mind?
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="e.g. should I switch jobs or nah?"
            style={{ width: "100%", marginTop: 4, padding: 8 }}
          />
        </label>
        <label style={{ marginBottom: 16, fontWeight: "600", color: "#A0845C" }}>
          spill the tea
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="tell us the deets, if you feel like it"
            style={{ width: "100%", marginTop: 4, padding: 8 }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#8B6F47",
            color: "white",
            padding: "10px 15px",
            borderRadius: 6,
            cursor: "pointer",
            border: "none",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          hit me with it!
        </button>
      </form>
      {status && (
        <p style={{ marginTop: 16, fontStyle: "italic", color: "green", textAlign: "center" }}>
          {status}
        </p>
      )}
    </div>
  );
}
