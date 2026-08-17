import type { Metadata } from 'next';
import { Noto_Nastaliq_Urdu } from 'next/font/google';
import './globals.css';
import { Providers } from '../lib/providers';

const notoNastaliq = Noto_Nastaliq_Urdu({ subsets: ['arabic'], variable: '--font-noto-nastaliq' });

export const metadata: Metadata = {
  title: "UGC Stars Pakistan — Pakistan's Premier UGC Marketplace",
  description: "Connect brands with Pakistan's most creative content creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${notoNastaliq.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
