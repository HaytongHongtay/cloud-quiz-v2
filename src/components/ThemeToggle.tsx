'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      const initial = (saved || (prefersDark ? 'dark' : 'light')) as 'light'|'dark';
      setTheme(initial);
      document.documentElement.classList.toggle('dark', initial === 'dark');
    } catch {}
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 pointer-events-auto p-2 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur shadow transition-transform hover:scale-105"
    >
      {theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}
    </button>
  );
}
