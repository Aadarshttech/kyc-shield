import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, FileSearch, Scan, Brain, AlertTriangle, ShieldX, CheckCircle2, Shield, UserSquare2, Hash, MapPin, Calendar, FileText, Users, Briefcase, Phone } from 'lucide-react';
import EvidenceTabs from './EvidenceTabs';



export default function CaseReview({ data, onClose, onDecision }) {
  if (!data) return null;
  const isHighRisk = data.score >= 60;
  const isLowRisk = data.score < 30;
  const [actionTaken, setActionTaken] = useState(null);

  const handleApprove = () => {
    setActionTaken('approved');
    setTimeout(() => onDecision('approved'), 1500);
  };

  const handleReject = () => {
    setActionTaken('rejected');
    setTimeout(() => onDecision('rejected'), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      style={{
        height: '100vh',
        overflowY: 'auto',
        padding: '24px',
        borderLeft: '1px solid var(--border-glass)',
        background: 'var(--bg-secondary)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Case Review</h2>
        <button onClick={onClose} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: 8, cursor: 'pointer', color: 'var(--text-primary)', display: 'flex' }}>
          <X size={18} />
        </button>
      </div>

      {/* Action Taken Banner */}
      <AnimatePresence>
        {actionTaken && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`alert-box ${actionTaken === 'approved' ? 'success' : 'danger'}`}
            style={{ marginBottom: 20 }}
          >
            {actionTaken === 'approved' ? <CheckCircle2 size={18} style={{ flexShrink: 0 }} /> : <ShieldX size={18} style={{ flexShrink: 0 }} />}
            <div>
              <div style={{ fontWeight: 700, marginBottom: 3 }}>
                {actionTaken === 'approved' ? 'Application Approved — Override' : 'Application Rejected — Blacklisted'}
              </div>
              <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>
                {actionTaken === 'approved'
                  ? `${data.name}'s eSewa wallet has been provisioned. Decision logged to audit trail.`
                  : `${data.name} has been added to the fraud blacklist. Device fingerprint and ID number frozen.`
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Applicant Card */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 'var(--radius-full)',
                background: isHighRisk
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : isLowRisk
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #f59e0b, #d97706)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700, color: '#fff'
              }}>
                {data.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{data.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{data.docType} • {data.time}</div>
              </div>
            </div>
          </div>
          {/* Score badge */}
          <motion.div
            animate={isHighRisk ? { boxShadow: ['0 0 10px var(--red-dim)', '0 0 25px var(--red-glow)', '0 0 10px var(--red-dim)'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              padding: '12px 18px',
              borderRadius: 'var(--radius-lg)',
              background: isHighRisk ? 'var(--red-dim)' : isLowRisk ? 'var(--green-dim)' : 'var(--yellow-dim)',
              border: `1px solid ${isHighRisk ? 'rgba(255,75,75,0.3)' : isLowRisk ? 'rgba(0,255,135,0.3)' : 'rgba(251,191,36,0.3)'}`,
              textAlign: 'center',
            }}
          >
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: isHighRisk ? 'var(--red)' : isLowRisk ? 'var(--green)' : 'var(--yellow)', lineHeight: 1 }}>{data.score}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 2 }}>/100</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: isHighRisk ? 'var(--red)' : isLowRisk ? 'var(--green)' : 'var(--yellow)', marginTop: 4 }}>{data.risk} Risk</div>
          </motion.div>
        </div>

        {/* Score breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'V1 — Document', score: data.v1, weight: '30%', color: 'var(--cyan)', icon: FileSearch },
            { label: 'V2 — Biometric', score: data.v2, weight: '35%', color: 'var(--purple)', icon: Scan },
            { label: 'V3 — Occlusion', score: data.v3, weight: '35%', color: 'var(--red)', icon: Brain },
          ].map((v, i) => (
            <div key={i} style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                <v.icon size={12} color={v.color} />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{v.label}</span>
              </div>
              <div className="mono" style={{ fontSize: '1.05rem', fontWeight: 700, color: v.score >= 70 ? 'var(--red)' : v.score >= 40 ? 'var(--yellow)' : 'var(--green)' }}>
                {v.score}/100
              </div>
              <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', marginTop: 2 }}>Weight: {v.weight}</div>
              <div style={{ width: '100%', height: 3, borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)', marginTop: 6, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${v.score}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }} style={{ height: '100%', borderRadius: 'var(--radius-full)', background: v.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Extracted Form Data */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FileText size={16} color="var(--text-secondary)" />
          Application Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'Full Name', value: data.name, icon: UserSquare2 },
            { label: 'Document Type', value: data.docType, icon: FileSearch },
            { label: 'ID Number', value: data.idNumber, icon: Hash },
            { label: 'Date of Birth', value: data.dob, icon: Calendar },
            { label: 'Gender', value: data.gender, icon: UserSquare2 },
            { label: 'Father\'s Name', value: data.fatherName, icon: Users },
            { label: 'Grandfather\'s Name', value: data.grandfatherName, icon: Users },
            { label: 'Occupation', value: data.occupation, icon: Briefcase },
            { label: 'Contact Number', value: data.contactNumber, icon: Phone },
            { label: 'Permanent Address', value: data.permanentAddress, icon: MapPin },
            { label: 'Current Address', value: data.currentAddress, icon: MapPin },
            { label: 'OCR Match', value: '100% Verified', icon: CheckCircle2, color: 'var(--green)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ padding: 6, borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
                <item.icon size={14} color={item.color || 'var(--text-dim)'} />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: item.color || 'var(--text-primary)' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Tabs */}
      <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          {isHighRisk ? <ShieldAlert size={16} color="var(--red)" /> : isLowRisk ? <Shield size={16} color="var(--green)" /> : <AlertTriangle size={16} color="var(--yellow)" />}
          Evidence Analysis
        </h3>
        <EvidenceTabs v1={data.v1} v2={data.v2} v3={data.v3} />
      </div>

      {/* Action Buttons */}
      {!actionTaken && (
        <div style={{ display: 'flex', gap: 12 }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleApprove}
            className="btn btn-ghost"
            style={{ flex: 1, padding: '14px 20px', cursor: 'pointer' }}
          >
            <CheckCircle2 size={16} />
            {isHighRisk ? 'Approve Override' : 'Confirm Approve'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleReject}
            className="btn btn-red"
            style={{ flex: 1, padding: '14px 20px', cursor: 'pointer' }}
          >
            <ShieldX size={16} />
            {isHighRisk ? 'Confirm Reject & Blacklist' : 'Reject'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
