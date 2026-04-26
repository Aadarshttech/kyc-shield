import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Loader2, FileSearch, Scan, Brain, Sparkles, ArrowRight } from 'lucide-react';

const vectors = [
  { label: 'Document Analysis', icon: FileSearch, color: 'var(--cyan)', score: '28/100' },
  { label: 'Biometric Liveness', icon: Scan, color: 'var(--purple)', score: '8/100' },
  { label: 'Behavioural Analysis', icon: Brain, color: 'var(--green)', score: '12/100' },
];

export default function ProcessingStep({ onRestart }) {
  const [phase, setPhase] = useState('processing'); 
  const [filledVectors, setFilledVectors] = useState([]);

  useEffect(() => {
    const timers = [];
    vectors.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setFilledVectors(prev => [...prev, i]);
      }, 800 + i * 700));
    });

    timers.push(setTimeout(() => setPhase('success'), 3500));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '0 8px',
    }}>
      <AnimatePresence mode="wait">
        {phase === 'processing' ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%' }}
          >
            {/* Elegant Scanner Animation */}
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 32px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(0, 242, 254, 0.1)',
                  borderTopColor: 'var(--cyan)',
                  borderRightColor: 'var(--purple)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 10,
                  borderRadius: '50%',
                  border: '2px dashed rgba(0, 255, 135, 0.2)',
                  borderBottomColor: 'var(--green)',
                }}
              />
              <Shield size={32} color="var(--text-primary)" style={{ position: 'absolute', top: 24, left: 24 }} />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Verifying Identity
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 40 }}>
              Running multi-layered risk assessment...
            </p>

            {/* Vector Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {vectors.map((v, i) => {
                const isFilled = filledVectors.includes(i);
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <v.icon size={16} color={isFilled ? v.color : 'var(--text-dim)'} />
                        <span style={{ fontSize: '0.85rem', color: isFilled ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: 500, transition: 'color 0.3s' }}>
                          {v.label}
                        </span>
                      </div>
                      {isFilled && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mono"
                          style={{ fontSize: '0.75rem', color: v.color, fontWeight: 600 }}
                        >
                          Complete
                        </motion.span>
                      )}
                    </div>
                    <div style={{
                      width: '100%', height: 4, borderRadius: 2, background: 'var(--bg-glass)', overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: isFilled ? '100%' : '0%' }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        style={{ height: '100%', background: v.color, boxShadow: `0 0 10px ${v.color}` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Grand Success Icon */}
            <div style={{ position: 'relative', marginBottom: 32 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                style={{
                  width: 100, height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--green), #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 40px var(--green-glow), inset 0 -4px 10px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Check size={50} color="#fff" strokeWidth={3} />
              </motion.div>
              
              {/* Confetti Rings */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '2px solid var(--green)',
                  zIndex: 1,
                }}
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.03em' }}
            >
              Identity Verified
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 40, lineHeight: 1.5 }}
            >
              Your KYC has been approved automatically.<br/>
              Welcome to the eSewa ecosystem.
            </motion.p>

            {/* Score Certificate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              style={{
                width: '100%',
                padding: '20px',
                borderRadius: 'var(--radius-xl)',
                background: 'linear-gradient(180deg, rgba(0,255,135,0.05) 0%, rgba(0,0,0,0) 100%)',
                border: '1px solid rgba(0, 255, 135, 0.2)',
                marginBottom: 40,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shine effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                style={{
                  position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Shield size={14} color="var(--green)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--green)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Security Clear
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fraud Risk Score</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span className="mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>15</span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/100</span>
                </div>
              </div>
            </motion.div>

            {/* Bottom Action */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              style={{
                width: '100%',
                padding: '18px 24px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                fontSize: '1.05rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              Continue to Dashboard
              <ArrowRight size={20} />
            </motion.button>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
