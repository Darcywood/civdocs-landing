'use client';

import { useState } from 'react';
import type { Section2Answers, QuestionAnswer, Question } from '@/lib/risk-assessment/types';
import { GRADER_QUESTIONS, SURVEY_GROUPS } from '@/lib/risk-assessment/graderQuestions';

interface Props {
  onSubmit: (answers: Section2Answers) => void;
  onBack: () => void;
  initial?: Section2Answers;
  /** Override question set (defaults to grader questions) */
  questions?: Question[];
  /** Override survey group order (defaults to grader groups) */
  surveyGroups?: string[];
}

const ANSWER_OPTIONS: { value: QuestionAnswer; label: string; color: string }[] = [
  { value: 'yes', label: 'Yes', color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' },
  { value: 'no', label: 'No', color: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200' },
  { value: 'na', label: 'N/A', color: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200' },
];

const ACTIVE_CLASSES: Record<NonNullable<QuestionAnswer>, string> = {
  yes: 'bg-green-500 text-white border-green-500',
  no: 'bg-red-500 text-white border-red-500',
  na: 'bg-gray-500 text-white border-gray-500',
};

export default function Step3Questions({ onSubmit, onBack, initial, questions: questionsProp, surveyGroups: surveyGroupsProp }: Props) {
  const activeQuestions = questionsProp ?? GRADER_QUESTIONS;
  const activeSurveyGroups = surveyGroupsProp ?? SURVEY_GROUPS;

  const [answers, setAnswers] = useState<Section2Answers>(initial ?? {});
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(activeSurveyGroups.map((g, i) => [g, i === 0]))
  );
  const [showUnanswered, setShowUnanswered] = useState(false);

  function setAnswer(id: string, value: QuestionAnswer) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  function toggleGroup(group: string) {
    setOpenGroups((g) => ({ ...g, [group]: !g[group] }));
  }

  const questionsByGroup = activeSurveyGroups.reduce((acc, group) => {
    acc[group] = activeQuestions.filter((q) => q.surveyGroup === group);
    return acc;
  }, {} as Record<string, Question[]>);

  function groupProgress(group: string) {
    const qs = questionsByGroup[group] ?? [];
    const answered = qs.filter((q) => answers[q.id]).length;
    return { answered, total: qs.length };
  }

  const totalAnswered = activeQuestions.filter((q) => answers[q.id]).length;
  const totalQuestions = activeQuestions.length;
  const unanswered = activeQuestions.filter((q) => !answers[q.id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (unanswered.length > 0) {
      setShowUnanswered(true);
      // Expand groups with unanswered questions
      const groupsWithUnanswered = new Set(unanswered.map((q) => q.surveyGroup));
      setOpenGroups((g) => {
        const next = { ...g };
        groupsWithUnanswered.forEach((gr: string) => { next[gr] = true; });
        return next;
      });
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }
    onSubmit(answers);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Section 2 — Compliance Questions</h2>
        <p className="text-sm text-gray-500">Answer Yes, No, or N/A for each question. Your answers determine which risk treatments appear in the report.</p>
      </div>

      {/* Progress bar */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{totalAnswered} / {totalQuestions} answered</span>
          <span className="text-[#FF8C32] font-semibold">{Math.round((totalAnswered / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full transition-all duration-300"
            style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {showUnanswered && unanswered.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-800 mb-1">
            {unanswered.length} question{unanswered.length > 1 ? 's' : ''} still need{unanswered.length === 1 ? 's' : ''} an answer
          </p>
          <p className="text-xs text-amber-700">Groups with unanswered questions are now expanded. Scroll down to find them.</p>
        </div>
      )}

      {/* Question groups */}
      {activeSurveyGroups.map((group) => {
        const qs = questionsByGroup[group] ?? [];
        const { answered, total } = groupProgress(group);
        const allAnswered = answered === total;
        const hasUnanswered = showUnanswered && answered < total;

        return (
          <div key={group} className={`border rounded-xl overflow-hidden ${hasUnanswered ? 'border-amber-300' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={() => toggleGroup(group)}
              className={`w-full flex items-center justify-between px-5 py-3.5 transition text-left ${hasUnanswered ? 'bg-amber-50 hover:bg-amber-100' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${allAnswered ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {allAnswered ? '✓' : answered}
                </span>
                <span className="text-sm font-semibold text-gray-800">{group}</span>
                <span className="text-xs text-gray-400">{answered}/{total}</span>
              </div>
              <span className="text-gray-400 text-lg">{openGroups[group] ? '−' : '+'}</span>
            </button>

            {openGroups[group] && (
              <div className="divide-y divide-gray-100">
                {qs.map((q) => {
                  const current = answers[q.id];
                  const isUnanswered = showUnanswered && !current;
                  return (
                    <div key={q.id} className={`px-5 py-4 ${isUnanswered ? 'bg-amber-50/40' : ''}`}>
                      <p className="text-sm text-gray-800 mb-1 leading-relaxed">{q.shortLabel}</p>
                      {q.naCondition && (
                        <p className="text-xs text-gray-400 mb-2 italic">{q.naCondition}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        {ANSWER_OPTIONS.filter((o) => o.value !== 'na' || q.allowNA).map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setAnswer(q.id, opt.value)}
                            className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition ${
                              current === opt.value
                                ? ACTIVE_CLASSES[opt.value as NonNullable<QuestionAnswer>]
                                : opt.color
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="flex-1 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
          ← Back
        </button>
        <button type="submit" className="flex-[2] rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all">
          Next: Your Details →
        </button>
      </div>
    </form>
  );
}
