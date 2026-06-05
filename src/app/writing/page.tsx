import Container from "@/app/_components/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  FileSearch,
  Megaphone,
  PenLine,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Editorial Writing & Creative Production | Josh Peterson",
  description:
    "Technical editorial writing, founder thought leadership, research briefs, case studies, positioning cleanup, and AI-assisted creative production for technical and policy-heavy work.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Technical Editorial Writing & Creative Production | Josh Peterson",
    description:
      "Writing and creative support for AI, tech, policy, operations, and founder-led organizations that need complicated ideas made clear.",
    url: `${SITE_URL}/writing`,
    siteName: "Josh Peterson",
    images: [HOME_OG_IMAGE_URL],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Editorial Writing & Creative Production | Josh Peterson",
    description:
      "Technical editorial writing, research briefs, positioning cleanup, and AI-assisted creative production.",
    images: [HOME_OG_IMAGE_URL],
  },
};

const writingServices = [
  {
    title: "Founder thought leadership",
    description:
      "Turn notes, calls, rough opinions, and messy positioning into essays, posts, op-eds, or public arguments with a clear voice.",
    icon: Megaphone,
  },
  {
    title: "Technical editorial copy",
    description:
      "Explain AI, software, automation, policy, operations, or public-trust problems without flattening the nuance.",
    icon: PenLine,
  },
  {
    title: "Research briefs and white papers",
    description:
      "Turn source trails, interviews, documents, and scattered notes into structured reports or explainers.",
    icon: FileSearch,
  },
  {
    title: "Case studies and customer stories",
    description:
      "Interview users, find the business outcome, and write the story without letting it collapse into generic SaaS copy.",
    icon: BookOpenText,
  },
  {
    title: "Website and positioning cleanup",
    description:
      "Clarify homepages, about pages, service pages, product explainers, and buyer-facing narrative.",
    icon: BadgeCheck,
  },
];

const creativeServices = [
  "Campaign concepts and visual directions",
  "Social ad and blog/header image variations",
  "Mood boards and pitch-deck visual support",
  "Founder-brand imagery and content systems",
  "Prompt systems for repeatable creative workflows",
  "Creative QA for artifacts, brand fit, and risk flags",
];

const proofItems = [
  {
    title: "Public Automation Lab",
    description:
      "Technical notes and implementation artifacts that show how I explain workflows, tools, and system behavior in public.",
    href: "/posts",
  },
  {
    title: "Reporter’s Notebook",
    description:
      "Cleaned source trails and public-record methods that show evidence-led research without exposing raw reporting material.",
    href: "/notebook",
  },
  {
    title: "Portfolio",
    description:
      "Public builds and repositories grouped around automation, reporting visibility, cleanup, and buyer-facing problems.",
    href: "/portfolio",
  },
];

export default function WritingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Josh Peterson Writing and Creative Production",
    url: `${SITE_URL}/writing`,
    provider: {
      "@type": "Person",
      name: "Josh Peterson",
      url: SITE_URL,
    },
    areaServed: "United States",
    serviceType: [
      "Technical editorial writing",
      "Founder thought leadership",
      "Research briefs",
      "Case studies",
      "AI-assisted creative production",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container>
        <section className="mb-16 border-b border-border pb-12 md:mb-20 md:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold leading-tight tracking-tighter text-foreground md:text-8xl">
                Technical editorial writing for complicated work.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I help AI, tech, policy, operations, and founder-led teams turn
                messy ideas into clear writing, credible positioning, research
                briefs, and useful marketing assets.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-11">
                  <Link href="/contact?type=writing">
                    Start a writing conversation
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-h-11">
                  <Link href="#proof">View proof</Link>
                </Button>
              </div>
            </div>
            <div className="border-l-4 border-foreground pl-5 text-sm leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">
                Best fit for technical, operational, and policy-heavy work.
              </p>
              <p className="mt-3">
                The lane is not generic copywriting. It is systems-minded
                writing for buyers who need clear thinking, research judgment,
                and disciplined client voice.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What you can hire me for
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Writing and research work where the hard part is making complex
              material useful, credible, and readable.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {writingServices.map((service) => {
              const Icon = service.icon;

              return (
                <Card key={service.title} className="rounded-md p-5 shadow-sm">
                  <Icon className="mb-4 h-6 w-6 text-foreground" aria-hidden="true" />
                  <h3 className="text-xl font-semibold leading-snug text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-16 border-y border-border py-10 md:mb-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <Sparkles className="mb-4 h-7 w-7 text-foreground" aria-hidden="true" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                AI-assisted creative production
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                I help marketing teams turn rough campaign ideas into usable
                visual concepts, social assets, mood boards, and creative
                directions using AI-assisted workflows.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                This is not a replacement for brand strategy, design judgment,
                or legal review. It is a faster way to explore concepts, test
                directions, generate variations, and give designers or clients
                something concrete to react to.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {creativeServices.map((item) => (
                <div key={item} className="border-t border-border pt-3">
                  <p className="font-semibold leading-snug text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Client work is written from the client’s side.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              My public writing often deals with politics, technology, media,
              and culture. Client work is different: I write from the client’s
              voice, audience, and strategic goals. The job is clarity, trust,
              and useful communication, not importing my personal views into
              someone else’s copy.
            </p>
          </div>
        </section>

        <section id="proof" className="mb-16 scroll-mt-24 md:mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Existing public proof
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              V1 uses public site-native proof only: lab notes, source trails,
              and portfolio artifacts that show the research, systems, and
              explanation muscles behind the offer.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {proofItems.map((item) => (
              <Card key={item.title} className="rounded-md p-5 shadow-sm">
                <h3 className="text-xl font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-sm font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  Open {item.title}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20 border-t border-border py-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Bring the messy idea.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                A useful first note includes the audience, format, deadline,
                rough word count or asset need, and whether the work is public,
                internal, or ghostwritten.
              </p>
            </div>
            <Button asChild size="lg" className="min-h-11">
              <Link href="/contact?type=writing">
                Contact Josh
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
