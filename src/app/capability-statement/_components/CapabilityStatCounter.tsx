'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberTicker } from '@/components/ui/number-ticker';

export function CapabilityStatCounter() {
  const [tickerComplete, setTickerComplete] = useState(false);

  return (
    <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50/80 px-6 py-4">
      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-base font-medium text-gray-700">
          Capability statements generated
        </p>
        <NumberTicker
          value={74}
          className="text-4xl font-bold !text-[#FF8C32]"
          onComplete={() => setTickerComplete(true)}
        />
        <AnimatePresence>
          {tickerComplete && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-500"
            >
              4 today
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
