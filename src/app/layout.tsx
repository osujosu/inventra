import type { Metadata } from 'next';
import { sora, plusJakarta, jetbrainsMono } from '@/styles/fonts';
import { ThemeProvider } from '@/components/shared';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Inventra - Smart Inventory & Business Management',
    template: '%s | Inventra',
  },
  description:
    'Modern inventory and business management system for tech retail businesses. Track stock, manage sales, handle warranties, and grow your business.',
  keywords: [
    'inventory management',
    'POS system',
    'business management',
    'stock tracking',
    'warranty management',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}