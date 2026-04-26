import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Hand, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function OcclusionTestStep({ onNext, onBack }) {
  const [countdown, setCountdown] = useState(4);
  const [phase, setPhase] = useState('prompt'); // prompt -> testing -> verifying -> done

  useEffect(() => {
    if (phase === 'testing') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('verifying');
      }
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === 'verifying') {
      const timer = setTimeout(() => setPhase('done'), 2500); // 2.5 seconds verification time
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '24px 24px 16px',
        zIndex: 10,
        position: 'relative'
      }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'var(--bg-elevated)', 
            border: '1px solid var(--border)', 
            color: 'var(--text-primary)',
            width: 40, height: 40, 
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Main Camera Area */}
      <div style={{
        flex: 1,
        width: '100%',
        background: 'transparent',
        position: 'absolute',
        inset: 0,
        borderRadius: '36px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        
        {/* Continuous Camera Feed */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: (phase === 'prompt' || (phase === 'testing' && countdown === 4)) 
              ? 'url("/man_white_bg.png")' 
              : 'url("/man_covering_nose.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            transition: 'background-image 0.1s ease-in-out'
          }} 
        />

        {/* Prompt Overlay */}
        <AnimatePresence>
          {phase === 'prompt' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
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
                background: 'rgba(239, 68, 68, 0.1)', // aRed dim
                border: '2px solid var(--red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}>
                <ShieldAlert size={36} color="var(--red)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                Occlusion Test
              </h3>
              <p style={{ fontSize: '1rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: 8 }}>
                To prove liveness, please cover your nose with your hand for 4 seconds.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Testing Overlays */}
        {phase === 'testing' && (
          <>
            {/* Countdown Overlay */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, x: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%" }}
              style={{
                position: 'absolute',
                top: '20%',
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
                  fontSize: '5rem', 
                  fontWeight: 800, 
                  color: 'var(--cyan)',
                  textShadow: '0 0 30px rgba(0, 242, 254, 0.6)'
                }}
              >
                {countdown}
              </motion.span>
            </motion.div>
          </>
        )}

        {/* Verifying Overlay */}
        <AnimatePresence>
          {phase === 'verifying' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: 50, height: 50,
                  border: '4px solid rgba(0, 242, 254, 0.2)',
                  borderTopColor: 'var(--cyan)',
                  borderRadius: '50%',
                  marginBottom: 20
                }}
              />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', letterSpacing: '1px' }}>
                Verifying Occlusion...
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Overlay */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(34, 197, 94, 0.15)', // Green dim tint
                zIndex: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: 'spring', bounce: 0.5 }}
                 style={{
                   width: 80, height: 80,
                   background: 'var(--green)',
                   borderRadius: '50%',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
                 }}
               >
                 <CheckCircle2 size={40} color="#ffffff" />
               </motion.div>
               <h3 style={{ marginTop: 24, fontSize: '1.4rem', fontWeight: 700, color: 'var(--green)', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                 Liveness Verified
               </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button Container */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <motion.button
            whileHover={phase === 'prompt' || phase === 'done' ? { scale: 1.02 } : {}}
            whileTap={phase === 'prompt' || phase === 'done' ? { scale: 0.98 } : {}}
            onClick={
              phase === 'prompt' ? () => setPhase('testing') : 
              phase === 'done' ? onNext : undefined
            }
            style={{
              background: (phase === 'counting' || phase === 'testing' || phase === 'verifying') ? 'var(--bg-elevated)' : 'var(--bg-card-solid)',
              color: (phase === 'counting' || phase === 'testing' || phase === 'verifying') ? 'var(--text-muted)' : 'var(--text-primary)',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '24px',
              fontSize: '1.1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: (phase === 'counting' || phase === 'testing' || phase === 'verifying') ? 'not-allowed' : 'pointer',
              opacity: (phase === 'counting' || phase === 'testing' || phase === 'verifying') ? 0.7 : 1,
              width: '100%',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
             <Hand size={18} color={(phase === 'counting' || phase === 'testing' || phase === 'verifying') ? 'var(--text-muted)' : 'var(--cyan)'} />
             <span>
                {phase === 'prompt' ? 'Start Test' : 
                 phase === 'testing' ? `Testing... ${countdown}s` : 
                 phase === 'verifying' ? 'Verifying...' :
                 'Continue'}
             </span>
          </motion.button>
        </div>

      </div>
    </div>
  );
}
