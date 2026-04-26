import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Eye, ChevronRight } from 'lucide-react';

export default function ApprovedPage({ approvedApps }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Approved Accounts
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Applications successfully verified and wallets provisioned
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="badge badge-green">
            <CheckCircle2 size={12} />
            {approvedApps.length} Approved
          </div>
        </div>
      </div>

      {approvedApps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          No applications have been approved yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {approvedApps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card"
              style={{ padding: 20, cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--green-dim)',
                    border: '1px solid rgba(0,255,135,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle2 size={20} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{app.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                      <Clock size={11} /> {app.time}
                    </div>
                  </div>
                </div>
                <motion.div
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--green-dim)',
                    border: '1px solid rgba(0,255,135,0.3)',
                    textAlign: 'center',
                  }}
                >
                  <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--green)', lineHeight: 1 }}>{app.score}</div>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginTop: 2 }}>/100</div>
                </motion.div>
              </div>

              <div style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0,255,135,0.04)',
                border: '1px solid rgba(0,255,135,0.1)',
                marginBottom: 10,
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--green)', marginBottom: 4 }}>
                  Verified & Provisioned
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  All biometric and document checks passed. The user's eSewa wallet has been activated.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-muted)',
                }}>
                  {app.docType}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <Eye size={13} /> View Full Report <ChevronRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
