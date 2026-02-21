'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FancySpinner from '@/components/fancyspinner/FancySpinner';

interface GenerationLoadingModalProps {
  isOpen: boolean;
  isComplete?: boolean;
}

const TARGET_DURATION_MS = 45000;
const PROGRESS_INTERVAL_MS = 300;

export default function GenerationLoadingModal({ isOpen, isComplete = false }: GenerationLoadingModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    if (isComplete) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / TARGET_DURATION_MS, 0.95);
      const eased = 1 - Math.pow(1 - rawProgress, 1.5);
      setProgress(Math.round(eased * 100));
    }, PROGRESS_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isOpen, isComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <FancySpinner
          size="md"
          showOverlay={false}
          message={isComplete ? 'Done!' : 'Building your capability statement'}
        />
        <div className="mt-[280px] w-64">
          <div className="mb-2 flex justify-between text-sm text-white">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
