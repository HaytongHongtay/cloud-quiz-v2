'use client';
import CloudyBackdrop from '@/src/components/CloudyBackdrop';
import Quiz from '@/src/components/Quiz';

export default function Page() {
  return (
    <CloudyBackdrop>
      <div className="pt-8">
        <div className="text-center mb-4 select-none">
          <div className="text-4xl font-bold text-sky-700">☁️ Cloud-Type</div>
          <div className="text-sm text-slate-500">Minimal • Mobile-first • Fun</div>
        </div>
        <Quiz />
      </div>
    </CloudyBackdrop>
  );
}