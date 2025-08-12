'use client';
import React from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Typewriter({ text, speed = 120, className }: TypewriterProps) {
  const [displayed, setDisplayed] = React.useState('');

  React.useEffect(() => {
    setDisplayed('');
    if (!text) return;
    const words = text.split(/\s+/);
    let i = 0;
    const id = setInterval(() => {
      if (i >= words.length) {
        clearInterval(id);
        return;
      }
      setDisplayed(prev => prev + (i > 0 ? ' ' : '') + words[i]);
      i++;
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span className={className}>{displayed}</span>;
}
