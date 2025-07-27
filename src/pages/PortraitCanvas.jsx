import React, { useRef, useState, useEffect } from 'react';
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import Confetti from '../Confetti.jsx';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import './PortraitCanvas.css'; // you can keep styles here or move to index.css

const PortraitCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [hashtag, setHashtag] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
    saveSnapshot();
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = brushColor;
      ctxRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  const saveSnapshot = () => {
    const snapshot = canvasRef.current.toDataURL();
    setHistory((prev) => [...prev, snapshot]);
    setRedoStack([]);
  };

  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    saveSnapshot();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const img = new Image();
    img.src = last;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, 300, 300);
      ctxRef.current.drawImage(img, 0, 0);
    };
    setRedoStack((prev) => [...prev, canvasRef.current.toDataURL()]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const img = new Image();
    img.src = next;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, 300, 300);
      ctxRef.current.drawImage(img, 0, 0);
    };
    setHistory((prev) => [...prev, next]);
    setRedoStack((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, 300, 300);
    saveSnapshot();
    setShowThankYou(false);
    setShowConfetti(false);
  };

  const submitPortrait = async () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png");

    try {
      await addDoc(collection(db, "portraits"), {
        imageData,
        hashtag,
        submittedAt: serverTimestamp(),
        reactions: {}
      });

      setShowConfetti(true);
      setShowThankYou(true);
      setTimeout(() => setShowThankThankYou(false), 2500);
    } catch (error) {
      console.error("Error saving portrait:", error);
    }
  };

  return (
    <div className="portrait-container">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="undo-redo-row">
        <button onClick={undo}><FiRotateCcw size={24} /></button>
        <button onClick={redo}><FiRotateCw size={24} /></button>
      </div>

      <div className="polaroid-wrapper">
        <div className="polaroid">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />
          <input
            type="text"
            placeholder="# your vibe"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
          />
        </div>

        <div className="controls">
          <div className="row controls-row">
            <label>Brush Color:</label>
            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} />
            <label>Brush Size:</label>
            <input type="range" min="1" max="10" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
          </div>

          <div className="row buttons-row">
            <button onClick={clearCanvas}>Clear</button>
            <button onClick={submitPortrait}>Submit</button>
          </div>

          {showThankYou && (
            <p className="thank-you-gut-style">this goes into the collective chaos 🥰</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortraitCanvas;
