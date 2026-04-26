import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart, Eye, Hand } from 'lucide-react';

/* Low-poly geometric face mesh dots matching Reference 2 */
const faceMeshPoints = [
  { x: 50, y: 15 }, // 0: Forehead center
  { x: 25, y: 22 }, // 1: Forehead left
  { x: 75, y: 22 }, // 2: Forehead right
  { x: 15, y: 40 }, // 3: Temple left
  { x: 85, y: 40 }, // 4: Temple right
  { x: 32, y: 42 }, // 5: Eye left outer
  { x: 45, y: 45 }, // 6: Eye left inner
  { x: 55, y: 45 }, // 7: Eye right inner
  { x: 68, y: 42 }, // 8: Eye right outer
  { x: 50, y: 55 }, // 9: Nose tip
  { x: 22, y: 60 }, // 10: Cheek left
  { x: 78, y: 60 }, // 11: Cheek right
  { x: 38, y: 72 }, // 12: Mouth left
  { x: 62, y: 72 }, // 13: Mouth right
  { x: 50, y: 76 }, // 14: Mouth center bottom
  { x: 28, y: 85 }, // 15: Jaw left
  { x: 72, y: 85 }, // 16: Jaw right
  { x: 50, y: 92 }, // 17: Chin
];

const meshConnections = [
  // Outer perimeter
  [1, 0], [0, 2], [1, 3], [2, 4], [3, 10], [4, 11], [10, 15], [11, 16], [15, 17], [16, 17],
  // Inner web - Top
  [1, 5], [0, 6], [0, 7], [2, 8], [3, 5], [4, 8], [5, 6], [7, 8],
  // Inner web - Mid
  [6, 9], [7, 9], [5, 10], [8, 11], [9, 10], [9, 11],
  // Inner web - Bottom
  [9, 12], [9, 13], [10, 12], [11, 13], [12, 14], [13, 14], [12, 15], [13, 16], [14, 17]
];

export default function LiveVideoStep({ onNext, onBack }) {
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState('prompt');
  const [bpm, setBpm] = useState(72);

  // Fluctuate BPM slightly for realism during analysis
  useEffect(() => {
    if (phase === 'analyzing' || phase === 'done') {
      const interval = setInterval(() => {
        setBpm(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Wait for user to click the start button so they can read instructions
  // Removed auto-start timeout

  useEffect(() => {
    if (phase === 'counting') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('analyzing');
      }
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === 'analyzing') {
      const timer = setTimeout(() => setPhase('done'), 4000); // Scan for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Header overlay */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '10px 8px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            position: 'absolute',
            left: 8,
          }}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Main Camera Area - Takes full remaining space */}
      <div style={{
        flex: 1,
        width: '100%',
        background: 'transparent', // Match app background seamlessly
        position: 'absolute',
        inset: 0,
        borderRadius: '36px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Plain design for prompt phase */}
        {phase === 'prompt' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 40px',
              textAlign: 'center',
              zIndex: 3,
            }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--cyan-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              <Eye size={36} color="var(--cyan)" />
            </div>
            
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
              Liveness Detection
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>
              Please ensure you are in a well-lit area.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Look directly at the camera and avoid wearing hats or sunglasses.
            </p>
          </motion.div>
        )}
        {/* Realistic Face Feed Placeholder - Show only when done */}
        {(phase === 'analyzing' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("/man_white_bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center', // Center perfectly
              zIndex: 1,
            }} 
          />
        )}

        {/* Face Mesh Overlay - Anchored to center of face */}
        {(phase === 'analyzing' || phase === 'done') && (
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 360,
          aspectRatio: '0.85', // Taller than wide to match face shape
          zIndex: 5,
        }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            {meshConnections.map(([a, b], i) => (
              <motion.line
                key={`line-${i}`}
                x1={faceMeshPoints[a]?.x}
                y1={faceMeshPoints[a]?.y}
                x2={faceMeshPoints[b]?.x}
                y2={faceMeshPoints[b]?.y}
                stroke="#ffffff"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.6, 1, 0.6] }}
                transition={{ 
                  pathLength: { duration: 1, ease: 'easeInOut' },
                  opacity: { duration: 2, repeat: Infinity, delay: 1 } 
                }}
              />
            ))}
            {faceMeshPoints.map((point, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={point.x}
                cy={point.y}
                r="1.8"
                fill="#ffffff"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{ 
                  opacity: { duration: 0.5, delay: i * 0.05 },
                  scale: { duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.05 } 
                }}
                style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))' }}
              />
            ))}
          </svg>
        </div>
        )}

        {/* rPPG Heartbeat Extraction Overlay */}
        {(phase === 'analyzing' || phase === 'done') && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
              width: 140,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Heart size={12} color="var(--red)" />
              <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>rPPG Analysis</span>
            </div>
            
            {/* Animated ECG Line */}
            <div style={{ width: '100%', height: 24, position: 'relative', overflow: 'hidden', marginBottom: 4 }}>
              <svg viewBox="0 0 100 24" style={{ width: '100%', height: '100%', stroke: 'var(--green)', strokeWidth: 1.5, fill: 'none' }}>
                <motion.path
                  d="M0,12 L20,12 L25,4 L35,20 L40,12 L70,12 L75,6 L85,18 L90,12 L100,12"
                  initial={{ x: 100 }}
                  animate={{ x: -100 }}
                  transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
                />
                <motion.path
                  d="M0,12 L20,12 L25,4 L35,20 L40,12 L70,12 L75,6 L85,18 L90,12 L100,12"
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  transition={{ ease: "linear", duration: 1.5, repeat: Infinity }}
                />
              </svg>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Pulse</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <motion.span 
                  animate={{ opacity: [1, 0.7, 1] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="mono" 
                  style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}
                >
                  {bpm}
                </motion.span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>BPM</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button Container */}
        <div style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 20px',
          zIndex: 20,
        }}>
          {/* Styled Bottom Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              padding: '16px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--cyan-dim)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={
              phase === 'prompt' ? () => setPhase('counting') : 
              phase === 'done' ? onNext : undefined
            }
          >
             <Hand size={18} color="var(--cyan)" />
             <span>
                {phase === 'prompt' ? 'Start Liveness Test' : 
                 phase === 'counting' ? `Scanning... ${countdown}` : 
                 phase === 'analyzing' ? 'Mapping Face...' :
                 'Complete - Proceed'}
             </span>
          </motion.button>
        </div>

        {/* Dim Overlay when counting */}
        {phase === 'counting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--bg-card)', // Use card background instead of dark overlay to keep it clean
              zIndex: 4, 
            }}
          />
        )}

        {/* Elegant Countdown - Top placement */}
        {phase === 'counting' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, x: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%" }}
            style={{
              position: 'absolute',
              top: '30%', // Center vertically on the blank screen since there's no face to obscure
              left: '50%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.span
              key={countdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ 
                fontSize: '6rem', 
                fontWeight: 800, 
                color: 'var(--cyan)',
                textShadow: '0 0 40px rgba(0, 242, 254, 0.4)'
              }}
            >
              {countdown}
            </motion.span>
          </motion.div>
        )}

      </div>
    </div>
  );
}
