// src/app/layout.tsx
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Navbar from "@/app/_components/navbar";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
    <html lang="en">
      <head>
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
      <body className={inter.className}>
        <div>
          <Container>
            <Navbar />
          </Container>
        </div>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
