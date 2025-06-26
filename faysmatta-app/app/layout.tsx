import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Swedish Mat Request',
  description: 'Request to buy a Swedish mat',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}