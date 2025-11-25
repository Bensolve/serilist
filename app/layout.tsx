import { Space_Mono } from 'next/font/google';
import './globals.css';

// Black Mirror Font - Monospace/Tech
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata = {
  title: 'SeriList - Track Your Series',
  description: 'Futuristic TV series tracking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceMono.variable}>
      <body className={spaceMono.className}>
        {children}
      </body>
    </html>
  );
}