import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, BatteryFull, Signal } from 'lucide-react';

const pageVariants = {
  enter: { opacity: 0, x: 60, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.97 },
};

export default function PhoneFrame({ step, children }) {
  return (
    <div className="phone-container">
      <div className="phone-bg-glow" />
      
      <div className="phone-frame">
        {/* Notch */}
        <div className="phone-notch" />
        
        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Signal size={13} />
            <Wifi size={13} />
            <BatteryFull size={15} />
          </div>
        </div>
        
        {/* Content Area */}
        <div className="phone-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Home Indicator */}
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}
