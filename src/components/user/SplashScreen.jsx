import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';

export default function SplashScreen({ onNext }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      padding: '24px',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: 96,
          height: 96,
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--green), var(--cyan))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          boxShadow: '0 20px 40px rgba(0, 242, 254, 0.3)'
        }}
      >
        <Shield size={48} color="#fff" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 16,
          letterSpacing: '-0.03em'
        }}
      >
        Welcome to<br/>
        <span style={{ color: 'var(--green)' }}>KYC Shield</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          marginBottom: 48,
          maxWidth: '280px'
        }}
      >
        Next-generation AI fraud detection and seamless identity verification for eSewa.
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        style={{
          width: '100%',
          padding: '18px 24px',
          fontSize: '1.1rem',
          borderRadius: 'var(--radius-full)',
          fontWeight: 700,
          background: 'var(--text-primary)',
          color: 'var(--bg-primary)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
      >
        Get Started <ArrowRight size={20} />
      </motion.button>
      
    </div>
  );
}
