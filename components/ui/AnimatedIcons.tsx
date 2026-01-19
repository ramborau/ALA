import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const transition = {
  duration: 0.6,
  ease: "easeInOut"
};

export const AnimatedUser: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.circle 
      cx="12" cy="7" r="4" 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...transition, delay: 0.1 }}
    />
    <motion.path 
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ ...transition, delay: 0.3 }}
    />
  </svg>
);

export const AnimatedLayoutGrid: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => {
  const rectVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.rect width="7" height="7" x="3" y="3" rx="1" custom={0} variants={rectVariants} initial="hidden" animate="visible" />
      <motion.rect width="7" height="7" x="14" y="3" rx="1" custom={1} variants={rectVariants} initial="hidden" animate="visible" />
      <motion.rect width="7" height="7" x="14" y="14" rx="1" custom={2} variants={rectVariants} initial="hidden" animate="visible" />
      <motion.rect width="7" height="7" x="3" y="14" rx="1" custom={3} variants={rectVariants} initial="hidden" animate="visible" />
    </svg>
  );
};

export const AnimatedZap: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.polygon 
      points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
      animate={{ pathLength: 1, opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5,
        ease: "backOut",
        pathLength: { duration: 0.6, ease: "easeInOut" }
      }}
      style={{ originX: '50%', originY: '50%' }}
    />
  </svg>
);

export const AnimatedLifeBuoy: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "backOut" }}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <motion.path d="m4.93 4.93 4.24 4.24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4 }} />
    <motion.path d="m14.83 14.83 4.24 4.24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
    <motion.path d="m14.83 9.17 4.24-4.24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
    <motion.path d="m14.83 9.17 4.24-4.24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
    <motion.path d="m9.17 14.83-4.24 4.24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7 }} />
  </motion.svg>
);

export const AnimatedWallet: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <motion.path 
      d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" 
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path 
      d="M4 6v12c0 1.1.9 2 2 2h14v-4" 
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    <motion.path 
      d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5, type: 'spring' }}
      style={{ originX: '50%', originY: '50%' }}
    />
  </svg>
);

export const AnimatedLayers: React.FC<IconProps> = ({ size = 24, color = "currentColor", className = "" }) => {
  const variants = {
    hidden: { y: 10, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "backOut"
      }
    })
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path 
        d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" 
        custom={0} variants={variants} initial="hidden" animate="visible"
      />
      <motion.path 
        d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" 
        custom={2} variants={variants} initial="hidden" animate="visible"
      />
      <motion.path 
        d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" 
        custom={1} variants={variants} initial="hidden" animate="visible"
      />
    </svg>
  );
};
