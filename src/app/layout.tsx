import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/src/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Decoder',
  description: 'Baixe videos ou áudios YouTube.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="pt-BR"
    suppressHydrationWarning
    className={cn(
      'h-full',
      'antialiased',
      geistSans.variable,
      montserrat.variable,
      geistMono.variable,
      'font-sans',
      inter.variable,
    )}
  >
    <body className="min-h-full flex flex-col dark">{children}</body>
  </html>
);

export default RootLayout;
