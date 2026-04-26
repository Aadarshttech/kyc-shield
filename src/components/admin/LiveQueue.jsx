import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Users,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

// applications passed down from parent

function getRiskStyle(risk) {
  switch (risk) {
    case 'Low':
      return { bg: 'var(--green-dim)', color: 'var(--green)', border: 'rgba(0,255,135,0.2)' };
    case 'Medium':
      return { bg: 'var(--yellow-dim)', color: 'var(--yellow)', border: 'rgba(251,191,36,0.2)' };
    case 'High':
      return { bg: 'var(--red-dim)', color: 'var(--red)', border: 'rgba(255,75,75,0.2)' };
    case 'Critical':
      return { bg: 'var(--red-dim)', color: 'var(--red)', border: 'rgba(255,75,75,0.3)' };
    default:
      return { bg: 'var(--bg-glass)', color: 'var(--text-muted)', border: 'var(--border-glass)' };
  }
}

function getAvatarGradient(name) {
  const colors = [
    ['#10b981', '#059669'],
    ['#3b82f6', '#2563eb'],
    ['#8b5cf6', '#7c3aed'],
    ['#f59e0b', '#d97706'],
    ['#ef4444', '#dc2626'],
    ['#06b6d4', '#0891b2'],
    ['#ec4899', '#db2777'],
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[idx][0]}, ${colors[idx][1]})`;
}

export default function LiveQueue({ applications, selectedId, onSelect }) {
  const [search, setSearch] = useState('');
  const filtered = applications.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.docType.toLowerCase().includes(search.toLowerCase()) ||
    a.risk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Live Queue
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
            Real-time KYC application monitoring
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="badge badge-cyan">
            <Users size={12} />
            Total: {applications.length}
          </div>
          <div className="badge badge-yellow">
            <Clock size={12} />
            Pending: {applications.length}
          </div>
          <div className="badge badge-red">
            <ShieldAlert size={12} />
            Flagged: {applications.filter(a => a.risk === 'High' || a.risk === 'Critical').length}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginBottom: 20,
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
        }}>
          <Search size={16} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: '0.82rem', width: '100%',
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-glass)',
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
        }}>
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Document Type</th>
              <th>Submitted</th>
              <th>Fraud Risk Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app, i) => {
              const riskStyle = getRiskStyle(app.risk);
              const isSelected = selectedId === app.id;
              const isHighRisk = app.risk === 'High' || app.risk === 'Critical';

              return (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onSelect(app.id)}
                  className={isSelected ? 'selected' : ''}
                  style={{
                    background: isSelected
                      ? 'rgba(0, 242, 254, 0.04)'
                      : undefined,
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34,
                        height: 34,
                        borderRadius: 'var(--radius-full)',
                        background: getAvatarGradient(app.name),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}>
                        {app.avatar}
                      </div>
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                        {app.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem' }}>{app.docType}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem' }}>
                      <Clock size={13} color="var(--text-dim)" />
                      {app.time}
                    </div>
                  </td>
                  <td>
                    <motion.div
                      animate={isHighRisk ? { opacity: [0.7, 1, 0.7] } : {}}
                      transition={isHighRisk ? { duration: 2, repeat: Infinity } : {}}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: riskStyle.bg,
                        border: `1px solid ${riskStyle.border}`,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: riskStyle.color,
                      }}
                    >
                      {isHighRisk ? (
                        <AlertTriangle size={12} />
                      ) : (
                        <ShieldCheck size={12} />
                      )}
                      <span className="mono">{app.score}</span>
                      <span>— {app.risk} Risk</span>
                    </motion.div>
                  </td>
                  <td>
                    <ChevronRight size={16} color="var(--text-dim)" />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
