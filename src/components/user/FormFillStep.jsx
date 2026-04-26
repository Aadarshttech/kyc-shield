import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, UserCircle, Users, MapPin, Briefcase } from 'lucide-react';

// Reusable Input Component
const FormGroup = ({ label, name, value, onChange, type = "text", autoExtracted = false, placeholder = "" }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
      {autoExtracted && <span style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontWeight: 700, padding: '2px 6px', background: 'rgba(0, 242, 254, 0.1)', borderRadius: '4px' }}>AUTO-EXTRACTED</span>}
    </div>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '16px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.2s',
          appearance: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      >
        <option value="" disabled>Select {label}</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    ) : (
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '16px',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--cyan)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />
    )}
  </div>
);

// Section Header Component
const SectionHeader = ({ title, icon: Icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, marginTop: 12 }}>
    <Icon size={18} color="var(--cyan)" />
    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
  </div>
);

export default function FormFillStep({ onNext, onBack }) {
  const [formData, setFormData] = useState({
    fullName: 'Ram Bahadur Thapa', // Auto-extracted
    dob: '1990-01-01',           // Auto-extracted
    gender: 'Male',              // Auto-extracted
    idNumber: '12-34-56-789',    // Auto-extracted
    fatherName: '',
    grandfatherName: '',
    occupation: '',
    contactNumber: '',
    permanentAddress: 'Kathmandu, Bagmati', // Auto-extracted
    currentAddress: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '24px 24px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-primary)',
        zIndex: 10,
      }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'var(--bg-elevated)', 
            border: '1px solid var(--border)', 
            color: 'var(--text-primary)',
            width: 40, height: 40, 
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green)' }}>
           <ShieldCheck size={20} />
           <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>OCR Data Extraction Successful</span>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <div style={{ padding: '24px', flex: 1, overflowY: 'auto', paddingBottom: 100 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          Complete KYC Details
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 24 }}>
          Please review the auto-extracted fields and fill in the remaining mandatory details for your eSewa verification.
        </p>

        {/* Form Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
          {/* 1. Personal Details */}
          <SectionHeader title="Personal Details" icon={UserCircle} />
          <FormGroup label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} autoExtracted />
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <FormGroup label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} autoExtracted />
            </div>
            <div style={{ flex: 1 }}>
              <FormGroup label="Gender" name="gender" type="select" value={formData.gender} onChange={handleChange} autoExtracted />
            </div>
          </div>
          <FormGroup label="Document ID Number" name="idNumber" value={formData.idNumber} onChange={handleChange} autoExtracted />

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0 24px' }} />

          {/* 2. Family Details */}
          <SectionHeader title="Family Details" icon={Users} />
          <FormGroup label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Enter Father's Full Name" />
          <FormGroup label="Grandfather's Name" name="grandfatherName" value={formData.grandfatherName} onChange={handleChange} placeholder="Enter Grandfather's Full Name" />

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0 24px' }} />

          {/* 3. Occupation & Contact */}
          <SectionHeader title="Occupation & Contact" icon={Briefcase} />
          <FormGroup label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="e.g. Student, Engineer, Business" />
          <FormGroup label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} placeholder="e.g. 98XXXXXXXX" />

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0 24px' }} />

          {/* 4. Address Details */}
          <SectionHeader title="Address Details" icon={MapPin} />
          <FormGroup label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} autoExtracted />
          <FormGroup label="Current Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="e.g. Patan, Lalitpur" />

        </div>
      </div>

      {/* Fixed Action Button Container */}
      <div style={{
        padding: '20px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-primary)',
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 20
      }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          style={{
            background: 'var(--cyan)',
            color: '#000',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '24px',
            fontSize: '1.1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 20px rgba(0, 242, 254, 0.4)',
            transition: 'background 0.3s, color 0.3s'
          }}
        >
           Verify Identity
        </motion.button>
      </div>

    </div>
  );
}
