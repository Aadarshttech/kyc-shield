import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, Clock, ShieldAlert, AlertTriangle, Eye, ChevronRight } from 'lucide-react';

const autoRejectedMocks = [
  {
    id: 'R-001',
    name: 'Unknown User #4412',
    reason: 'Virtual Camera Detected (OBS Virtual Cam)',
    score: 98,
    time: '14 min ago',
    vector: 'V2 — Biometric',
    details: 'rPPG returned 0 BPM. Device camera flagged as virtual input device.',
  },
  {
    id: 'R-002',
    name: 'Hari Prasad K.',
    reason: 'Persistence Paradox — Deepfake Face Swap',
    score: 92,
    time: '1 hr ago',
    vector: 'V3 — Occlusion',
    details: 'Face mesh landmarks persisted at 96.4% during hand-occlusion prompt. Consistent with real-time face-swap.',
  },
  {
    id: 'R-003',
    name: 'Unknown User #7783',
    reason: 'ELA Tamper + Duplicate ID Number',
    score: 88,
    time: '3 hrs ago',
    vector: 'V1 — Document',
    details: 'JPEG compression inconsistency around portrait zone. ID number 12-78-34-562 already registered to another user.',
  },
];

export default function RejectedPage({ rejectedApps = [] }) {
  // Combine mocked auto-rejects with actual rejected applications from state
  const combinedApps = [
    ...rejectedApps.map(app => ({
      id: `R-${app.id.toString().padStart(3, '0')}`,
      name: app.name,
      reason: app.caseStatus === 'fraud' ? 'Persistence Paradox & Biometric Failure' : 'Manual Rejection by Compliance Officer',
      score: app.score,
      time: 'Just now',
      vector: app.caseStatus === 'fraud' ? 'V3 — Occlusion & V2 — Biometric' : 'Manual Review',
      details: app.caseStatus === 'fraud' 
        ? 'Deepfake confidence high. rPPG returned irregular signals. Manually verified and blacklisted.'
        : 'Application rejected after manual review due to missing or suspicious details.',
    })),
    ...autoRejectedMocks
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Auto-Rejected
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Applications auto-rejected by the Risk Aggregator
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="badge badge-red">
            <ShieldAlert size={12} />
            {combinedApps.length} in last 24h
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="alert-box warning" style={{ marginBottom: 24 }}>
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>Automatic Rejection Criteria</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>
            Applications are auto-rejected when the Risk Aggregator score ≥ 85 with at least one hard-fail condition: virtual camera detection, liveness failure (0 BPM), or Persistence Paradox trigger.
          </div>
        </div>
      </div>

      {/* Rejected Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {combinedApps.map((app, i) => (
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
                  background: 'var(--red-dim)',
                  border: '1px solid rgba(255,75,75,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <XCircle size={20} color="var(--red)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{app.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Clock size={11} /> {app.time}
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ boxShadow: ['0 0 8px var(--red-dim)', '0 0 18px var(--red-glow)', '0 0 8px var(--red-dim)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--red-dim)',
                  border: '1px solid rgba(255,75,75,0.3)',
                  textAlign: 'center',
                }}
              >
                <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--red)', lineHeight: 1 }}>{app.score}</div>
                <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginTop: 2 }}>/100</div>
              </motion.div>
            </div>

            <div style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255,75,75,0.04)',
              border: '1px solid rgba(255,75,75,0.1)',
              marginBottom: 10,
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--red)', marginBottom: 4 }}>
                {app.reason}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {app.details}
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
                {app.vector}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-dim)', cursor: 'pointer' }}>
                <Eye size={13} /> View Full Report <ChevronRight size={13} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
