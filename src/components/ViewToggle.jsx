import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Monitor, Smartphone } from 'lucide-react';

export default function ViewToggle({ currentView, onToggle }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      style={{
        position: 'fixed',
        top: 20,
        right: 24,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass)',
        borderRadius: 'var(--radius-full)',
        padding: '4px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      }}
    >
      <button
        onClick={() => onToggle('user')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 20px',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          transition: 'all 250ms ease',
          background: currentView === 'user' ? 'var(--green)' : 'transparent',
          color: currentView === 'user' ? 'var(--bg-primary)' : 'var(--text-muted)',
          boxShadow: currentView === 'user' ? '0 0 20px var(--green-dim)' : 'none',
        }}
      >
        <Smartphone size={16} />
        User Flow
      </button>
      <button
        onClick={() => onToggle('admin')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 20px',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.82rem',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          transition: 'all 250ms ease',
          background: currentView === 'admin' ? 'var(--cyan)' : 'transparent',
          color: currentView === 'admin' ? 'var(--bg-primary)' : 'var(--text-muted)',
          boxShadow: currentView === 'admin' ? '0 0 20px var(--cyan-dim)' : 'none',
        }}
      >
        <Monitor size={16} />
        Admin Dashboard
      </button>
    </motion.div>
  );
}
