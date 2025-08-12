import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud-Type Quiz',
  description: 'Find your cloud personality',
  openGraph: { title: 'Cloud-Type Quiz', description: 'Find your cloud personality', images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-dvh flex items-stretch">{children}</main>
      </body>
    </html>
  );
}