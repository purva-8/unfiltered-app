import React, { useEffect, useState } from "react";

export default function Echo() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100); // trigger fade-in
    return () => clearTimeout(timer);
  }, []);

  const hashtags = ["#self", "#reflective", "#career", "#doubt", "#hopeful", "#creativity"];
  const reactions = [
    { emoji: "🤝", count: 4 },
    { emoji: "💜", count: 7 },
    { emoji: "🌱", count: 3 },
  ];

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "20px",
        background: "#fff9f4",
        boxShadow: "0 8px 20px rgba(139, 111, 71, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#8B6F47",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        ✨ your feels, summed up ✨
      </h1>

      {/* Cards Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {[
          { title: "🎨 portraits drawn", count: 2, tags: "#self #reflective" },
          { title: "🧠 gut questions", count: 3, tags: "#career #doubt" },
          { title: "📝 whispers shared", count: 1, tags: "#hopeful" },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "#fefcf9",
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: "0 4px 10px rgba(139, 111, 71, 0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ color: "#A0845C", marginBottom: "0.5rem", fontSize: "1.3rem" }}>
              {card.title}
            </h2>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{card.count}</p>
            <p style={{ marginTop: "0.5rem", color: "#777" }}>{card.tags}</p>
          </div>
        ))}
      </div>

      {/* Reactions */}
      <div
        style={{
          background: "#fefcf9",
          padding: "1.5rem",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(139, 111, 71, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ color: "#A0845C", marginBottom: "1rem" }}>💬 Reactions Received</h2>
        <div style={{ display: "flex", gap: "2rem", fontSize: "2rem" }}>
          {reactions.map((r, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <span>{r.emoji}</span>
              <div style={{ fontSize: "1rem", color: "#555" }}>{r.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
        }}
      >
        {hashtags.map((tag, i) => (
          <span
            key={i}
            style={{
              background: "#FFDAB9",
              color: "#5a422c",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Echo AI Summary */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(139, 111, 71, 0.1)",
          position: "relative",
          fontSize: "1.2rem",
          lineHeight: "1.6rem",
          color: "#444",
          fontStyle: "italic",
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          “you’ve been wrestling with big questions lately and leaning into self-reflection — that’s brave. <br /><br />
          also, that portrait? bold choice, i see you channeling a chaotic picasso energy. <br /><br />
          maybe take a walk, doodle again tonight, and know it’s okay to not have answers yet — you’re moving, and that counts.”
        </p>
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            right: "16px",
            fontSize: "0.8rem",
            color: "#999",
          }}
        >
          AI Echo — mock reflection only
        </span>
      </div>
    </div>
  );
}
