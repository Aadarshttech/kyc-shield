import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, CreditCard, ShieldCheck } from 'lucide-react';

export default function WelcomeStep({ onNext, onBack }) {
  const steps = [
    {
      icon: CreditCard,
      title: 'Document Scan',
      desc: 'Scan your ID card or passport for data extraction',
    },
    {
      icon: User,
      title: 'Liveness Detection',
      desc: 'Real-time face mapping and occlusion testing',
    },
    {
      icon: ShieldCheck,
      title: 'Identity Verification',
      desc: 'Review your details securely to finalize KYC',
    },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      padding: '10px 8px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
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
          }}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: '1.7rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          marginBottom: 32,
        }}
      >
        Verify Your Identity
      </motion.h1>

      {/* Steps List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
            }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'var(--bg-glass-hover)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <step.icon size={22} color="var(--cyan)" />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                {step.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {step.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="btn btn-green"
        style={{
          width: '100%',
          padding: '18px 24px',
          fontSize: '1.05rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 700,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Start Verification
      </motion.button>
    </div>
  );
}
