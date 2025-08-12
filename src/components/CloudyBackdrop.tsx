'use client';
import React from 'react';

export default function CloudyBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-sky-100 to-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-20 w-[60vw] h-[60vw] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute top-24 right-[-10vw] w-[50vw] h-[50vw] rounded-full bg-sky-50/80 blur-3xl" />
        <div className="absolute bottom-[-10vw] left-[-10vw] w-[55vw] h-[55vw] rounded-full bg-white/60 blur-3xl" />
      </div>
      <div className="relative z-10 px-4 pb-28 max-w-md mx-auto">{children}</div>
    </div>
  );
}