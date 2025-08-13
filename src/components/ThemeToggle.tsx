'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial as any);
    if (initial === 'dark') document.documentElement.classList.add('dark');
  }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };
  return (
    <button
      onClick={toggle}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur shadow transition-transform hover:scale-105"
    >
      {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
    </button>
  );
}
