import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  XCircle,
  CheckCircle2,
  FileText,
  Settings,
  User,
  ChevronRight,
  Zap,
} from 'lucide-react';

export default function Sidebar({ activeNav, onNavChange, counts }) {
  const navItems = [
    { icon: Activity, label: 'Live Queue', id: 'queue', badge: counts?.queue || '0' },
    { icon: CheckCircle2, label: 'Approved', id: 'approved', badge: counts?.approved || '0' },
    { icon: XCircle, label: 'Rejected', id: 'rejected', badge: counts?.rejected || '0' },
    { icon: FileText, label: 'Audit Logs', id: 'logs' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];
  return (
    <div className="admin-sidebar">
      {/* Logo */}
      <div style={{
        padding: '24px 20px 20px',
        borderBottom: '1px solid var(--border-glass)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--green-dim), rgba(0,255,135,0.05))',
            border: '1px solid rgba(0,255,135,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Shield size={20} color="var(--green)" />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              KYC Shield
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Zap size={9} color="var(--green)" />
              Admin Console
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', padding: '8px 12px 6px', marginBottom: 2 }}>
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavChange(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 14px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                background: isActive
                  ? 'linear-gradient(90deg, rgba(0,255,135,0.08), rgba(0,255,135,0.02))'
                  : 'transparent',
                transition: 'all 200ms ease',
                position: 'relative',
                textAlign: 'left',
                marginBottom: 2,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: 3,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--green)',
                    boxShadow: '0 0 8px var(--green-glow)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <item.icon size={17} color={isActive ? 'var(--green)' : 'var(--text-dim)'} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--green-dim)' : 'var(--bg-glass)',
                  color: isActive ? 'var(--green)' : 'var(--text-dim)',
                }}>
                  {item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom User Card */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-glass)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          cursor: 'pointer',
          transition: 'all 200ms ease',
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #334155, #475569)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <User size={16} color="var(--text-secondary)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>Suman K.</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>Compliance Officer</div>
          </div>
          <ChevronRight size={14} color="var(--text-dim)" />
        </div>
      </div>
    </div>
  );
}
