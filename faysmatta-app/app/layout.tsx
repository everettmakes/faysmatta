import { ReactNode } from 'react';
import '../styles/page.css'; // adjust path if needed
import { Cutive_Mono } from 'next/font/google';

export const metadata = {
  title: 'faysmatta',
  description: 'Request to buy a Swedish mat',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const cutiveMono = Cutive_Mono({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cutiveMono.className}>
      <body>{children}</body>
    </html>
  );
}
