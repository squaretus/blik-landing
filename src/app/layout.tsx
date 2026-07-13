import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: '.blik — Контроллер вентиляторов MacBook',
  description:
    'Мониторинг температур и управление скоростью кулеров MacBook Pro на Apple Silicon',
  openGraph: {
    title: '.blik — Контроллер вентиляторов MacBook',
    description:
      'Мониторинг температур и управление скоростью кулеров MacBook Pro на Apple Silicon',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link id="favicon" rel="icon" type="image/svg+xml" href="/favicon-dark.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme;
                  if (stored === 'light' || stored === 'dark') {
                    theme = stored;
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    theme = 'light';
                  } else {
                    theme = 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  var fav = document.getElementById('favicon');
                  if (fav) fav.href = theme === 'light' ? '/favicon-light.svg' : '/favicon-dark.svg';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
