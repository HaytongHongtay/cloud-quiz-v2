'use client';
import CloudyBackdrop from '@/src/components/CloudyBackdrop';
import Quiz from '@/src/components/Quiz';

export default function Page() {
  return (
    <CloudyBackdrop>
      <div className="pt-8">
        <div className="text-center mb-8 select-none space-y-2">
          <div className="text-5xl font-bold text-sky-700">☁️ Cloud-Type</div>
          <div className="text-base text-slate-500 dark:text-slate-400">Minimal • Mobile-first • Fun</div>
        </div>
        <Quiz />
      </div>
    </CloudyBackdrop>
  );
}