import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "./Feed.css";

const emojis = ["🎀", "🧸", "🌱", "🫂", "🫶🏻"];
const responses = ["been there", "feel you", "wait", "nah", "trust it", "sleep on it"];

const Feed = () => {
  const [portraits, setPortraits] = useState([]);
  const [gutQuestions, setGutQuestions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState({});
  const [selectedWord, setSelectedWord] = useState({});

  useEffect(() => {
    // Listen to portraits collection in Firestore, ordered by submission time desc
    const portraitsQuery = query(collection(db, "portraits"), orderBy("submittedAt", "desc"));
    const unsubscribePortraits = onSnapshot(portraitsQuery, (snapshot) => {
      const fetchedPortraits = snapshot.docs.map(doc => ({
        id: doc.id,
        imageUrl: doc.data().imageData,
        hashtag: doc.data().hashtag || ""
      }));
      setPortraits(fetchedPortraits);
    });

    // Listen to gutFeelings collection in Firestore, ordered by submission time desc
    const gutQuery = query(collection(db, "gutFeelings"), orderBy("submittedAt", "desc"));
    const unsubscribeGut = onSnapshot(gutQuery, (snapshot) => {
      const fetchedGutQuestions = snapshot.docs.map(doc => ({
        id: doc.id,
        question: doc.data().question,
        details: doc.data().details || ""
      }));
      setGutQuestions(fetchedGutQuestions);
    });

    return () => {
      unsubscribePortraits();
      unsubscribeGut();
    };
  }, []);

  const handleEmojiClick = (id, emoji) => {
    setSelectedEmoji(prev => ({ ...prev, [id]: emoji }));
  };

  const handleWordClick = (id, word) => {
    setSelectedWord(prev => ({ ...prev, [id]: word }));
  };

  // Create duplicated arrays for seamless infinite scroll
  // We duplicate the content so when animation reaches -50%, it looks continuous
  const duplicatedPortraits = [...portraits, ...portraits];
  const duplicatedGutQuestions = [...gutQuestions, ...gutQuestions];

  const pauseAnimation = (e) => {
    e.currentTarget.querySelector(".carousel-content").style.animationPlayState = "paused";
  };

  const resumeAnimation = (e) => {
    e.currentTarget.querySelector(".carousel-content").style.animationPlayState = "running";
  };

  return (
    <div className="feed-wrapper">
      <h2>🖼️ Portrait Hive</h2>
      <div
        className="carousel"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
      >
        <div className="carousel-content">
          {portraits.length > 0 ? (
            duplicatedPortraits.map((portrait, index) => (
              <div key={`${portrait.id}-${index}`} className="card">
                <img src={portrait.imageUrl} alt={portrait.hashtag || "Portrait"} />
                <div className="hashtag-container">
                  {portrait.hashtag && (
                    <p className="hashtag-text">#{portrait.hashtag}</p>
                  )}
                </div>
                <div className="emoji-row">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      className={`emoji-btn ${selectedEmoji[portrait.id] === emoji ? "selected" : ""}`}
                      onClick={() => handleEmojiClick(portrait.id, emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Loading portraits...</p>
          )}
        </div>
      </div>

      <h2>🧠 Gut Questions</h2>
      <div
        className="carousel"
        onMouseEnter={pauseAnimation}
        onMouseLeave={resumeAnimation}
      >
        <div className="carousel-content">
          {gutQuestions.length > 0 ? (
            duplicatedGutQuestions.map((q, index) => (
              <div key={`${q.id}-${index}`} className="card gut">
                <p>{q.question}</p>
                <div className="word-row">
                  {responses.map((word) => (
                    <button
                      key={word}
                      className={`word-btn ${selectedWord[q.id] === word ? "selected" : ""}`}
                      onClick={() => handleWordClick(q.id, word)}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Loading gut questions...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;