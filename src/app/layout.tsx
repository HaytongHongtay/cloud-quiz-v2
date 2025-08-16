import './globals.css';
import type { Metadata } from 'next';
import ThemeToggle from '@/src/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Cloud-Type Quiz',
  description: 'Find your cloud personality',
  openGraph: { title: 'Cloud-Type Quiz', description: 'Find your cloud personality', images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;var c=t||(m?'dark':'light');if(c==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <main className="min-h-dvh flex items-stretch">{children}</main>
        <ThemeToggle />
      </body>
    </html>
  );
}
