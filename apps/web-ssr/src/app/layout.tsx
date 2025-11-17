import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// Next.js key: use next/font to optimize Google font loading on the server (avoid CLS/FOIT)

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // Next.js key: App Router global metadata; server-generated SEO head tags
  title: 'Incident Management System',
  description: 'Track and manage incidents across multiple locations with real-time updates',
  keywords: 'incident management, safety, security, airport, emergency response',
  openGraph: {
    title: 'Incident Management System',
    description: 'Track and manage incidents across multiple locations with real-time updates',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Next.js key: root layout wraps all routes; inject global SSR styles for responsiveness and hover */}
        <style>{`
          :root { --hover-bg: rgba(0, 0, 0, 0.04); }
          .container { max-width: 1024px; margin: 0 auto; padding: 32px; }
          .header { margin-bottom: 32px; }
          .table { width: 100%; border-collapse: collapse; }
          .th, .td { padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.08); }
          .row:hover { background-color: var(--hover-bg); }
          .list { display: none; }
          .card { border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 12px; margin-bottom: 12px; transition: background-color 0.2s ease; }
          .card:hover { background-color: var(--hover-bg); }
          .priority { width: 24px; height: 24px; display: inline-block; }
          .meta { color: #666; }
          @media (max-width: 600px) {
            .table { display: none; }
            .list { display: block; }
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
