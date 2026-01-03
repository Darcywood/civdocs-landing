'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface QuestionCategory {
  title: string;
  questions: string[];
}

const categories: QuestionCategory[] = [
  {
    title: 'Project & Scope Questions',
    questions: [
      'What projects do we have?',
      'Show me all projects for our organization',
      'Find the project called Pakenham',
      'What are the scopes for the Yarra Valley Winery project?',
      'Show me all scopes for project X',
      'How far along are we with the scopes on Pakenham?',
      'What\'s the progress on all scopes for this project?',
      'Give me a rundown of the 500M Agi Install scope',
      'Show me scope progress for ML4',
      'What\'s the status of scope X?',
      'How many hours have been logged on project Y?',
      'Show me all hours for the Cranbourne Car Park job this month',
      'Break down hours for Project X by employee',
      'How many hours on the 6000 T Class 3 install scope?',
      'Break down hours for scope ML5 last week',
      'Which employees worked on scope X?',
      'Show me hours per day for scope 1 this month',
      'What cost codes were used on scope X?',
      'What plant was used on this scope?',
      'What equipment was used on scope ML4?',
    ],
  },
  {
    title: 'Financial & Budget Questions',
    questions: [
      'What\'s the budget vs actual for Pakenham?',
      'Show me budget status for project X',
      'Are we over budget on this project?',
      'What\'s the budget variance for Yarra Valley?',
      'Show me cost code totals for project X',
      'What\'s the cost breakdown by cost code for this project?',
      'How much have we spent on labour vs materials vs plant?',
      'Show me the project financial summary for Pakenham',
      'What\'s the total cost breakdown for this project?',
      'How much have we spent on this project?',
      'Show me organization financial summary for last month',
      'Which projects are costing the most?',
      'How much have we spent on machines vs labour across the business?',
      'Show me company-wide financial summary',
      'What\'s the total labour cost this week?',
    ],
  },
  {
    title: 'Cost Code Questions',
    questions: [
      'What cost codes do we have?',
      'List all our cost codes',
      'Show me cost codes for our organization',
      'What\'s the budget vs actual breakdown by cost code for Pakenham?',
      'Show me cost code summary for project X',
      'How are we tracking on cost codes for this project?',
      'What\'s the variance by cost code?',
      'Show me hours by cost code for last month',
      'What\'s the labour cost by cost code?',
      'Show me total hours by cost code',
    ],
  },
  {
    title: 'Productivity & Forecasting Questions',
    questions: [
      'Show me quantity installed vs hours spent for scope X',
      'What\'s the productivity per hour for scope ML4?',
      'How many hours are forecasted to complete the remaining quantity?',
      'Show me daily productivity for scope X this month',
      'What does AGI cost per metre?',
      'What\'s the cost per unit for this scope?',
      'Show me cost per metre for DRN',
      'What\'s the internal cost per tonne?',
      'Simulate a quote for 500 metres of AGI with 20% margin',
      'What should I quote for 1000m of this work?',
      'Quote a driveway that\'s 30m long, 3m wide, and 150mm thick',
      'Calculate a driveway quote with dimensions',
      'What are our org-wide unit cost benchmarks?',
      'Show me average cost per metre overall',
      'What does this type of work normally cost us?',
    ],
  },
  {
    title: 'Employee & Labour Questions',
    questions: [
      'Show me all employees',
      'Who works for us?',
      'How many hours has Jake worked this month?',
      'What projects has Darcy Wood worked on?',
      'Show me Darcy\'s hours last week by project',
      'Which days did John work overtime this month?',
      'List missing timesheets for Tom between 1st and 14th',
      'Show all employees and their hours this month',
      'Who worked the most in October?',
      'Give me a payroll summary for last week',
      'Show all employees and how many hours they worked this month - rank them highest to lowest',
      'What\'s the cost impact of each employee?',
      'Show me labour costs by employee',
      'Who worked the most hours this week?',
      'Compare operator utilisation for this week',
    ],
  },
  {
    title: 'Timesheet Questions',
    questions: [
      'Show me missing timesheets',
      'Who didn\'t submit timesheets?',
      'Missing timesheets for the last 2 weeks',
      'Show me timesheet gaps for project X',
      'What days are missing timesheets?',
      'Show me daily timesheet summary for last week',
      'Who worked each day this month?',
      'Show me timesheet activity by day',
      'What timesheets are missing for compliance?',
      'Show me timesheet gaps across all projects',
    ],
  },
  {
    title: 'Machine & Plant Questions',
    questions: [
      'What are our machine hire rates?',
      'Show me all machine hire rates',
      'What\'s the hourly or daily rate for machines?',
      'How much revenue has each machine generated?',
      'Which machines earned the most this month?',
      'Show me machine revenue breakdown',
      'What\'s the total plant hire revenue this month?',
      'How much have we made from plant hire?',
      'Show me machine utilisation for GRD-019',
      'Which machines need service?',
    ],
  },
  {
    title: 'Comparison & Analysis Questions',
    questions: [
      'Compare Pakenham to Clyde North',
      'Which job is performing better?',
      'Show me project comparison side by side',
      'What\'s driving the cost overrun on this project?',
      'Which work types are most profitable?',
    ],
  },
];

export default function CrankAICheatSheetPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = async (question: string, categoryIndex: number, questionIndex: number) => {
    const uniqueId = `${categoryIndex}-${questionIndex}`;
    try {
      await navigator.clipboard.writeText(question);
      setCopiedIndex(uniqueId);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FFFEFB] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                Crank.ai Cheat Sheet
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight tracking-tight mb-4 text-center">
              100 Questions for Crank AI
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto text-center">
              Click any question to copy it to your clipboard, then paste it into Crank AI for instant answers about your projects.
            </p>
          </div>
        </section>

        {/* Questions Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="space-y-16">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E1E1E] mb-8 tracking-tight">
                    {category.title} ({categoryIndex === 0 ? '1-20' : categoryIndex === 1 ? '21-35' : categoryIndex === 2 ? '36-45' : categoryIndex === 3 ? '46-60' : categoryIndex === 4 ? '61-75' : categoryIndex === 5 ? '76-85' : categoryIndex === 6 ? '86-95' : '96-100'})
                  </h2>

                  {/* Questions Grid */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="space-y-2">
                      {category.questions.map((question, questionIndex) => {
                        const uniqueId = `${categoryIndex}-${questionIndex}`;
                        const isCopied = copiedIndex === uniqueId;
                        
                        return (
                          <button
                            key={questionIndex}
                            onClick={() => copyToClipboard(question, categoryIndex, questionIndex)}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                              isCopied
                                ? 'bg-[#FF8C32] border-[#FF8C32] text-white'
                                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#FF8C32] hover:text-[#FF8C32]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <span className={`text-base leading-relaxed flex-1 ${
                                isCopied ? 'text-white' : 'text-gray-700'
                              }`}>
                                {question}
                              </span>
                              {isCopied && (
                                <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


