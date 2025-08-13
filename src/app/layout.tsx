// src/app/layout.tsx
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import { TitleProvider } from "@/context/TitleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { GCScript } from "next-goatcounter";

import "./globals.css";
import "./prism.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Josh Peterson's Portfolio and Blog`,
  description: `Welcome to Josh Peterson's portfolio and blog showcasing projects, writings, and ideas.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Josh Peterson, Software Engineer, Programming, Blog"
        />
        {/* Set theme early to avoid flash */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var saved = localStorage.getItem('theme');
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var initial = saved || (prefersDark ? 'dark' : 'light');
                if (initial === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              } catch (e) {}
            })();
          `,
        }} />
        <script src="https://unpkg.com/prismjs@v1.29.0/components/prism-core.min.js"></script>
        <script src="https://unpkg.com/prismjs@v1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
      </head>
    <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        <GCScript siteUrl="https://joshuadanpeterson.goatcounter.com/count" />
        <TitleProvider defaultTitle={metadata.title as string}>
          <ThemeProvider>
            <div>
              <Container>
                <Navbar />
              </Container>
            </div>
            <div className="min-h-screen">{children}</div>
            <Footer />
          </ThemeProvider>
        </TitleProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', (event) => {
                if (typeof window !== 'undefined' && window.Prism) {
                  window.Prism.highlightAll();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
