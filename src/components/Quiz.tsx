'use client';
import React from 'react';
import { cloudQuiz } from '@/src/config/cloudQuiz';
import ResultCard from './ResultCard';
import Typewriter from './Typewriter';

export type Answer = { qid: string; oid: string };

type Phase = 'intro' | 'prompt' | 'question' | 'result';

export default function Quiz() {
  const [phase, setPhase] = React.useState<Phase>('intro');
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const total = cloudQuiz.questions.length;

  function nextPrompt() { setPhase('prompt'); }
  function startQuestions() { setPhase('question'); }

  function selectOption(oid: string) {
    const q = cloudQuiz.questions[index];
    const next = [...answers.filter(a => a.qid !== q.id), { qid: q.id, oid }];
    setAnswers(next);

    if (index + 1 < total) {
      setIndex(i => i + 1);
      setPhase('prompt');
    } else {
      setPhase('result');
    }
  }

  function computeScores() {
    const scores: Record<string, number> = {};
    for (const a of answers) {
      const q = cloudQuiz.questions.find(q => q.id === a.qid)!;
      const opt = q.options.find(o => o.id === a.oid)!;
      Object.entries(opt.scores).forEach(([k, v]) => { scores[k] = (scores[k] ?? 0) + v; });
    }
    return scores;
  }

  function winner(scores: Record<string, number>) {
    let bestKey = Object.keys(cloudQuiz.results)[0];
    let best = -Infinity;
    for (const [k, v] of Object.entries(scores)) {
      if (v > best) { best = v; bestKey = k; }
    }
    return bestKey as keyof typeof cloudQuiz.results;
  }

  async function persist(scores: Record<string, number>, result_key: string) {
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: cloudQuiz.id,
          session_id: typeof window !== 'undefined' ? window.crypto?.randomUUID?.() : undefined,
          answers,
          scores,
          result_key,
          user_agent: navigator.userAgent,
        }),
      });
    } catch (e) { /* ignore for UX */ }
  }

  if (phase === 'result') {
    const scores = computeScores();
    const resultKey = winner(scores);
    const result = cloudQuiz.results[resultKey];
    persist(scores, resultKey);
    return <ResultCard answers={answers} resultKey={resultKey} result={result} quizId={cloudQuiz.id} />;
  }

  const q = cloudQuiz.questions[index];
  const progress = Math.round(((index) / total) * 100);

  return (
    <div className="pt-8">
      {phase === 'intro' && (
        <div className="space-y-5">
          <h1 className="text-3xl font-semibold text-sky-700">{cloudQuiz.intro.title}</h1>
          <p className="text-slate-600">{cloudQuiz.intro.lead}</p>
          <button className="btn btn-primary w-full" onClick={nextPrompt}>Begin</button>
          <p className="text-xs text-slate-500">Takes 45–60 seconds • {total} questions</p>
        </div>
      )}

      {phase === 'prompt' && (
        <div className="space-y-5 animate-fade-in">
          <Typewriter
            className="text-slate-600"
            text={cloudQuiz.betweenPrompts[index % cloudQuiz.betweenPrompts.length]}
          />
          <button className="btn btn-ghost w-full" onClick={startQuestions}>Continue</button>
        </div>
      )}

      {phase === 'question' && (
        <div className="space-y-5">
          <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500" style={{ width: `${progress}%` }} />
          </div>
          <h2 className="text-xl font-medium">
            <Typewriter text={q.text} />
          </h2>
          <div className="grid gap-3">
            {q.options.map(opt => (
              <button key={opt.id} className="btn btn-ghost w-full text-left" onClick={() => selectOption(opt.id)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}