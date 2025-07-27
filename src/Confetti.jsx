import React, { useEffect, useState } from 'react';

const ConfettiPiece = ({ x, y, color, rotation, scale, animationType, duration }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 6 + Math.random() * 8, // Random sizes for chaos
        height: 6 + Math.random() * 8,
        backgroundColor: color,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        pointerEvents: 'none',
        zIndex: 9999,
        borderRadius: Math.random() > 0.3 ? '50%' : Math.random() > 0.5 ? '0' : '20%', // More shape variety
        animation: `${animationType} ${duration}s ease-out forwards`,
      }}
    />
  );
};

const Confetti = ({ show, onComplete }) => {
  const [pieces, setPieces] = useState([]);
  
  const colors = [
    '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1',
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471'
  ];

  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }

    // Create CHAOTIC confetti pieces bursting everywhere!
    const newPieces = [];
    
    // Burst in multiple waves for maximum chaos
    for (let wave = 0; wave < 3; wave++) {
      setTimeout(() => {
        const wavePieces = [];
        for (let i = 0; i < 60; i++) {
          const chaos = Math.random();
          let animationType;
          
          // More animation variety for chaos
          if (chaos < 0.3) animationType = 'confetti-explode';
          else if (chaos < 0.6) animationType = 'confetti-spiral';
          else if (chaos < 0.8) animationType = 'confetti-bounce';
          else animationType = 'confetti-zigzag';
          
          const duration = 1.5 + Math.random() * 3; // Wild duration range
          
          wavePieces.push({
            id: `${wave}-${i}`,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 720, // More rotation chaos
            scale: 0.3 + Math.random() * 1.8, // Bigger size variety
            animationType,
            duration,
          });
        }
        
        setPieces(prev => [...prev, ...wavePieces]);
      }, wave * 200); // Stagger the waves
    }

    setPieces([]);

    // Clear confetti after all waves complete
    const timer = setTimeout(() => {
      setPieces([]);
      if (onComplete) onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [show]);

  if (!show || pieces.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes confetti-explode {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg) scale(0.5);
              opacity: 1;
            }
            15% {
              transform: translateX(${-200 + Math.random() * 400}px) translateY(${-150 - Math.random() * 100}px) rotate(${180 + Math.random() * 360}deg) scale(1.5);
              opacity: 1;
            }
            40% {
              transform: translateX(${-300 + Math.random() * 600}px) translateY(${-50 + Math.random() * 100}px) rotate(${360 + Math.random() * 720}deg) scale(1.2);
              opacity: 0.9;
            }
            100% {
              transform: translateX(${-400 + Math.random() * 800}px) translateY(${window.innerHeight + 100}px) rotate(${720 + Math.random() * 1080}deg) scale(0.1);
              opacity: 0;
            }
          }
          
          @keyframes confetti-spiral {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg) scale(1);
              opacity: 1;
            }
            25% {
              transform: translateX(${100 * Math.cos(Math.random() * Math.PI * 2)}px) translateY(${100 * Math.sin(Math.random() * Math.PI * 2)}px) rotate(${Math.random() * 360}deg) scale(1.3);
              opacity: 1;
            }
            50% {
              transform: translateX(${200 * Math.cos(Math.random() * Math.PI * 4)}px) translateY(${200 * Math.sin(Math.random() * Math.PI * 4)}px) rotate(${Math.random() * 720}deg) scale(0.8);
              opacity: 0.8;
            }
            75% {
              transform: translateX(${150 * Math.cos(Math.random() * Math.PI * 6)}px) translateY(${300 + Math.random() * 200}px) rotate(${Math.random() * 1080}deg) scale(0.6);
              opacity: 0.5;
            }
            100% {
              transform: translateX(${100 * Math.cos(Math.random() * Math.PI * 8)}px) translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 1440}deg) scale(0.2);
              opacity: 0;
            }
          }
          
          @keyframes confetti-bounce {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg) scale(1);
              opacity: 1;
            }
            20% {
              transform: translateX(${-100 + Math.random() * 200}px) translateY(${-200 - Math.random() * 100}px) rotate(${Math.random() * 180}deg) scale(1.4);
              opacity: 1;
            }
            40% {
              transform: translateX(${-50 + Math.random() * 100}px) translateY(${100 + Math.random() * 50}px) rotate(${Math.random() * 360}deg) scale(0.9);
              opacity: 1;
            }
            60% {
              transform: translateX(${-150 + Math.random() * 300}px) translateY(${-50 - Math.random() * 50}px) rotate(${Math.random() * 540}deg) scale(1.1);
              opacity: 0.8;
            }
            80% {
              transform: translateX(${-75 + Math.random() * 150}px) translateY(${200 + Math.random() * 100}px) rotate(${Math.random() * 720}deg) scale(0.7);
              opacity: 0.5;
            }
            100% {
              transform: translateX(${-200 + Math.random() * 400}px) translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 900}deg) scale(0.3);
              opacity: 0;
            }
          }
          
          @keyframes confetti-zigzag {
            0% {
              transform: translateX(0) translateY(0) rotate(0deg) scale(1);
              opacity: 1;
            }
            12.5% {
              transform: translateX(${80 + Math.random() * 40}px) translateY(${Math.random() * 50}px) rotate(${45 + Math.random() * 45}deg) scale(1.2);
              opacity: 1;
            }
            25% {
              transform: translateX(${-80 - Math.random() * 40}px) translateY(${50 + Math.random() * 50}px) rotate(${135 + Math.random() * 45}deg) scale(1.1);
              opacity: 1;
            }
            37.5% {
              transform: translateX(${120 + Math.random() * 60}px) translateY(${100 + Math.random() * 50}px) rotate(${225 + Math.random() * 45}deg) scale(0.9);
              opacity: 0.9;
            }
            50% {
              transform: translateX(${-120 - Math.random() * 60}px) translateY(${150 + Math.random() * 50}px) rotate(${315 + Math.random() * 45}deg) scale(1.0);
              opacity: 0.8;
            }
            62.5% {
              transform: translateX(${100 + Math.random() * 50}px) translateY(${200 + Math.random() * 50}px) rotate(${405 + Math.random() * 45}deg) scale(0.8);
              opacity: 0.6;
            }
            75% {
              transform: translateX(${-100 - Math.random() * 50}px) translateY(${250 + Math.random() * 50}px) rotate(${495 + Math.random() * 45}deg) scale(0.7);
              opacity: 0.4;
            }
            87.5% {
              transform: translateX(${80 + Math.random() * 40}px) translateY(${300 + Math.random() * 50}px) rotate(${585 + Math.random() * 45}deg) scale(0.5);
              opacity: 0.2;
            }
            100% {
              transform: translateX(${-150 + Math.random() * 300}px) translateY(${window.innerHeight + 50}px) rotate(${675 + Math.random() * 45}deg) scale(0.2);
              opacity: 0;
            }
          }
        `}
      </style>
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </>
  );
};

export default Confetti;