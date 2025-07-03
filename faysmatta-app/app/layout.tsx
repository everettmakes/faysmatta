import { ReactNode } from 'react';
import '../styles/page.css'; // adjust path if needed

export const metadata = {
  title: 'Swedish Mat Request',
  description: 'Request to buy a Swedish mat',
};

// ✅ Move viewport to its own export
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
