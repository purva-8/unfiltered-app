import React, { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReactionOverlay from "./ReactionOverlay";
import "./Feed.css"; // Ensure this is imported

const AUTO_SCROLL_SPEED = 0.5; // pixels per frame (~30px/sec at 60fps)

export default function Feed() {
  const [portraits, setPortraits] = useState([]);
  const [gutFeelings, setGutFeelings] = useState([]);
  const [userReactions, setUserReactions] = useState({}); // { itemId: reaction }

  const portraitsRef = useRef(null);
  const gutRef = useRef(null);
  const portraitsScrollId = useRef(null);
  const gutScrollId = useRef(null);

  const PORTRAIT_STATIC_EMOJIS = ["🫂", "💙", "✨", "🌱", "💫"];

  useEffect(() => {
    const q = query(collection(db, "portraits"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPortraits(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "gutFeelings"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGutFeelings(data);
    });
    return () => unsubscribe();
  }, []);

  const startAutoScroll = (ref, scrollIdRef) => {
    if (!ref.current) return;

    const container = ref.current;

    const step = () => {
      // Check if there's actual content overflow before attempting to scroll
      if (container.scrollWidth > container.clientWidth) {
        container.scrollLeft += AUTO_SCROLL_SPEED;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0; // Reset to start if end is reached
        }
      } else {
        // If content doesn't overflow, no need to scroll, cancel animation
        if (scrollIdRef.current) cancelAnimationFrame(scrollIdRef.current);
        scrollIdRef.current = null; // Clear the ID
        return; // Exit step function
      }
      scrollIdRef.current = requestAnimationFrame(step);
    };

    // Ensure previous animation frame is cancelled before starting a new one
    if (scrollIdRef.current) cancelAnimationFrame(scrollIdRef.current);
    scrollIdRef.current = requestAnimationFrame(step); // Start the animation
  };

  useEffect(() => {
    // Only start auto-scroll if there are items to scroll
    if (portraits.length > 0) {
      startAutoScroll(portraitsRef, portraitsScrollId);
    }
    if (gutFeelings.length > 0) {
      startAutoScroll(gutRef, gutScrollId);
    }

    return () => {
      if (portraitsScrollId.current) cancelAnimationFrame(portraitsScrollId.current);
      if (gutScrollId.current) cancelAnimationFrame(gutScrollId.current);
    };
  }, [portraits, gutFeelings]); // Re-run effect if data changes

  const handleReact = async (collectionName, itemId, reaction) => {
    setUserReactions((prev) => ({ ...prev, [itemId]: reaction }));

    try {
      const docRef = doc(db, collectionName, itemId);
      // Ensure the reaction is set for the specific user/item, assuming 'userReactions' field in Firebase
      // If you are storing reactions directly as a count or a map, adjust this:
      // For simplicity, this updates a field called `userReactions.[itemId]` with the reaction string.
      await updateDoc(docRef, {
        [`userReactions.${itemId}`]: reaction,
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  return (
    <div className="feed-container">
      <h3>Portraits</h3>
      <div
        ref={portraitsRef}
        className="scroll-row portrait-scroll-row"
        style={{
          // scrollBehavior, cursor, userSelect can go into Feed.css
          // borderBottom is specific to portraits section
          borderBottom: "1px solid #ccc",
          position: "relative",
          whiteSpace: "nowrap", // Crucial for horizontal layout
        }}
      >
        {portraits.map(({ id, imageData, hashtag }) => (
          <div
            key={id}
            className="feed-card portrait-card"
            style={{
              position: "relative", // Needed for absolute positioning of overlay and emojis
              paddingBottom: "40px", // Make space for the ReactionOverlay
              // minWidth and height are now in CSS, but can be overridden here if needed
            }}
          >
            {imageData ? (
              <img
                src={imageData}
                alt={hashtag || "portrait"}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
            ) : (
              <div className="image-placeholder"> {/* Add a class for styling */}
                No Image
              </div>
            )}

            {/* Displaying the static emojis for Portrait posts */}
            <div className="portrait-static-emojis">
              {PORTRAIT_STATIC_EMOJIS.map((emoji) => (
                <span key={emoji}>{emoji}</span>
              ))}
            </div>

            {/* ReactionOverlay needs to be positioned absolutely within the card */}
            <ReactionOverlay
              type="portrait"
              currentReaction={userReactions[id]}
              onReact={(reaction) => handleReact("portraits", id, reaction)}
            />
          </div>
        ))}
      </div>

      <h3>Gut Feelings</h3>
      <div
        ref={gutRef}
        className="scroll-row gut-feeling-scroll-row"
        style={{
          // scrollBehavior, cursor, userSelect can go into Feed.css
          position: "relative",
          whiteSpace: "nowrap", // Crucial for horizontal layout
        }}
      >
        {gutFeelings.map(({ id, question, details }) => (
          <div
            key={id}
            className="feed-card gut-feeling-card"
            style={{
              // padding is now in CSS
              position: "relative", // Needed for absolute positioning of overlay
              paddingBottom: "40px", // Make space for the ReactionOverlay
            }}
          >
            <div className="gut-feeling-question">
              {question || "No Question"}
            </div>
            <div className="gut-feeling-details">
              {details || "No details provided."}
            </div>

            {/* ReactionOverlay needs to be positioned absolutely within the card */}
            <ReactionOverlay
              type="gut"
              currentReaction={userReactions[id]}
              onReact={(reaction) => handleReact("gutFeelings", id, reaction)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}