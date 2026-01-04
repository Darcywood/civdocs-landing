'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FancySpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showOverlay?: boolean;
  message?: string;
}

const sizeMap = {
  sm: 120,
  md: 180,
  lg: 240,
};

export default function FancySpinner({ 
  size = 'md', 
  showOverlay = true,
  message = 'Getting your org setup...'
}: FancySpinnerProps) {
  const spinnerSize = sizeMap[size];

  return (
    <>
      {/* Dark overlay with backdrop blur */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <SpinnerContent size={spinnerSize} />
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-6 text-white text-lg font-medium"
              >
                <AnimatedEllipsis baseText={message} />
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!showOverlay && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
          <SpinnerContent size={spinnerSize} />
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-6 text-white text-lg font-medium"
            >
              <AnimatedEllipsis baseText={message} />
            </motion.p>
          )}
        </div>
      )}
    </>
  );
}

function AnimatedEllipsis({ baseText }: { baseText: string }) {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '.';
      });
    }, 500); // Change every 500ms

    return () => clearInterval(interval);
  }, []);

  // Remove trailing dots/ellipsis from baseText if present
  const textWithoutEllipsis = baseText.replace(/\.+$/, '').trim();

  return (
    <>
      {textWithoutEllipsis}
      <span className="inline-block w-6 text-left">{dots}</span>
    </>
  );
}

function SpinnerContent({ size }: { size: number }) {
  // Calculate offset for cog halves - how far apart they start
  const cogOffset = size * 0.5;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Paper icon - MUST stay perfectly centered, NEVER rotate, sibling of cog wrapper */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 20 }}
      >
        <Image
          src="/John Smith/whitepaper.png"
          alt=""
          width={size * 0.68}
          height={size * 0.68}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Rotating cog wrapper - rotates as ONE unit AFTER assembly */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          rotate: {
            duration: 1.8,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.6,
          },
        }}
        className="absolute inset-0"
        style={{ zIndex: 10 }}
      >
        {/* Left cog half - full size, slides in from left to center */}
        <motion.div
          initial={{ x: -cogOffset }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.45,
            ease: 'easeOut',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              scale: {
                duration: 0.15,
                times: [0, 0.5, 1],
                delay: 0.45,
              },
            }}
            style={{ width: size, height: size }}
          >
            <Image
              src="/realfancyspinner/left.png"
              alt=""
              width={size}
              height={size}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right cog half - full size, slides in from right to center */}
        <motion.div
          initial={{ x: cogOffset }}
          animate={{ x: 0 }}
          transition={{
            duration: 0.45,
            ease: 'easeOut',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              scale: {
                duration: 0.15,
                times: [0, 0.5, 1],
                delay: 0.45,
              },
            }}
            style={{ width: size, height: size }}
          >
            <Image
              src="/realfancyspinner/right.png"
              alt=""
              width={size}
              height={size}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

