import { useEffect, useState, useRef } from "react";

const fonts = [
 "'Permanent Marker', cursive",
 "'Shadows Into Light', cursive",
 "'Indie Flower', cursive",
 "'Rubik', sans-serif",
 "'Titan One', cursive",
 "'Monoton', cursive",
];

const colors = [
 "#A8D0E6",
 "#F4A6B9",
 "#B5EAD7",
 "#FFF5BA",
 "#F0E3CA",
 "#FF6F61",
];

// Custom draggable component
function DraggableText({ children, initialPosition, onDrag, onClick, isSelected }) {
 const [isDragging, setIsDragging] = useState(false);
 const [position, setPosition] = useState(initialPosition);
 const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
 const elementRef = useRef();

 useEffect(() => {
   setPosition(initialPosition);
 }, [initialPosition.x, initialPosition.y]);

 const handleMouseDown = (e) => {
   setIsDragging(true);
   setDragStart({
     x: e.clientX - position.x,
     y: e.clientY - position.y
   });
   e.preventDefault();
   e.stopPropagation();
 };

 useEffect(() => {
   if (!isDragging) return;

   const handleMouseMove = (e) => {
     e.preventDefault();
     const newPosition = {
       x: e.clientX - dragStart.x,
       y: e.clientY - dragStart.y
     };
     setPosition(newPosition);
   };

   const handleMouseUp = (e) => {
     e.preventDefault();
     setIsDragging(false);
     onDrag(position);
   };

   document.addEventListener('mousemove', handleMouseMove, { passive: false });
   document.addEventListener('mouseup', handleMouseUp, { passive: false });

   return () => {
     document.removeEventListener('mousemove', handleMouseMove);
     document.removeEventListener('mouseup', handleMouseUp);
   };
 }, [isDragging, dragStart, position, onDrag]);

 return (
   <div
     ref={elementRef}
     style={{
       position: 'absolute',
       left: position.x,
       top: position.y,
       cursor: isDragging ? 'grabbing' : 'grab',
       userSelect: 'none',
       padding: isSelected ? "2px 6px" : 0,
       border: isSelected ? "1px dashed #666" : "none",
       zIndex: isSelected ? 15 : 5,
       pointerEvents: 'auto',
     }}
     onMouseDown={handleMouseDown}
     onClick={onClick}
   >
     {children}
   </div>
 );
}

export default function GraffitiWall() {
 const [texts, setTexts] = useState([]);
 const [inputPos, setInputPos] = useState(null);
 const [inputText, setInputText] = useState("");
 const [selectedId, setSelectedId] = useState(null);
 const [selectedFont, setSelectedFont] = useState(fonts[0]);
 const [selectedColor, setSelectedColor] = useState(colors[0]);

 const textareaRef = useRef();

 // Focus textarea when shown
 useEffect(() => {
   if (inputPos && textareaRef.current) {
     textareaRef.current.focus();
   }
 }, [inputPos]);

 // Background pan effect
 const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
 useEffect(() => {
   function handleMouseMove(e) {
     const x = (e.clientX / window.innerWidth - 0.5) * 20;
     const y = (e.clientY / window.innerHeight - 0.5) * 20;
     setBgOffset({ x, y });
   }
   window.addEventListener("mousemove", handleMouseMove);
   return () => window.removeEventListener("mousemove", handleMouseMove);
 }, []);

 function finishTyping() {
   if (!inputText.trim()) {
     setInputPos(null);
     return;
   }
   const newText = {
     id: Date.now(),
     text: inputText,
     x: inputPos.x,
     y: inputPos.y,
     font: selectedFont,
     color: selectedColor,
   };
   setTexts([...texts, newText]);
   setInputPos(null);
   setInputText("");
 }

 function handleKeyDown(e) {
   if (e.key === "Enter" && !e.shiftKey) {
     e.preventDefault();
     finishTyping();
   }
 }

 function handleTextClick(e, id) {
   e.stopPropagation();
   const clickedText = texts.find((t) => t.id === id);
   setSelectedId(id);
   setSelectedFont(clickedText.font);
   setSelectedColor(clickedText.color);
   setInputPos(null);
 }

 function handleTextDrag(id, newPosition) {
   setTexts((prev) =>
     prev.map((t) =>
       t.id === id ? { ...t, x: newPosition.x, y: newPosition.y } : t
     )
   );
 }

 // Update selected text style live
 useEffect(() => {
   if (selectedId) {
     setTexts((prev) =>
       prev.map((t) =>
         t.id === selectedId
           ? { ...t, font: selectedFont, color: selectedColor }
           : t
       )
     );
   }
 }, [selectedFont, selectedColor, selectedId]);

 // Handle back button click
 function handleBackClick() {
   // Navigate to home page - you can replace this with your routing logic
   window.location.href = '/'; // or use your router's navigation method
 }

 return (
   <div
     style={{
       width: "100vw",
       height: "100vh",
       position: "fixed",
       top: 0,
       left: 0,
       overflow: "hidden",
       cursor: "text",
     }}
     onClick={(e) => {
       setSelectedId(null);
       const rect = e.currentTarget.getBoundingClientRect();
       setInputPos({ x: e.clientX, y: e.clientY });
     }}
   >
     {/* Infinite panning white background */}
     <div
       style={{
         position: "fixed",
         top: bgOffset.y - 50,
         left: bgOffset.x - 50,
         width: "calc(100vw + 100px)",
         height: "calc(100vh + 100px)",
         backgroundColor: "white",
         pointerEvents: "none",
         transition: "top 0.1s ease, left 0.1s ease",
         zIndex: -1,
       }}
     />

     {/* Back Button */}
     <div
       style={{
         position: "fixed",
         top: 20,
         left: 20,
         width: 48,
         height: 48,
         backgroundColor: "#f7f7f7",
         borderRadius: "50%",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         cursor: "pointer",
         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
         border: "1px solid #ddd",
         zIndex: 30,
         transition: "all 0.2s ease",
       }}
       onClick={(e) => {
         e.stopPropagation();
         handleBackClick();
       }}
       onMouseEnter={(e) => {
         e.target.style.backgroundColor = "#e8e8e8";
         e.target.style.transform = "scale(1.05)";
       }}
       onMouseLeave={(e) => {
         e.target.style.backgroundColor = "#f7f7f7";
         e.target.style.transform = "scale(1)";
       }}
     >
       {/* Left Arrow Icon */}
       <svg 
         width="20" 
         height="20" 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="#333"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
       >
         <path d="M19 12H5"/>
         <path d="M12 19l-7-7 7-7"/>
       </svg>
     </div>

     {/* Render texts with custom draggable */}
     {texts.map(({ id, text, x, y, font, color }) => (
       <DraggableText
         key={id}
         initialPosition={{ x, y }}
         onDrag={(newPos) => handleTextDrag(id, newPos)}
         onClick={(e) => handleTextClick(e, id)}
         isSelected={selectedId === id}
       >
         <div
           style={{
             fontFamily: font,
             fontSize: 24,
             color: color,
             whiteSpace: "pre-wrap",
           }}
         >
           {text}
         </div>
       </DraggableText>
     ))}

     {/* Textarea input */}
     {inputPos && (
       <textarea
         ref={textareaRef}
         style={{
           position: "absolute",
           left: inputPos.x,
           top: inputPos.y,
           fontFamily: selectedFont,
           fontSize: 24,
           color: selectedColor,
           background: "transparent",
           border: "none",
           outline: "none",
           resize: "none",
           minWidth: 100,
           maxWidth: 200,
           maxHeight: 100,
           overflow: "hidden",
           padding: 0,
           margin: 0,
           zIndex: 10,
           whiteSpace: "pre-wrap",
         }}
         value={inputText}
         onChange={(e) => setInputText(e.target.value)}
         onBlur={finishTyping}
         onKeyDown={handleKeyDown}
         placeholder="Type here..."
         rows={1}
         autoFocus
       />
     )}

     {/* Bottom Nav Bar */}
     <div
       style={{
         position: "fixed",
         bottom: 0,
         left: 10,
         right: 10,
         background: "#f7f7f7",
         borderTop: "1px solid #ccc",
         display: "flex",
         justifyContent: "space-between",
         padding: "8px 12px",
         overflowX: "auto",
         gap: 16,
         userSelect: "none",
         zIndex: 20,
         borderRadius: "10px 10px 0 0",
       }}
       onClick={(e) => e.stopPropagation()}
     >
       {/* Fonts */}
       <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
         {fonts.map((f) => (
           <div
             key={f}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               setSelectedFont(f);
             }}
             style={{
               fontFamily: f,
               fontSize: 24,
               lineHeight: 1,
               padding: "6px 10px",
               cursor: "pointer",
               opacity: selectedFont === f ? 1 : 0.5,
               whiteSpace: "nowrap",
               userSelect: "none",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               height: 36,
               minWidth: 40,
               borderRadius: "4px",
               backgroundColor: selectedFont === f ? "rgba(0,0,0,0.1)" : "transparent",
               transition: "all 0.2s ease",
             }}
           >
             Aa
           </div>
         ))}
       </div>

       {/* Colors */}
       <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
         {colors.map((c) => (
           <div
             key={c}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               setSelectedColor(c);
             }}
             style={{
               width: 20,
               height: 20,
               borderRadius: "50%",
               backgroundColor: c,
               cursor: "pointer",
               border: selectedColor === c ? "3px solid #333" : "1px solid #ccc",
             }}
           />
         ))}
       </div>
     </div>
   </div>
 );
}