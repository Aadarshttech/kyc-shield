import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Maximize, Minimize } from 'lucide-react';
import ViewToggle from './components/ViewToggle';
import PhoneFrame from './components/user/PhoneFrame';
import SplashScreen from './components/user/SplashScreen';
import WelcomeStep from './components/user/WelcomeStep';
import DocumentSelectStep from './components/user/DocumentSelectStep';
import DocumentScanStep from './components/user/DocumentScanStep';
import LiveVideoStep from './components/user/LiveVideoStep';
import ProcessingStep from './components/user/ProcessingStep';
import OcclusionTestStep from './components/user/OcclusionTestStep';
import FaceMatchStep from './components/user/FaceMatchStep';
import FormFillStep from './components/user/FormFillStep';
import AdminDashboard from './components/admin/AdminDashboard';

function UserFlow() {
  const [step, setStep] = useState(0);

  const nextStep = useCallback(() => setStep(s => s + 1), []);
  const prevStep = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
  const restart = useCallback(() => setStep(0), []);

  const renderStep = () => {
    switch (step) {
      case 0: return <SplashScreen onNext={nextStep} />;
      case 1: return <WelcomeStep onNext={nextStep} onBack={prevStep} />;
      case 2: return <DocumentSelectStep onNext={nextStep} onBack={prevStep} />;
      case 3: return <DocumentScanStep onNext={nextStep} onBack={prevStep} />;
      case 4: return <LiveVideoStep onNext={nextStep} onBack={prevStep} />;
      case 5: return <OcclusionTestStep onNext={nextStep} onBack={prevStep} />;
      case 6: return <FaceMatchStep onNext={nextStep} onBack={prevStep} />;
      case 7: return <FormFillStep onNext={nextStep} onBack={prevStep} />;
      case 8: return <ProcessingStep onRestart={restart} />;
      default: return <SplashScreen onNext={nextStep} />;
    }
  };

  return (
    <PhoneFrame step={step}>
      {renderStep()}
    </PhoneFrame>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('user');
  const [theme, setTheme] = useState('light');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      position: 'relative',
      transition: 'background var(--transition-base)',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: theme === 'dark' 
          ? `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <ViewToggle 
        currentView={currentView} 
        onToggle={setCurrentView} 
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        isFullscreen={isFullscreen}
        onFullscreenToggle={toggleFullscreen}
      />





      <AnimatePresence mode="wait">
        {currentView === 'user' ? (
          <motion.div
            key="user"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserFlow />
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
