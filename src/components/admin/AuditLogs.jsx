import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Clock, Shield, CheckCircle2, XCircle, AlertTriangle,
  Download, Search, Filter, ChevronRight, User
} from 'lucide-react';

const logs = [
  { id: 'AUD-0047', action: 'APPLICATION_APPROVED', user: 'Ramesh Adhikari', officer: 'Auto-Approve', time: '2 min ago', score: 15, icon: CheckCircle2, color: 'var(--green)' },
  { id: 'AUD-0046', action: 'APPLICATION_FLAGGED', user: 'Sita Sharma', officer: 'System', time: '5 min ago', score: 42, icon: AlertTriangle, color: 'var(--yellow)' },
  { id: 'AUD-0045', action: 'APPLICATION_REJECTED', user: 'Unknown #4412', officer: 'Auto-Reject', time: '14 min ago', score: 98, icon: XCircle, color: 'var(--red)' },
  { id: 'AUD-0044', action: 'MANUAL_OVERRIDE', user: 'Bikash Thapa', officer: 'Suman K.', time: '32 min ago', score: 85, icon: Shield, color: 'var(--purple)' },
  { id: 'AUD-0043', action: 'APPLICATION_APPROVED', user: 'Priya Maharjan', officer: 'Auto-Approve', time: '45 min ago', score: 22, icon: CheckCircle2, color: 'var(--green)' },
  { id: 'AUD-0042', action: 'APPLICATION_REJECTED', user: 'Hari Prasad K.', officer: 'Auto-Reject', time: '1 hr ago', score: 92, icon: XCircle, color: 'var(--red)' },
  { id: 'AUD-0041', action: 'THRESHOLD_UPDATED', user: '—', officer: 'Suman K.', time: '2 hrs ago', score: null, icon: Shield, color: 'var(--cyan)' },
  { id: 'AUD-0040', action: 'APPLICATION_APPROVED', user: 'Anjali Rai', officer: 'Auto-Approve', time: '2 hrs ago', score: 8, icon: CheckCircle2, color: 'var(--green)' },
  { id: 'AUD-0039', action: 'APPLICATION_REJECTED', user: 'Unknown #7783', officer: 'Auto-Reject', time: '3 hrs ago', score: 88, icon: XCircle, color: 'var(--red)' },
  { id: 'AUD-0038', action: 'REPORT_EXPORTED', user: '—', officer: 'Suman K.', time: '4 hrs ago', score: null, icon: Download, color: 'var(--cyan)' },
];

function getActionBadge(action) {
  switch (action) {
    case 'APPLICATION_APPROVED': return { bg: 'var(--green-dim)', color: 'var(--green)', label: 'APPROVED' };
    case 'APPLICATION_REJECTED': return { bg: 'var(--red-dim)', color: 'var(--red)', label: 'REJECTED' };
    case 'APPLICATION_FLAGGED': return { bg: 'var(--yellow-dim)', color: 'var(--yellow)', label: 'FLAGGED' };
    case 'MANUAL_OVERRIDE': return { bg: 'var(--purple-dim)', color: 'var(--purple)', label: 'OVERRIDE' };
    case 'THRESHOLD_UPDATED': return { bg: 'var(--cyan-dim)', color: 'var(--cyan)', label: 'CONFIG' };
    case 'REPORT_EXPORTED': return { bg: 'var(--cyan-dim)', color: 'var(--cyan)', label: 'EXPORT' };
    default: return { bg: 'var(--bg-glass)', color: 'var(--text-muted)', label: action };
  }
}

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(l =>
    l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Audit Logs
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
            NRB-compliant immutable audit trail (AES-256 encrypted)
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            <Download size={14} />
            Export CSV
          </button>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            <FileText size={14} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 16px', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
        }}>
          <Search size={16} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Search by ID, user, or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text-primary)', fontSize: '0.82rem', width: '100%',
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 16px', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-glass)', border: '1px solid var(--border-glass)',
          color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500,
          cursor: 'pointer', fontFamily: "'Inter', sans-serif",
        }}>
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* Log Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Action</th>
              <th>Applicant</th>
              <th>Performed By</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const badge = getActionBadge(log.action);
              return (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {log.id}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      background: badge.bg, color: badge.color,
                      fontSize: '0.7rem', fontWeight: 600,
                    }}>
                      <log.icon size={11} />
                      {badge.label}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <User size={14} color="var(--text-dim)" />
                      <span style={{ fontSize: '0.82rem' }}>{log.user}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{log.officer}</span>
                  </td>
                  <td>
                    {log.score !== null ? (
                      <span className="mono" style={{
                        fontSize: '0.82rem', fontWeight: 600,
                        color: log.score >= 70 ? 'var(--red)' : log.score >= 40 ? 'var(--yellow)' : 'var(--green)',
                      }}>
                        {log.score}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} color="var(--text-dim)" />
                      {log.time}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 16, padding: '12px 0',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          Showing {filtered.length} of {logs.length} entries
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Shield size={12} color="var(--green)" />
          All records are cryptographically signed and immutable
        </div>
      </div>
    </div>
  );
}
