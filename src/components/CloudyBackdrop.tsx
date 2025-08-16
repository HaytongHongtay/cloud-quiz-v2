'use client';
import React from 'react';

/**
 * Example usage (paste into page.tsx):
 *
 * <CloudyBackdrop
 *   day={{
 *     count: 4,          // show first N clouds
 *     speed: 0.9,        // 1 = normal, <1 slower, >1 faster
 *     opacity: 0.95,     // global multiply for cloud opacity
 *     showSun: true,     // toggle sun+halo
 *     // Optional: override clouds (uses defaults if omitted)
 *     clouds: [
 *       { top: '30%', left: '5vw',  w: 36, h: 36, anim: 'x',      tone: 'white', opacity: 0.8, duration: 26, delay: 2 },
 *       { top: '50%', left: '70vw', w: 30, h: 30, anim: 'lite-y', tone: 'sky',   opacity: 0.7, duration: 36 },
 *     ],
 *   }}
 *   night={{
 *     twinkleSpeed: 1.2,  // >1 faster, <1 slower (default 1)
 *     starScale: 1.0,     // multiply star sizes
 *     starOpacity: 0.9,   // 0..1
 *     extraGlow: true,    // add faint nebula glow
 *   }}
 * />
 *
 * Notes:
 * - 'lite-x' / 'lite-y' need the small-amplitude keyframes in globals.css.
 * - 'speed' scales each cloud's duration: effective = (cloud.duration or base) / speed.
 */

type Cloud = {
  top: string;
  left: string;
  w: number;     // vw
  h: number;     // vw
  tone?: 'white' | 'sky';
  blur?: string; // e.g. 'blur-2xl' | 'blur-3xl' | 'blur-[120px]'
  anim?: 'x' | 'y' | 'lite-x' | 'lite-y' | 'none';
  opacity?: number;  // 0..1
  duration?: number; // seconds
  delay?: number;    // seconds
};

type DayTuning = {
  count: number;
  speed: number;     // 1 = base; <1 slower; >1 faster
  opacity: number;   // multiply per-cloud opacity
  showSun: boolean;
  clouds: Cloud[];
};

type NightTuning = {
  twinkleSpeed: number;
  starScale: number;
  starOpacity: number;
  extraGlow: boolean;
};

const DEFAULT_DAY: DayTuning = {
  count: 5,
  speed: 1,       // <-- reset to 1
  opacity: 1,
  showSun: true,
  clouds: [
    { top: '-20vh', left: '-10vw', w: 80, h: 80, tone: 'sky',   blur: 'blur-3xl',     anim: 'x',      opacity: 0.40, duration: 28 },
    { top: '-10vh', left: '85vw',  w: 70, h: 70, tone: 'sky',   blur: 'blur-[120px]', anim: 'y',      opacity: 0.20, duration: 32 },
    { top: '35%',   left: '-10vw', w: 45, h: 45, tone: 'white', blur: 'blur-2xl',     anim: 'x',      opacity: 0.80, duration: 26, delay: 2 },
    { top: '48%',   left: '88vw',  w: 40, h: 40, tone: 'sky',   blur: 'blur-2xl',     anim: 'y',      opacity: 0.80, duration: 30, delay: 1 },
    { top: '92%',   left: '-8vw',  w: 55, h: 55, tone: 'white', blur: 'blur-3xl',     anim: 'lite-x', opacity: 0.70, duration: 28, delay: 3 },
  ],
};

const DEFAULT_NIGHT: NightTuning = {
  twinkleSpeed: 1,
  starScale: 1,
  starOpacity: 0.9,
  extraGlow: true,
};

const STARS: Array<{ top: string; left: string; size: number }> = [
  { top: '8%', left: '18%', size: 2 }, { top: '12%', left: '35%', size: 3 },
  { top: '15%', left: '60%', size: 2 }, { top: '22%', left: '72%', size: 3 },
  { top: '30%', left: '10%', size: 2 }, { top: '35%', left: '40%', size: 2 },
  { top: '40%', left: '80%', size: 3 }, { top: '48%', left: '50%', size: 2 },
  { top: '55%', left: '65%', size: 2 }, { top: '60%', left: '20%', size: 3 },
  { top: '65%', left: '85%', size: 2 }, { top: '70%', left: '25%', size: 3 },
  { top: '72%', left: '55%', size: 2 }, { top: '78%', left: '15%', size: 2 },
  { top: '80%', left: '75%', size: 3 }, { top: '85%', left: '45%', size: 2 },
  { top: '88%', left: '30%', size: 3 }, { top: '90%', left: '60%', size: 2 },
  { top: '94%', left: '10%', size: 3 }, { top: '96%', left: '80%', size: 2 },
];

// --- helpers ---
const toneBg = (tone?: Cloud['tone']) =>
  tone === 'sky' ? 'bg-sky-50/90' : 'bg-white/80';

// Base durations to use when cloud.duration is not set
const BASE_DUR: Record<NonNullable<Cloud['anim']>, number> = {
  x: 18, y: 22, 'lite-x': 28, 'lite-y': 32, none: 0,
};
// Map to keyframe names defined in globals.css
const ANIM_NAME: Record<NonNullable<Cloud['anim']>, string> = {
  x: 'float-x', y: 'float-y', 'lite-x': 'float-lite-x', 'lite-y': 'float-lite-y', none: '',
};

function inlineAnim(c: Cloud, speed: number) {
  const mode = c.anim ?? 'x';
  if (mode === 'none') return undefined;
  const name = ANIM_NAME[mode];
  const base = BASE_DUR[mode];
  const dur = Math.max(0.001, (c.duration ?? base) / (speed || 1)); // guard
  // full shorthand so it always overrides classes
  return `${name} ${dur}s ease-in-out infinite`;
}

export default function CloudyBackdrop({
  children,
  day,
  night,
}: {
  children: React.ReactNode;
  day?: Partial<DayTuning>;
  night?: Partial<NightTuning>;
}) {
  const DAY: DayTuning = {
    ...DEFAULT_DAY,
    ...day,
    clouds: day?.clouds ?? DEFAULT_DAY.clouds,
  };
  const NIGHT: NightTuning = { ...DEFAULT_NIGHT, ...night };

  const clouds = DAY.clouds.slice(0, Math.max(0, DAY.count)).map((c) => ({
    ...c,
    opacity:
      typeof c.opacity === 'number'
        ? Math.max(0, Math.min(1, c.opacity * (DAY.opacity || 1)))
        : undefined,
  }));

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-indigo-950 dark:to-slate-900 transition-colors duration-500">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* ===== Day Sky ===== */}
        <div className="block dark:hidden">
          {/* Soft sky glow */}
          <div className="absolute -top-[20vh] -left-[10vw] w-[80vw] h-[80vw] rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute -top-[10vh] right-[-15vw] w-[70vw] h-[70vw] rounded-full bg-sky-300/20 blur-[120px]" />

          {/* Sun + halo (toggleable) */}
          {DAY.showSun && (
            <div className="absolute top-6 right-8">
              <div className="relative">
                <div className="absolute inset-[-4rem] rounded-full bg-yellow-300/20 blur-3xl" />
                {/* Optional rays (needs `.sun-rays` in globals.css) */}
                <div className="sun-rays absolute inset-[-1.25rem] opacity-20" />
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-amber-200 to-yellow-300 shadow-[0_0_80px_rgba(250,204,21,0.35)]" />
              </div>
            </div>
          )}

          {/* Tunable cloud puffs */}
          {clouds.map((c, i) => (
            <div
              key={i}
              className={[
                'absolute rounded-full shadow-lg shadow-sky-200/40',
                toneBg(c.tone),
                c.blur || 'blur-3xl',
                // (We don't rely on animate-* classes anymore for duration)
              ].join(' ')}
              style={{
                top: c.top,
                left: c.left,
                width: `${c.w}vw`,
                height: `${c.h}vw`,
                opacity: c.opacity,
                animation: inlineAnim(c, DAY.speed), // <-- speed applied here
                animationDelay: c.delay ? `${c.delay}s` : undefined,
              }}
            />
          ))}

          {/* Small static cloudlets for texture */}
          <div className="absolute top-[20%] left-[30%] h-28 w-44 rounded-[999px] bg-white/80 blur-md shadow-lg shadow-sky-200/40 rotate-[-3deg]" />
          <div className="absolute top-[52%] left-[55%] h-24 w-36 rounded-[999px] bg-white/80 blur-md shadow-lg shadow-sky-200/40 rotate-[2deg]" />
          <div className="absolute top-[65%] left-[15%] h-20 w-32 rounded-[999px] bg-white/80 blur-md shadow-lg shadow-sky-200/40 rotate-[1deg]" />
        </div>

        {/* ===== Night Sky ===== */}
        <div className="hidden dark:block">
          {STARS.map((s, i) => (
            <div
              key={i}
              className="absolute bg-white/90 rounded-full"
              style={{
                top: s.top,
                left: s.left,
                width: s.size * (NIGHT.starScale || 1),
                height: s.size * (NIGHT.starScale || 1),
                opacity: NIGHT.starOpacity,
                animation: `twinkle ${(3.5 / (NIGHT.twinkleSpeed || 1)).toFixed(2)}s ease-in-out infinite`,
              }}
            />
          ))}
          {NIGHT.extraGlow && (
            <div className="absolute -top-20 left-1/3 w-[60vw] h-[60vw] rounded-full bg-indigo-400/10 blur-3xl" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-28 max-w-md mx-auto">{children}</div>
    </div>
  );
}
