import Container from "@/app/_components/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Me | Josh Peterson",
  description:
    "Hire Josh Peterson for automation, internal tools, technical editorial writing, research briefs, and AI-assisted creative production.",
  alternates: {
    canonical: "/work-with-me",
  },
  openGraph: {
    title: "Work With Me | Josh Peterson",
    description:
      "Two practical service paths: automation and internal tools, plus writing and creative production for technical, policy-heavy, and founder-led work.",
    url: `${SITE_URL}/work-with-me`,
    siteName: "Josh Peterson",
    images: [HOME_OG_IMAGE_URL],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Me | Josh Peterson",
    description:
      "Automation, internal tools, technical editorial writing, research briefs, and AI-assisted creative production.",
    images: [HOME_OG_IMAGE_URL],
  },
};

const paths = [
  {
    title: "Automation & Internal Tools",
    description:
      "Google Sheets workflows, Apps Script, dashboards, API handoffs, cleanup scripts, and lightweight admin panels for operations-heavy teams.",
    href: "/freelance",
    cta: "Hire me for automation",
    icon: PanelsTopLeft,
  },
  {
    title: "Writing & Creative Production",
    description:
      "Technical editorial writing, founder thought leadership, research briefs, case studies, positioning cleanup, and AI-assisted marketing concept work.",
    href: "/writing",
    cta: "Hire me for writing",
    icon: FileText,
  },
];

const fitSignals = [
  {
    title: "Systems-minded work",
    description:
      "Best when the work involves messy information, technical nuance, operating context, or a story that needs to become legible.",
    icon: ShieldCheck,
  },
  {
    title: "Useful public proof",
    description:
      "The public lab and notebook show how I turn source trails, workflows, and complicated ideas into artifacts people can inspect.",
    icon: Sparkles,
  },
];

export default function WorkWithMePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Josh Peterson",
    url: SITE_URL,
    jobTitle: "Systems-minded writer and automation builder",
    knowsAbout: [
      "Workflow automation",
      "Google Workspace automation",
      "Technical editorial writing",
      "Research briefs",
      "AI-assisted creative production",
      "Internal tools",
    ],
    makesOffer: paths.map((path) => ({
      "@type": "Offer",
      name: path.title,
      url: `${SITE_URL}${path.href}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container>
        <section className="mb-16 border-b border-border pb-12 md:mb-20 md:pb-16">
          <div className="max-w-5xl">
            <h1 className="text-5xl font-bold leading-tight tracking-tighter text-foreground md:text-8xl">
              Work with Josh on messy systems and complicated ideas.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              I help teams turn operational sprawl, technical complexity, and
              half-formed positioning into clear workflows, useful writing, and
              public-facing proof.
            </p>
          </div>
        </section>

        <section className="mb-16 grid gap-6 md:mb-20 md:grid-cols-2">
          {paths.map((path) => {
            const Icon = path.icon;

            return (
              <Card key={path.title} className="rounded-md p-6 shadow-sm">
                <Icon className="mb-5 h-7 w-7 text-foreground" aria-hidden="true" />
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {path.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <Button asChild className="mt-6 min-h-11">
                  <Link href={path.href}>
                    {path.cta}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </Card>
            );
          })}
        </section>

        <section className="mb-20 border-y border-border py-10">
          <div className="grid gap-8 md:grid-cols-2">
            {fitSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div key={signal.title} className="flex gap-4">
                  <Icon
                    className="mt-1 h-6 w-6 shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {signal.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {signal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Start with the kind of problem you need solved.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                If the work crosses systems, research, writing, operations, or
                AI-assisted production, send enough context for a useful first
                read.
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <Link href="/contact">Contact Josh</Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
