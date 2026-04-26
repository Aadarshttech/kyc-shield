import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import LiveQueue from './LiveQueue';
import CaseReview from './CaseReview';
import RejectedPage from './RejectedPage';
import ApprovedPage from './ApprovedPage';
import AuditLogs from './AuditLogs';
import SettingsPage from './SettingsPage';

const initialApplications = [
  { id: 1, name: 'Ramesh Adhikari', fatherName: 'Hari Adhikari', grandfatherName: 'Shiva Adhikari', dob: '1992-05-14', gender: 'Male', idNumber: '14-01-72-00123', contactNumber: '9841234567', occupation: 'Software Engineer', permanentAddress: 'Kathmandu, Bagmati', currentAddress: 'Lalitpur, Bagmati', docType: 'Citizenship', time: '2 min ago', score: 15, risk: 'Low', avatar: 'RA', status: 'pending', v1: 12, v2: 18, v3: 10, caseStatus: 'clean' },
  { id: 2, name: 'Sita Sharma', fatherName: 'Ram Sharma', grandfatherName: 'Gopal Sharma', dob: '1995-11-20', gender: 'Female', idNumber: '0834215', contactNumber: '9812345678', occupation: 'Teacher', permanentAddress: 'Pokhara, Gandaki', currentAddress: 'Kathmandu, Bagmati', docType: 'Passport', time: '5 min ago', score: 82, risk: 'High', avatar: 'SS', status: 'pending', v1: 72, v2: 88, v3: 80, caseStatus: 'fraud' },
  { id: 3, name: 'Bikash Thapa', fatherName: 'Krishna Thapa', grandfatherName: 'Bishnu Thapa', dob: '1988-03-08', gender: 'Male', idNumber: 'NID-987654321', contactNumber: '9801122334', occupation: 'Business', permanentAddress: 'Dharan, Koshi', currentAddress: 'Dharan, Koshi', docType: 'National ID (NID)', time: '8 min ago', score: 48, risk: 'Medium', avatar: 'BT', status: 'pending', v1: 40, v2: 52, v3: 45, caseStatus: 'suspicious' },
  { id: 4, name: 'Priya Maharjan', fatherName: 'Suman Maharjan', grandfatherName: 'Prakash Maharjan', dob: '1998-07-25', gender: 'Female', idNumber: 'DL-BA-45', contactNumber: '9865544332', occupation: 'Student', permanentAddress: 'Bhaktapur, Bagmati', currentAddress: 'Bhaktapur, Bagmati', docType: 'Driving Licence', time: '12 min ago', score: 22, risk: 'Low', avatar: 'PM', status: 'pending', v1: 18, v2: 25, v3: 20, caseStatus: 'clean' },
  { id: 5, name: 'Deepak Gurung', fatherName: 'Amrit Gurung', grandfatherName: 'Sunil Gurung', dob: '1985-09-12', gender: 'Male', idNumber: 'VID-54321', contactNumber: '9844455566', occupation: 'Army', permanentAddress: 'Gorkha, Gandaki', currentAddress: 'Kathmandu, Bagmati', docType: 'Voter ID', time: '15 min ago', score: 91, risk: 'Critical', avatar: 'DG', status: 'pending', v1: 78, v2: 98, v3: 88, caseStatus: 'fraud' },
  { id: 6, name: 'Anjali Rai', fatherName: 'Rajesh Rai', grandfatherName: 'Kumar Rai', dob: '2001-02-18', gender: 'Female', idNumber: '05-02-76-112', contactNumber: '9811122233', occupation: 'Nurse', permanentAddress: 'Ilam, Koshi', currentAddress: 'Lalitpur, Bagmati', docType: 'Citizenship', time: '18 min ago', score: 8, risk: 'Low', avatar: 'AR', status: 'pending', v1: 6, v2: 10, v3: 5, caseStatus: 'clean' },
  { id: 7, name: 'Krishna Bhandari', fatherName: 'Rameshwar Bhandari', grandfatherName: 'Tulsi Bhandari', dob: '1990-12-05', gender: 'Male', idNumber: '0987654', contactNumber: '9851099887', occupation: 'Banker', permanentAddress: 'Butwal, Lumbini', currentAddress: 'Kathmandu, Bagmati', docType: 'Passport', time: '22 min ago', score: 55, risk: 'Medium', avatar: 'KB', status: 'pending', v1: 45, v2: 62, v3: 50, caseStatus: 'suspicious' },
];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('queue');
  const [selectedId, setSelectedId] = useState(null);
  const [apps, setApps] = useState(initialApplications);

  const pendingApps = apps.filter(a => a.status === 'pending');
  const approvedApps = apps.filter(a => a.status === 'approved');
  const rejectedApps = apps.filter(a => a.status === 'rejected');

  const counts = {
    queue: pendingApps.length.toString(),
    approved: approvedApps.length.toString(),
    rejected: rejectedApps.length.toString(),
  };

  const handleDecision = (id, decision) => {
    setApps(apps.map(app => app.id === id ? { ...app, status: decision } : app));
    setSelectedId(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar activeNav={activeNav} onNavChange={(id) => { setActiveNav(id); setSelectedId(null); }} counts={counts} />
      <div className="admin-main">
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Main Panel */}
          <div style={{
            flex: selectedId && activeNav === 'queue' ? '0 0 50%' : '1',
            padding: '28px 32px',
            overflowY: 'auto',
            transition: 'flex 0.3s ease',
          }}>
            {activeNav === 'queue' && (
              <LiveQueue 
                applications={pendingApps} 
                selectedId={selectedId} 
                onSelect={(id) => setSelectedId(id === selectedId ? null : id)} 
              />
            )}
            {activeNav === 'approved' && <ApprovedPage approvedApps={approvedApps} />}
            {activeNav === 'rejected' && <RejectedPage rejectedApps={rejectedApps} />}
            {activeNav === 'logs' && <AuditLogs />}
            {activeNav === 'settings' && <SettingsPage />}
          </div>

          {/* Case Review Panel */}
          <AnimatePresence>
            {selectedId && activeNav === 'queue' && (
              <div style={{ flex: '0 0 50%' }}>
                <CaseReview 
                  key={selectedId} 
                  data={apps.find(a => a.id === selectedId)} 
                  onClose={() => setSelectedId(null)}
                  onDecision={(decision) => handleDecision(selectedId, decision)}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
