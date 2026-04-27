import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, AlertTriangle, Save, RotateCcw, FileSearch, Scan, Brain, Fingerprint, Check } from 'lucide-react';

/* ─── Custom Slider Component ──────────────────────────── */
function SliderInput({ value, min, max, onChange, color = '#00f2fe' }) {
  const trackRef = useRef(null);
  const pct = ((value - min) / (max - min)) * 100;

  const getValueFromEvent = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + ratio * (max - min));
  }, [min, max]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onChange(getValueFromEvent(e));
    const onMove = (ev) => onChange(getValueFromEvent(ev));
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleTouchStart = (e) => {
    const onMove = (ev) => onChange(getValueFromEvent(ev));
    const onEnd = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'relative', height: 6, borderRadius: 999,
        background: 'rgba(255,255,255,0.12)',
        cursor: 'pointer', userSelect: 'none', marginTop: 4,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Filled bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: `${pct}%`, borderRadius: 999,
        background: `linear-gradient(90deg, ${color}99, ${color})`,
        transition: 'width 0.05s ease',
        boxShadow: `0 0 8px ${color}55`,
      }} />
      {/* Thumb */}
      <div style={{
        position: 'absolute', top: '50%',
        left: `${pct}%`, transform: 'translate(-50%, -50%)',
        width: 18, height: 18, borderRadius: '50%',
        background: '#fff', border: `3px solid ${color}`,
        boxShadow: `0 0 12px ${color}88, 0 2px 6px rgba(0,0,0,0.4)`,
        transition: 'box-shadow 0.15s ease',
        zIndex: 2,
      }} />
    </div>
  );
}

/* ─── Toggle Switch ─────────────────────────────────────── */
function Toggle({ value, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 999,
        background: value ? 'var(--green)' : 'rgba(100,116,139,0.4)',
        border: value ? '1px solid var(--green)' : '1px solid rgba(148,163,184,0.5)',
        position: 'relative', cursor: 'pointer', flexShrink: 0,
        transition: 'background 0.25s ease, border-color 0.25s ease',
        boxShadow: value ? '0 0 12px var(--green-dim)' : 'none',
      }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
        style={{
          position: 'absolute', top: 3,
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
        }}
      />
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────── */
export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    autoApprove: 25, manualReview: 60, autoReject: 85,
    v1Weight: 30, v2Weight: 35, v3Weight: 35,
  });
  const [saved, setSaved] = useState(false);
  const [hardFails, setHardFails] = useState([true, true, true, true, true, true]);

  const handleSlider = (key, value) => { setThresholds(t => ({ ...t, [key]: value })); setSaved(false); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const handleReset = () => { setThresholds({ autoApprove: 25, manualReview: 60, autoReject: 85, v1Weight: 30, v2Weight: 35, v3Weight: 35 }); setSaved(false); };
  const toggleHardFail = (i) => { setHardFails(prev => prev.map((v, idx) => idx === i ? !v : v)); };

  const totalW = thresholds.v1Weight + thresholds.v2Weight + thresholds.v3Weight;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Settings</h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Risk Aggregator configuration and vector weights</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleReset} className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.8rem', gap: 8 }}>
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <motion.button
            onClick={handleSave} whileTap={{ scale: 0.96 }}
            className="btn btn-green"
            style={{ padding: '8px 18px', fontSize: '0.8rem', minWidth: 148, gap: 8 }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved ✓' : 'Save Changes'}
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

        {/* Decision Thresholds */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} color="var(--green)" /> Decision Thresholds
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { key: 'autoApprove', label: 'Auto-Approve Below', min: 5, max: 50, color: '#00ff87', valueColor: 'var(--green)', desc: 'Applications scoring below this are automatically approved and wallet provisioned.' },
              { key: 'manualReview', label: 'Manual Review Above', min: 30, max: 80, color: '#fbbf24', valueColor: 'var(--yellow)', desc: 'Applications in this range are queued for human compliance officer review.' },
              { key: 'autoReject', label: 'Auto-Reject Above', min: 70, max: 99, color: '#ff4b4b', valueColor: 'var(--red)', desc: 'Applications scoring above this with a hard-fail condition are automatically rejected.' },
            ].map(s => (
              <div key={s.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: s.valueColor }}>{thresholds[s.key]}</span>
                </div>
                <SliderInput value={thresholds[s.key]} min={s.min} max={s.max} color={s.color} onChange={v => handleSlider(s.key, v)} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 8 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Score Band Preview */}
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
            <Zap size={16} color="var(--cyan)" /> Vector Weights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              { key: 'v1Weight', label: 'V1 — Document Analysis', icon: FileSearch, color: '#00f2fe', desc: 'YOLOv8 segmentation, ELA tamper, OCR cross-validation, device fingerprint' },
              { key: 'v2Weight', label: 'V2 — Biometric Liveness', icon: Scan, color: '#8b5cf6', desc: 'rPPG heartbeat, EfficientNet-B4 deepfake, blink rate, LBP texture, AdaFace match' },
              { key: 'v3Weight', label: 'V3 — Occlusion Testing', icon: Brain, color: '#ff4b4b', desc: 'Persistence Paradox detection, hand-tracking, randomized prompt challenge' },
            ].map(v => (
              <div key={v.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <v.icon size={14} color={v.color} /> {v.label}
                  </span>
                  <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: v.color }}>{thresholds[v.key]}%</span>
                </div>
                <SliderInput value={thresholds[v.key]} min={10} max={60} color={v.color} onChange={val => handleSlider(v.key, val)} />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 8 }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Total indicator */}
          <div style={{
            marginTop: 24, padding: 12, borderRadius: 'var(--radius-md)',
            background: totalW === 100 ? 'var(--green-dim)' : 'var(--red-dim)',
            border: `1px solid ${totalW === 100 ? 'rgba(0,255,135,0.2)' : 'rgba(255,75,75,0.2)'}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {totalW === 100 ? <Shield size={14} color="var(--green)" /> : <AlertTriangle size={14} color="var(--red)" />}
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: totalW === 100 ? 'var(--green)' : 'var(--red)' }}>
              Total: {totalW}% {totalW === 100 ? '— Balanced ✓' : '— Must equal 100%'}
            </span>
          </div>
        </div>

        {/* Hard Fail Conditions */}
        <div className="glass-card" style={{ padding: 24, gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertTriangle size={16} color="var(--red)" /> Hard-Fail Override Conditions
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
            These conditions trigger an automatic rejection regardless of the aggregate score. They represent definitive fraud signals.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { label: 'Virtual Camera Detected', desc: 'OBS, ManyCam, or other virtual camera software detected in device camera list', icon: Scan },
              { label: 'rPPG Liveness Failure', desc: 'Heart rate signal returned 0 BPM across the entire 15-second video sample', icon: AlertTriangle },
              { label: 'Persistence Paradox', desc: 'Face mesh landmarks persist above 90% during confirmed physical hand occlusion', icon: Brain },
              { label: 'Duplicate Device ID', desc: 'Same device fingerprint attempting 3+ KYC registrations within 24 hours', icon: Fingerprint },
              { label: 'Duplicate ID Number', desc: 'Citizenship/Passport number already registered to an existing verified account', icon: FileSearch },
              { label: 'Face Match Failure', desc: 'AdaFace 1:1 embedding comparison returns similarity below 40% threshold', icon: Scan },
            ].map((cond, i) => (
              <div key={i} style={{ padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <cond.icon size={14} color="var(--red)" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cond.label}</span>
                  </div>
                  <Toggle value={hardFails[i]} onChange={() => toggleHardFail(i)} />
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
