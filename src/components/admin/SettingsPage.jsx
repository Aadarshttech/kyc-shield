import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Zap, AlertTriangle, Save, RotateCcw, FileSearch, Scan, Brain, Fingerprint } from 'lucide-react';

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    autoApprove: 25,
    manualReview: 60,
    autoReject: 85,
    v1Weight: 30,
    v2Weight: 35,
    v3Weight: 35,
  });

  const [saved, setSaved] = useState(false);

  const handleSlider = (key, value) => {
    setThresholds({ ...thresholds, [key]: Number(value) });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setThresholds({ autoApprove: 25, manualReview: 60, autoReject: 85, v1Weight: 30, v2Weight: 35, v3Weight: 35 });
    setSaved(false);
  };

  const sliderStyle = {
    width: '100%', height: 6, borderRadius: 'var(--radius-full)',
    appearance: 'none', background: 'var(--bg-elevated)',
    outline: 'none', cursor: 'pointer',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Settings
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Risk Aggregator configuration and vector weights
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleReset} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            <RotateCcw size={14} />
            Reset Defaults
          </button>
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.96 }}
            className="btn btn-green"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            <Save size={14} />
            {saved ? 'Saved ✓' : 'Save Changes'}
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* Decision Thresholds */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} color="var(--green)" />
            Decision Thresholds
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Auto Approve */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Auto-Approve Below</span>
                <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--green)' }}>{thresholds.autoApprove}</span>
              </div>
              <input type="range" min="5" max="50" value={thresholds.autoApprove} onChange={(e) => handleSlider('autoApprove', e.target.value)} style={sliderStyle} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 6 }}>
                Applications scoring below this are automatically approved and wallet provisioned.
              </p>
            </div>

            {/* Manual Review */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Manual Review Above</span>
                <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--yellow)' }}>{thresholds.manualReview}</span>
              </div>
              <input type="range" min="30" max="80" value={thresholds.manualReview} onChange={(e) => handleSlider('manualReview', e.target.value)} style={sliderStyle} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 6 }}>
                Applications in this range are queued for human compliance officer review.
              </p>
            </div>

            {/* Auto Reject */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Auto-Reject Above</span>
                <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--red)' }}>{thresholds.autoReject}</span>
              </div>
              <input type="range" min="70" max="99" value={thresholds.autoReject} onChange={(e) => handleSlider('autoReject', e.target.value)} style={sliderStyle} />
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 6 }}>
                Applications scoring above this with a hard-fail condition are automatically rejected.
              </p>
            </div>
          </div>

          {/* Visual Score Band */}
          <div style={{ marginTop: 24, padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10, fontWeight: 600 }}>Score Distribution Preview</div>
            <div style={{ display: 'flex', height: 16, borderRadius: 'var(--radius-full)', overflow: 'hidden', gap: 2 }}>
              <motion.div layout style={{ flex: thresholds.autoApprove, background: 'var(--green)', borderRadius: 'var(--radius-full) 0 0 var(--radius-full)' }} />
              <motion.div layout style={{ flex: thresholds.manualReview - thresholds.autoApprove, background: 'var(--yellow)' }} />
              <motion.div layout style={{ flex: thresholds.autoReject - thresholds.manualReview, background: 'var(--yellow)', opacity: 0.6 }} />
              <motion.div layout style={{ flex: 100 - thresholds.autoReject, background: 'var(--red)', borderRadius: '0 var(--radius-full) var(--radius-full) 0' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--green)', fontWeight: 600 }}>Auto-Approve</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--yellow)', fontWeight: 600 }}>Manual Review</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--red)', fontWeight: 600 }}>Auto-Reject</span>
            </div>
          </div>
        </div>

        {/* Vector Weights */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Zap size={16} color="var(--cyan)" />
            Vector Weights
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { key: 'v1Weight', label: 'V1 — Document Analysis', icon: FileSearch, color: 'var(--cyan)', desc: 'YOLOv8 segmentation, ELA tamper, OCR cross-validation, device fingerprint' },
              { key: 'v2Weight', label: 'V2 — Biometric Liveness', icon: Scan, color: 'var(--purple)', desc: 'rPPG heartbeat, EfficientNet-B4 deepfake, blink rate, LBP texture, AdaFace match' },
              { key: 'v3Weight', label: 'V3 — Occlusion Testing', icon: Brain, color: 'var(--red)', desc: 'Persistence Paradox detection, hand-tracking, randomized prompt challenge' },
            ].map((v) => (
              <div key={v.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <v.icon size={14} color={v.color} />
                    {v.label}
                  </span>
                  <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: v.color }}>{thresholds[v.key]}%</span>
                </div>
                <input type="range" min="10" max="60" value={thresholds[v.key]} onChange={(e) => handleSlider(v.key, e.target.value)} style={sliderStyle} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 6 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Total weight indicator */}
          <div style={{
            marginTop: 24, padding: 12, borderRadius: 'var(--radius-md)',
            background: (thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight) === 100 ? 'var(--green-dim)' : 'var(--red-dim)',
            border: `1px solid ${(thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight) === 100 ? 'rgba(0,255,135,0.2)' : 'rgba(255,75,75,0.2)'}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {(thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight) === 100 ? (
              <Shield size={14} color="var(--green)" />
            ) : (
              <AlertTriangle size={14} color="var(--red)" />
            )}
            <span style={{
              fontSize: '0.78rem', fontWeight: 600,
              color: (thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight) === 100 ? 'var(--green)' : 'var(--red)',
            }}>
              Total: {thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight}% {(thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight) === 100 ? '— Balanced' : '— Must equal 100%'}
            </span>
          </div>
        </div>

        {/* Hard Fail Conditions */}
        <div className="glass-card" style={{ padding: 24, gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} color="var(--red)" />
            Hard-Fail Override Conditions
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
            These conditions trigger an automatic rejection regardless of the aggregate score. They represent definitive fraud signals.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { label: 'Virtual Camera Detected', desc: 'OBS, ManyCam, or other virtual camera software detected in device camera list', icon: Scan, active: true },
              { label: 'rPPG Liveness Failure', desc: 'Heart rate signal returned 0 BPM across the entire 15-second video sample', icon: AlertTriangle, active: true },
              { label: 'Persistence Paradox', desc: 'Face mesh landmarks persist above 90% during confirmed physical hand occlusion', icon: Brain, active: true },
              { label: 'Duplicate Device ID', desc: 'Same device fingerprint attempting 3+ KYC registrations within 24 hours', icon: Fingerprint, active: true },
              { label: 'Duplicate ID Number', desc: 'Citizenship/Passport number already registered to an existing verified account', icon: FileSearch, active: true },
              { label: 'Face Match Failure', desc: 'AdaFace 1:1 embedding comparison returns similarity below 40% threshold', icon: Scan, active: true },
            ].map((cond, i) => (
              <div key={i} style={{
                padding: 16, borderRadius: 'var(--radius-md)',
                background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <cond.icon size={14} color="var(--red)" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cond.label}</span>
                  </div>
                  <div style={{
                    width: 36, height: 20, borderRadius: 'var(--radius-full)',
                    background: cond.active ? 'var(--green)' : 'var(--bg-elevated)',
                    position: 'relative', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute', top: 2,
                      left: cond.active ? 18 : 2,
                      transition: 'left 0.2s',
                    }} />
                  </div>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{cond.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
