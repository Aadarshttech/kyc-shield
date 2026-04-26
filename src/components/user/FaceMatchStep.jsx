import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ScanFace, CheckCircle2, Loader2 } from 'lucide-react';

export default function FaceMatchStep({ onNext, onBack }) {
  const [phase, setPhase] = useState('scanning'); // scanning → comparing → result
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  // Phase transitions
  useEffect(() => {
    const timers = [];

    // Phase 1: Scanning (2s)
    timers.push(setTimeout(() => setPhase('comparing'), 2000));

    // Phase 2: Comparing progress bar (2s → 4s)
    timers.push(setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 4;
        });
      }, 80);
      timers.push(interval);
    }, 2000));

    // Phase 3: Result (4.5s)
    timers.push(setTimeout(() => setPhase('result'), 4500));

    // Score counter animation (4.5s → 6s)
    timers.push(setTimeout(() => {
      let current = 0;
      const target = 94.7;
      const interval = setInterval(() => {
        current += 2.8;
        if (current >= target) {
          setScore(target);
          clearInterval(interval);
        } else {
          setScore(parseFloat(current.toFixed(1)));
        }
      }, 40);
      timers.push(interval);
    }, 4500));

    // Auto-proceed (7s)
    timers.push(setTimeout(() => onNext(), 7000));

    return () => timers.forEach(t => clearTimeout(t));
  }, [onNext]);

  const inputStyle = {
    width: 120,
    height: 150,
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 12px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: '50%',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)',
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Face Match</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            1:1 Identity Verification
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        gap: 32,
      }}>

        {/* Face Comparison Area */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          position: 'relative',
        }}>

          {/* ID Card Face */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            style={inputStyle}
          >
            <img
              src="/man_white_bg.png"
              alt="ID Photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(0.9) saturate(0.8)',
              }}
            />
            {/* Scan line effect */}
            {phase === 'scanning' && (
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  boxShadow: '0 0 12px var(--cyan)',
                  zIndex: 2,
                }}
              />
            )}
            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: '8px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>ID PHOTO</span>
            </div>
            {/* Match border glow */}
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '18px',
                  border: '2px solid var(--green)',
                  boxShadow: '0 0 20px var(--green-glow)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </motion.div>

          {/* Connection Animation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            width: 50,
          }}>
            {phase === 'scanning' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 size={24} color="var(--cyan)" />
              </motion.div>
            )}
            {phase === 'comparing' && (
              <>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [-10, 10, -10],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: 'var(--cyan)',
                    }}
                  />
                ))}
              </>
            )}
            {phase === 'result' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 size={28} color="var(--green)" />
              </motion.div>
            )}
          </div>

          {/* Live Face */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
            style={inputStyle}
          >
            <img
              src="/man_white_bg.png"
              alt="Live Photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Scan line effect */}
            {phase === 'scanning' && (
              <motion.div
                animate={{ y: ['200%', '-100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  boxShadow: '0 0 12px var(--cyan)',
                  zIndex: 2,
                }}
              />
            )}
            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: '8px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>LIVE CAPTURE</span>
            </div>
            {/* Match border glow */}
            {phase === 'result' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '18px',
                  border: '2px solid var(--green)',
                  boxShadow: '0 0 20px var(--green-glow)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </motion.div>
        </div>

        {/* Status Area */}
        <div style={{
          width: '100%',
          maxWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}>

          {/* Model Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-full)',
          }}>
            <ScanFace size={16} color="var(--cyan)" />
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              AdaFace • 512-d Embedding
            </span>
          </div>

          {/* Phase-specific content */}
          <AnimatePresence mode="wait">
            {phase === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center' }}
              >
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 4,
                }}>
                  Extracting Facial Embeddings...
                </p>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                }}>
                  Detecting facial landmarks from both sources
                </p>
              </motion.div>
            )}

            {phase === 'comparing' && (
              <motion.div
                key="comparing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ width: '100%', textAlign: 'center' }}
              >
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                }}>
                  Computing Vector Similarity...
                </p>

                {/* Progress bar */}
                <div style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 3,
                  background: 'var(--bg-elevated)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-glass)',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, var(--cyan), var(--green))',
                      borderRadius: 3,
                      boxShadow: '0 0 8px var(--cyan-glow)',
                    }}
                  />
                </div>

                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: 8,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  cosine_similarity(emb_a, emb_b) = {progress}%
                </p>
              </motion.div>
            )}

            {phase === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '20px',
                  background: 'var(--green-dim)',
                  border: '1px solid var(--green)',
                  borderRadius: '16px',
                }}
              >
                <motion.p
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--green)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {score.toFixed(1)}%
                </motion.p>
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--green)',
                  marginBottom: 4,
                }}>
                  Identity Confirmed
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  Document face matches live capture
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
