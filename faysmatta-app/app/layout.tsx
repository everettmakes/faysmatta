import { ReactNode } from 'react';
import '../styles/page.css'; // adjust path if needed

export const metadata = {
  title: 'faysmatta',
  description: 'Request to buy a Swedish mat',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
