'use client';
import React from 'react';
import { makeStoryImage } from '@/src/utils/storyImage';
import { cloudQuiz } from '@/src/config/cloudQuiz';
import { Share2, Download } from 'lucide-react';

export default function ResultCard({
  answers,
  resultKey,
  result,
  quizId,
}: {
  answers: Array<{ qid: string; oid: string }>;
  resultKey: keyof typeof cloudQuiz.results;
  result: (typeof cloudQuiz)['results'][keyof typeof cloudQuiz['results']];
  quizId: string;
}) {
  async function onShare() {
    const blob = await makeStoryImage({ title: result.title, desc: result.desc, emoji: result.emoji, palette: result.palette, quizId });
    const file = new File([blob], `cloud-${resultKey}.png`, { type: 'image/png' });
    if ((navigator as any).canShare?.({ files: [file] })) {
      await (navigator as any).share({ files: [file], title: 'My Cloud Type', text: 'What cloud are you?' });
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = file.name; a.click();
      URL.revokeObjectURL(url);
      alert('Image downloaded. Upload it to your Instagram Story.');
    }
  }

  async function onDownload() {
    const blob = await makeStoryImage({ title: result.title, desc: result.desc, emoji: result.emoji, palette: result.palette, quizId });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `cloud-${resultKey}.png`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="pt-10 space-y-4">
      <div className="card text-center">
        <div className="text-6xl">{result.emoji}</div>
        <h2 className="text-2xl font-semibold" style={{ color: result.palette.fg }}>{result.title}</h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2">{result.desc}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={onShare} className="btn btn-primary w-full"><Share2 className="mr-2 h-5 w-5"/> Share</button>
        <button onClick={onDownload} className="btn btn-ghost w-full"><Download className="mr-2 h-5 w-5"/> Save</button>
      </div>
      <div className="text-center text-xs text-slate-500 dark:text-slate-400">Tip: Use the Share button on mobile.</div>
    </div>
  );
}