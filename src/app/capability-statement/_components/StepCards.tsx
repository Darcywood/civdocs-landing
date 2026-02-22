'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: 1,
    title: 'Answer 12 questions',
    desc: 'Business basics, projects, and portfolio — all tailored for civil contractors.',
  },
  {
    num: 2,
    title: 'Upload logo & photos',
    desc: 'Add your branding and project images for a polished result.',
  },
  {
    num: 3,
    title: 'We generate + email your PDF',
    desc: 'Get a clean, professional PDF delivered to your inbox.',
  },
];

export default function StepCards() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-3">
      {STEPS.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.4,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C32]/10 text-lg font-bold text-[#FF8C32]">
            {step.num}
          </span>
          <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
