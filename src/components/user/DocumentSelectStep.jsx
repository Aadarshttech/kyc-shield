import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, FileText, CreditCard, UserSquare2, Car } from 'lucide-react';

const docs = [
  { id: 'citizenship', label: 'Citizenship Certificate', icon: UserSquare2, desc: 'Nepali Nagarikta Praman Patra' },
  { id: 'nid', label: 'National ID (NID)', icon: CreditCard, desc: 'Biometric Smart Card' },
  { id: 'passport', label: 'Passport', icon: FileText, desc: 'International travel document' },
  { id: 'license', label: 'Driving Licence', icon: Car, desc: 'Smart driving license' },
  { id: 'voter', label: 'Voter ID', icon: CreditCard, desc: 'Electoral photo identity' },
];

export default function DocumentSelectStep({ onNext, onBack }) {
  const [selected, setSelected] = useState('citizenship');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, marginTop: 12 }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-full)',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', paddingRight: 36 }}>
          Document Type
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: 4, paddingBottom: 16 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Select Document</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32, lineHeight: 1.5 }}>
          Choose the type of official document you want to use for verification.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {docs.map((doc) => {
            const isSelected = selected === doc.id;
            return (
              <motion.button
                key={doc.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(doc.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-lg)',
                  background: isSelected ? 'var(--green-dim)' : 'transparent',
                  border: `2px solid ${isSelected ? 'var(--green)' : 'var(--border-glass)'}`,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  width: 40, height: 40, 
                  borderRadius: 'var(--radius-md)', 
                  background: isSelected ? 'var(--green)' : 'rgba(120,120,120,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: 16,
                  color: isSelected ? '#000' : 'var(--text-dim)'
                }}>
                  <doc.icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.05rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {doc.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {doc.desc}
                  </div>
                </div>
                {isSelected && (
                  <div style={{ 
                    width: 24, height: 24, 
                    borderRadius: '50%', 
                    background: 'var(--green)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#000'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ paddingBottom: 24 }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onNext({ docType: selected })}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
