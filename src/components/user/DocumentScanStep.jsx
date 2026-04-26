import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2, ScanLine, CreditCard } from 'lucide-react';

const scanSteps = [
  { text: 'Aligning document...', duration: 1000 },
  { text: 'Running YOLOv8 Segment Analysis...', duration: 1500 },
  { text: 'OCR Cross-Validation (Devanagari + Latin)...', duration: 1200 },
  { text: 'Tamper Detection (ELA)... Clear', duration: 1000 },
];

export default function DocumentScanStep({ onNext, onBack }) {
  const [currentScanStep, setCurrentScanStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (currentScanStep < scanSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentScanStep]);
        setCurrentScanStep(prev => prev + 1);
      }, scanSteps[currentScanStep].duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onNext, 800);
      return () => clearTimeout(timer);
    }
  }, [currentScanStep, onNext]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)',
            padding: 8,
            cursor: 'pointer',
            color: 'var(--text-primary)',
            display: 'flex',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Document Scan</h2>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Hold your ID card within the frame
          </p>
        </div>
      </div>

      {/* Document Scan Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          padding: '24px 16px',
          borderRadius: 'var(--radius-lg)',
          background: 'transparent',
          border: '2px solid var(--cyan-dim)',
          overflow: 'hidden',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ID Card Mockup - Nepal Nagrita style */}
        <div style={{
          width: '100%',
          aspectRatio: '1.6 / 1',
          borderRadius: 'var(--radius-md)',
          background: '#fdf6e3', // Light beige base
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
        }}>
          {/* Faint watermark background pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)',
            pointerEvents: 'none',
          }} />

          {/* Top Header Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, position: 'relative', zIndex: 1 }}>
            {/* Red Logo Placeholder */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#dc2626',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #991b1b',
              flexShrink: 0,
              position: 'relative',
            }}>
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>Logo</span>
              <AnimatePresence>
                {currentScanStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    style={{
                      position: 'absolute',
                      inset: -4,
                      border: '1.5px solid #00ff00',
                      background: 'rgba(0, 255, 0, 0.1)',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ position: 'absolute', top: -12, left: -1, background: '#00ff00', color: '#000', fontSize: 6, fontWeight: 700, padding: '1px 3px', whiteSpace: 'nowrap' }}>seal 0.99</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Red Text Header */}
            <div style={{ flex: 1, textAlign: 'center', color: '#dc2626' }}>
              <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.2 }}>नेपाल सरकार</div>
              <div style={{ fontSize: 8, fontWeight: 700, lineHeight: 1.2 }}>गृह मन्त्रालय</div>
              <div style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.2 }}>जिल्ला प्रशासन कार्यालय</div>
            </div>
            
            {/* Right side box (Stamp placeholder) */}
            <div style={{
               width: 30, height: 30, border: '1px solid #555',
            }} />
          </div>

          <div style={{
            fontSize: 8, fontWeight: 800, color: '#1a1a1a',
            textAlign: 'center', marginBottom: 6, letterSpacing: 0.5,
            position: 'relative', zIndex: 1,
          }}>
            नेपाली नागरिकताको प्रमाणपत्र
          </div>

          {/* Main Body - Photo and Fields */}
          <div style={{ display: 'flex', gap: 12, flex: 1, position: 'relative', zIndex: 1 }}>
            {/* Left: Photo placeholder */}
            <div style={{
              width: 48, height: 58,
              background: 'transparent',
              border: '1px solid #555',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
              <CreditCard size={18} color="#999" />
              <AnimatePresence>
                {currentScanStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      inset: -3,
                      border: '1.5px solid #00ff00',
                      background: 'rgba(0, 255, 0, 0.1)',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ position: 'absolute', top: -12, left: -1, background: '#00ff00', color: '#000', fontSize: 6, fontWeight: 700, padding: '1px 3px', whiteSpace: 'nowrap' }}>portrait 0.98</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right: Fields */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
              {[
                { label: 'नाम थर:', valWidth: '80%' },
                { label: 'जन्म स्थान:', valWidth: '60%' },
                { label: 'स्थायी बासस्थान:', valWidth: '90%' },
                { label: 'जन्म मिति:', valWidth: '70%' },
                { label: 'बाबुको नाम थर:', valWidth: '85%' },
              ].map((field, i) => (
                <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 6.5, color: '#111', whiteSpace: 'nowrap', fontWeight: 600 }}>{field.label}</span>
                  <div style={{
                    flex: 1, height: 1,
                    background: 'repeating-linear-gradient(to right, #999 0, #999 2px, transparent 2px, transparent 4px)',
                    marginBottom: 2,
                  }} />
                </div>
              ))}
              
              <AnimatePresence>
                {currentScanStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    style={{
                      position: 'absolute',
                      inset: -4,
                      border: '1.5px solid #00ff00',
                      background: 'rgba(0, 255, 0, 0.05)',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ position: 'absolute', top: -12, left: -1, background: '#00ff00', color: '#000', fontSize: 6, fontWeight: 700, padding: '1px 3px', whiteSpace: 'nowrap' }}>text_fields 0.96</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Scanning Laser */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 3,
            background: 'var(--cyan)',
            boxShadow: '0 0 20px var(--cyan), 0 0 60px var(--cyan-glow)',
            zIndex: 5,
          }}
          animate={{ top: ['10%', '85%', '10%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Corner brackets */}
        {[
          { top: 6, left: 6 },
          { top: 6, right: 6 },
          { bottom: 6, left: 6 },
          { bottom: 6, right: 6 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: 24,
              height: 24,
              borderColor: 'var(--cyan)',
              borderStyle: 'solid',
              borderWidth: 0,
              ...(i === 0 && { borderTopWidth: 2.5, borderLeftWidth: 2.5, borderTopLeftRadius: 6 }),
              ...(i === 1 && { borderTopWidth: 2.5, borderRightWidth: 2.5, borderTopRightRadius: 6 }),
              ...(i === 2 && { borderBottomWidth: 2.5, borderLeftWidth: 2.5, borderBottomLeftRadius: 6 }),
              ...(i === 3 && { borderBottomWidth: 2.5, borderRightWidth: 2.5, borderBottomRightRadius: 6 }),
              zIndex: 6,
            }}
          />
        ))}

        {/* Scan overlay glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,242,254,0.03) 0%, transparent 30%, transparent 70%, rgba(0,242,254,0.03) 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Scan Progress Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnimatePresence>
          {scanSteps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isCurrent = i === currentScanStep;
            const isVisible = i <= currentScanStep;

            if (!isVisible) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isCompleted
                    ? 'rgba(0, 255, 135, 0.06)'
                    : 'var(--bg-glass)',
                  border: `1px solid ${isCompleted ? 'rgba(0,255,135,0.15)' : 'var(--border-glass)'}`,
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} color="var(--green)" />
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={16} color="var(--cyan)" />
                  </motion.div>
                )}
                <span
                  className="mono"
                  style={{
                    fontSize: '0.72rem',
                    color: isCompleted ? 'var(--green)' : 'var(--cyan)',
                    fontWeight: 500,
                  }}
                >
                  {step.text}
                  {isCompleted && ' ✓'}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
