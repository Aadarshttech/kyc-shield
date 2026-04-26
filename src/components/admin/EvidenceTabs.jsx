import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Scan, Brain, AlertTriangle, XCircle, CheckCircle2, ScanFace, Clock } from 'lucide-react';

const tabs = [
  { id: 'document', label: 'Document', icon: FileSearch, color: 'var(--cyan)' },
  { id: 'biometrics', label: 'Biometrics', icon: Scan, color: 'var(--purple)' },
  { id: 'occlusion', label: 'Occlusion', icon: Brain, color: 'var(--red)' },
  { id: 'facematch', label: 'Face Match', icon: ScanFace, color: 'var(--green)' },
];

function severity(score) {
  if (score >= 70) return 'danger';
  if (score >= 35) return 'warning';
  return 'success';
}
function SevIcon({ score, size = 18 }) {
  if (score >= 70) return <XCircle size={size} style={{ flexShrink: 0, marginTop: 1 }} />;
  if (score >= 35) return <AlertTriangle size={size} style={{ flexShrink: 0, marginTop: 1 }} />;
  return <CheckCircle2 size={size} style={{ flexShrink: 0, marginTop: 1 }} />;
}

// Shared image frame component
function EvidenceImage({ src, label, borderColor = 'var(--border-glass)', overlayItems = [] }) {
  return (
    <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: `2px solid ${borderColor}`, background: '#0a0f18' }}>
      <img src={src} alt={label} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', maxHeight: 220 }} />
      {/* Metadata overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        padding: '20px 12px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Clock size={9} /> Captured just now
        </span>
      </div>
      {overlayItems.map((item, i) => (
        <motion.div
          key={i}
          animate={item.pulse ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            position: 'absolute', ...item.pos,
            background: item.bg || 'rgba(255,75,75,0.15)',
            border: `2px solid ${item.borderColor || 'var(--red)'}`,
            borderRadius: item.radius || 4,
            boxShadow: `0 0 12px ${item.glow || 'var(--red-glow)'}`,
          }}
        />
      ))}
    </div>
  );
}

// ─── DOCUMENT TAB ───
function DocumentTab({ score }) {
  const s = severity(score);
  const elaConf = score >= 70 ? '72%' : score >= 35 ? '38%' : '3%';
  const font = score >= 70 ? 'Mismatch' : score >= 35 ? 'Inconclusive' : 'Consistent';
  const ocr = score >= 50 ? 'Failed' : score >= 35 ? 'Partial' : 'Passed';
  const dup = score >= 70 ? 'Match Found' : 'Clear';

  const headline = score >= 70 ? 'ELA Tampering Detected' : score >= 35 ? 'Minor Document Anomalies' : 'Document Integrity Verified';
  const detail = score >= 70
    ? 'Error Level Analysis shows inconsistent JPEG compression around portrait zone. Font mismatch detected in name field.'
    : score >= 35
      ? 'Slight compression variance detected near text fields. Font metrics marginally outside baseline — requires manual review.'
      : 'ELA scan shows uniform compression. OCR cross-validation passed for both Devanagari and Latin fields.';

  const overlays = score >= 50 ? [
    { pos: { top: '15%', left: '5%', width: '30%', height: '45%' }, pulse: true, borderColor: 'var(--red)', glow: 'var(--red-glow)', bg: 'rgba(255,75,75,0.1)' },
  ] : [];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={`alert-box ${s}`}>
        <SevIcon score={score} />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>{headline}</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>{detail}</div>
        </div>
      </div>

      {/* Document Image */}
      <EvidenceImage
        src={score >= 50 ? '/evidence/tampered_document.png' : '/evidence/document_scan.png'}
        label="Uploaded Document — Citizenship"
        borderColor={score >= 50 ? 'rgba(255,75,75,0.4)' : 'var(--border-glass)'}
        overlayItems={overlays}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'ELA Confidence', value: elaConf, color: score >= 60 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'Font Analysis', value: font, color: score >= 60 ? 'var(--yellow)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'OCR Validation', value: ocr, color: score >= 50 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'Duplicate Check', value: dup, color: score >= 70 ? 'var(--red)' : 'var(--green)' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: 4 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── BIOMETRICS TAB ───
function BiometricsTab({ score }) {
  const s = severity(score);
  const deepfake = score >= 70 ? '94.2%' : score >= 35 ? `${(score * 1.1).toFixed(1)}%` : '2.1%';
  const bpm = score >= 70 ? '0 BPM' : score >= 35 ? '58 BPM' : '72 BPM';
  const blink = score >= 70 ? '0/min' : score >= 35 ? '6/min' : '14/min';
  const thirdMetric = score >= 70
    ? { label: 'GAN Fingerprint', value: 'StyleGAN v2', color: 'var(--yellow)' }
    : { label: 'Blink Rate', value: blink, color: score >= 35 ? 'var(--yellow)' : 'var(--green)' };

  const headline = score >= 70 ? 'No Heartbeat — Virtual Camera Suspected' : score >= 35 ? 'Weak Biometric Signals — Possible Replay' : 'Liveness Confirmed — Natural Heartbeat';
  const detail = score >= 70
    ? 'rPPG analysis found 0 BPM across 15-second sample. EfficientNet-B4 deepfake confidence: 94.2%'
    : score >= 35
      ? `rPPG detected faint ${bpm} signal with irregular waveform. Blink rate below normal at ${blink}. Deepfake model returned ${deepfake}.`
      : 'rPPG detected steady 72 BPM signal. Natural blink rate: 14/min. Skin texture LBP analysis normal.';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={`alert-box ${s}`}>
        <SevIcon score={score} />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>{headline}</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>{detail}</div>
        </div>
      </div>

      {/* Liveness Capture Image */}
      <EvidenceImage
        src={score >= 50 ? '/evidence/suspicious_liveness.png' : '/evidence/liveness_capture.png'}
        label="Live Video Frame — Liveness Detection"
        borderColor={score >= 50 ? 'rgba(255,75,75,0.4)' : 'rgba(0,255,135,0.3)'}
        overlayItems={score >= 70 ? [{ pos: { top: '10%', left: '25%', width: '50%', height: '60%' }, pulse: true, radius: 8, borderColor: 'var(--red)', glow: 'var(--red-glow)', bg: 'rgba(255,75,75,0.08)' }] : []}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Deepfake Score', value: deepfake, color: score >= 60 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'rPPG Signal', value: bpm, color: score >= 70 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          thirdMetric,
        ].map((item, i) => (
          <div key={i} style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 4 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── OCCLUSION TAB ───
function OcclusionTab({ score }) {
  const s = severity(score);
  const landmarkOcc = score >= 70 ? '2.1%' : score >= 35 ? '28.4%' : '62.3%';
  const meshPersist = score >= 70 ? '97.9%' : score >= 35 ? '71.6%' : '37.7%';

  const headline = score >= 70 ? 'Persistence Paradox Flagged' : score >= 35 ? 'Partial Occlusion Anomaly' : 'Occlusion Test Passed';
  const detail = score >= 70
    ? 'Face mesh landmarks remained fully visible during physical hand occlusion. Expected 40%+ occlusion, observed 2.1%.'
    : score >= 35
      ? `Landmark occlusion reached only ${landmarkOcc} during hand prompt (threshold: 40%). Mesh persistence at ${meshPersist}.`
      : 'Hand detected covering nose region. Face mesh landmarks correctly dropped to 38% visibility. Natural occlusion confirmed.';

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={`alert-box ${s}`}>
        <SevIcon score={score} />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>{headline}</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>{detail}</div>
        </div>
      </div>

      {/* Occlusion Capture Image */}
      <EvidenceImage
        src={score >= 50 ? '/evidence/suspicious_occlusion.png' : '/evidence/occlusion_capture.png'}
        label="Occlusion Challenge — Hand-Over-Nose Prompt"
        borderColor={score >= 50 ? 'rgba(255,75,75,0.4)' : 'rgba(0,255,135,0.3)'}
        overlayItems={score >= 70 ? [{ pos: { top: '35%', left: '20%', width: '60%', height: '35%' }, pulse: true, radius: 6, borderColor: 'var(--red)', glow: 'var(--red-glow)', bg: 'rgba(255,75,75,0.08)' }] : []}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Landmark Occlusion', value: landmarkOcc, expected: '≥40%', color: score >= 40 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'Mesh Persistence', value: meshPersist, expected: '≤60%', color: score >= 40 ? 'var(--red)' : score >= 35 ? 'var(--yellow)' : 'var(--green)' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 4 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: 2 }}>Expected: {item.expected}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── FACE MATCH TAB ───
function FaceMatchTab({ v1, v2 }) {
  const avgScore = Math.round((v1 + v2) / 2);
  const similarity = avgScore >= 60 ? '31.4%' : avgScore >= 35 ? '54.8%' : '94.7%';
  const s = severity(avgScore);

  const headline = avgScore >= 60 ? 'Face Mismatch — Identity Substitution' : avgScore >= 35 ? 'Low Confidence Match — Manual Review' : '1:1 Face Match Confirmed';
  const detail = avgScore >= 60
    ? `AdaFace 512-d embedding similarity: ${similarity}. Live face does not match ID card photo.`
    : avgScore >= 35
      ? `AdaFace similarity: ${similarity}. Below optimal threshold (60%). Lighting or angle variation may contribute.`
      : `AdaFace similarity: ${similarity}. Document photo and live capture confirmed as same person.`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={`alert-box ${s}`}>
        <SevIcon score={avgScore} />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>{headline}</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>{detail}</div>
        </div>
      </div>

      {/* Side-by-side: Document Photo vs Live Capture */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8, textAlign: 'center' }}>Document Photo</div>
          <EvidenceImage
            src={avgScore >= 50 ? '/evidence/tampered_document.png' : '/evidence/document_scan.png'}
            label="ID Card — Extracted Face"
            borderColor="var(--cyan)"
          />
        </div>
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8, textAlign: 'center' }}>Live Capture</div>
          <EvidenceImage
            src={avgScore >= 50 ? '/evidence/suspicious_liveness.png' : '/evidence/liveness_capture.png'}
            label="Webcam — Live Frame"
            borderColor={avgScore >= 60 ? 'var(--red)' : avgScore >= 35 ? 'var(--yellow)' : 'var(--green)'}
          />
        </div>
      </div>

      {/* Similarity connector */}
      <div style={{
        textAlign: 'center', padding: '12px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
        <div style={{
          padding: '6px 16px', borderRadius: 'var(--radius-full)',
          background: avgScore >= 60 ? 'var(--red-dim)' : avgScore >= 35 ? 'var(--yellow-dim)' : 'var(--green-dim)',
          border: `1px solid ${avgScore >= 60 ? 'rgba(255,75,75,0.3)' : avgScore >= 35 ? 'rgba(251,191,36,0.3)' : 'rgba(0,255,135,0.3)'}`,
        }}>
          <span className="mono" style={{
            fontSize: '0.9rem', fontWeight: 700,
            color: avgScore >= 60 ? 'var(--red)' : avgScore >= 35 ? 'var(--yellow)' : 'var(--green)',
          }}>
            {similarity} Match
          </span>
        </div>
        <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'Similarity', value: similarity, color: avgScore >= 60 ? 'var(--red)' : avgScore >= 35 ? 'var(--yellow)' : 'var(--green)' },
          { label: 'Model', value: 'AdaFace', color: 'var(--cyan)' },
          { label: 'Threshold', value: '60%', color: 'var(--text-secondary)' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: 4 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN ───
export default function EvidenceTabs({ v1 = 50, v2 = 50, v3 = 50 }) {
  const [activeTab, setActiveTab] = useState('document');
  return (
    <div>
      <div className="tabs" style={{ marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: "'Inter', sans-serif" }}>
            <tab.icon size={14} color={activeTab === tab.id ? tab.color : undefined} />
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {activeTab === 'document' && <DocumentTab key="doc" score={v1} />}
        {activeTab === 'biometrics' && <BiometricsTab key="bio" score={v2} />}
        {activeTab === 'occlusion' && <OcclusionTab key="occ" score={v3} />}
        {activeTab === 'facematch' && <FaceMatchTab key="face" v1={v1} v2={v2} />}
      </AnimatePresence>
    </div>
  );
}
