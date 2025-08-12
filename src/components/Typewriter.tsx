'use client';
import React from 'react';

interface TypewriterProps {
  text: string;
  /** Milliseconds between reveals */
  speed?: number;
  className?: string;
  /** If true, reveal word-by-word; otherwise character-by-character */
  byWord?: boolean;
}

export default function Typewriter({
  text,
  speed = 30,
  className,
  byWord = false,
}: TypewriterProps) {
  const [displayed, setDisplayed] = React.useState('');

  // A ref to cancel the current typing run when props change/unmount
  const abortRef = React.useRef({ aborted: false });

  React.useEffect(() => {
    // Start a new run: reset output and mark previous run aborted
    abortRef.current.aborted = true;
    abortRef.current = { aborted: false };
    const token = abortRef.current;

    setDisplayed('');
    if (!text) return;

    // Pre-split once; avoids repeated splits in the timer
    const units = byWord ? text.split(/\s+/).filter(Boolean) : Array.from(text); // Array.from handles emojis
    let i = 0;

    // Use setTimeout instead of setInterval to avoid overrun ticks
    const step = () => {
      if (token.aborted) return;                 // stop if props changed/unmounted
      if (i >= units.length) return;             // nothing more to add

      const next = units[i];                     // may be undefined if i is bad—guard below
      if (next !== undefined) {
        setDisplayed(prev => {
          if (byWord) {
            // add a space between words except at the beginning
            return prev.length > 0 ? `${prev} ${next}` : next;
          }
          return prev + next;                    // char-by-char
        });
      }

      i += 1;
      if (!token.aborted && i < units.length) {
        // schedule the next tick
        timer = window.setTimeout(step, speed);
      }
    };

    let timer = window.setTimeout(step, speed);

    // Cleanup cancels any pending timeout and marks this run aborted
    return () => {
      token.aborted = true;
      window.clearTimeout(timer);
    };
  }, [text, speed, byWord]);

  return <span className={className}>{displayed}</span>;
}
