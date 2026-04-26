import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Monitor, Smartphone, Sun, Moon, Maximize, Minimize } from 'lucide-react';

export default function ViewToggle({ currentView, onToggle, theme, onThemeToggle, isFullscreen, onFullscreenToggle }) {
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

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 4px' }} />

      {/* Theme Toggle Button */}
      <button
        onClick={onThemeToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          cursor: 'pointer',
          background: 'transparent',
          color: 'var(--text-muted)',
          transition: 'all 250ms ease',
        }}
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={onFullscreenToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          borderRadius: 'var(--radius-full)',
          border: 'none',
          cursor: 'pointer',
          background: 'transparent',
          color: 'var(--text-muted)',
          transition: 'all 250ms ease',
        }}
        title="Toggle Fullscreen"
      >
        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
      </button>

    </motion.div>
  );
}
