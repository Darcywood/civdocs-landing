'use client';

import { motion } from 'framer-motion';

const ITEMS = [
  {
    title: 'Company overview',
    desc: 'Your business details, regions, and delivery type — clearly positioned upfront.',
  },
  {
    title: 'Core capabilities',
    desc: 'Your services laid out in a way tender reviewers can scan and understand quickly.',
  },
  {
    title: 'Project experience',
    desc: 'Relevant projects with scope, client type, and outcomes — not vague summaries.',
  },
  {
    title: 'Plant & equipment',
    desc: 'Machinery and assets listed clearly to demonstrate capacity and scale.',
  },
  {
    title: 'Key personnel',
    desc: 'Key team members, roles, and experience that support delivery confidence.',
  },
  {
    title: 'Compliance snapshot',
    desc: 'Licences, certifications, and insurance shown at a glance for compliance checks.',
  },
];

export default function IncludedItems() {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2">
      <div className="space-y-6">
        {ITEMS.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="space-y-6">
        {ITEMS.slice(3, 6).map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.4,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
