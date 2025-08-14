'use client';
import React from 'react';

const stars = [
  { top: '8%', left: '18%', size: 2 },
  { top: '12%', left: '35%', size: 3 },
  { top: '15%', left: '60%', size: 2 },
  { top: '22%', left: '72%', size: 3 },
  { top: '30%', left: '10%', size: 2 },
  { top: '35%', left: '40%', size: 2 },
  { top: '40%', left: '80%', size: 3 },
  { top: '48%', left: '50%', size: 2 },
  { top: '55%', left: '65%', size: 2 },
  { top: '60%', left: '20%', size: 3 },
  { top: '65%', left: '85%', size: 2 },
  { top: '70%', left: '25%', size: 3 },
  { top: '72%', left: '55%', size: 2 },
  { top: '78%', left: '15%', size: 2 },
  { top: '80%', left: '75%', size: 3 },
  { top: '85%', left: '45%', size: 2 },
  { top: '88%', left: '30%', size: 3 },
  { top: '90%', left: '60%', size: 2 },
  { top: '94%', left: '10%', size: 3 },
  { top: '96%', left: '80%', size: 2 },
];

export default function CloudyBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-sky-100 to-white dark:from-indigo-950 dark:to-slate-900 transition-colors duration-500">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Day clouds */}
        <div className="block dark:hidden">
          <div className="absolute -top-24 -left-16 w-[70vw] h-[70vw] rounded-full bg-white/60 blur-3xl animate-float-x" />
          <div className="absolute top-32 right-[-15vw] w-[60vw] h-[60vw] rounded-full bg-sky-50/80 blur-3xl animate-float-y" />
          <div className="absolute bottom-[-10vw] left-[-10vw] w-[55vw] h-[55vw] rounded-full bg-white/60 blur-3xl animate-float-x" />
        </div>
        {/* Night stars */}
        <div className="hidden dark:block">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute bg-white/90 rounded-full animate-twinkle"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            />
          ))}
          <div className="absolute -top-20 left-1/3 w-[60vw] h-[60vw] rounded-full bg-indigo-400/10 blur-3xl" />
        </div>
      </div>
      <div className="relative z-10 px-4 pb-28 max-w-md mx-auto">{children}</div>
    </div>
  );
}
