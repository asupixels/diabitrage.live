import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diabitrage Asset Management | Platform Dashboard',
  description: 'Institutional asset recovery and compliance management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
