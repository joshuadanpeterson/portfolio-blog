import Container from "@/app/_components/container";
import CoverImage from "@/app/_components/cover-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/api";
import { HOME_OG_IMAGE_URL, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  MessageSquareText,
  PanelsTopLeft,
  ReceiptText,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Automation, Dashboards, and Internal Tools | Josh Peterson",
  description:
    "Office bottleneck cleanup, reporting workflows, and safe AI-assisted automation for service businesses and operations-heavy teams.",
  alternates: {
    canonical: "/freelance",
  },
  openGraph: {
    title: "Automation, Dashboards, and Internal Tools | Josh Peterson",
    description:
      "Office bottleneck cleanup, reporting workflows, and safe AI-assisted automation for service businesses and operations-heavy teams.",
    url: `${SITE_URL}/freelance`,
    siteName: "Josh Peterson",
    images: [HOME_OG_IMAGE_URL],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation, Dashboards, and Internal Tools | Josh Peterson",
    description:
      "Office bottleneck cleanup, reporting workflows, and safe AI-assisted automation for service businesses and operations-heavy teams.",
    images: [HOME_OG_IMAGE_URL],
  },
};

const services = [
  {
    title: "Service-business office workflow cleanup",
    description:
      "Turn scattered job notes, reminders, inbox threads, and admin handoffs into one workflow the office can actually use.",
    icon: ClipboardList,
  },
  {
    title: "Follow-up and owner visibility dashboards",
    description:
      "Give owners and managers a clear daily or weekly view of customer follow-ups, invoices, AR, and work that needs attention.",
    icon: Eye,
  },
  {
    title: "Service software and accounting handoffs",
    description:
      "Reduce duplicate entry across QuickBooks, Jobber, ServiceTitan, Housecall Pro, Google Workspace, spreadsheets, and inboxes.",
    icon: ReceiptText,
  },
  {
    title: "Safe AI-assisted drafting and summaries",
    description:
      "Use AI behind the scenes to draft, summarize, or route information while your team approves customer-facing and money-sensitive steps.",
    icon: ShieldCheck,
  },
  {
    title: "Lightweight internal tools and cleanup scripts",
    description:
      "Ship focused scripts, dashboards, or admin panels for the workflow that keeps escaping email, chat, and spreadsheets.",
    icon: PanelsTopLeft,
  },
];

const goodFit = [
  "You run a service business where jobs, invoices, customer follow-ups, or admin notes are scattered across tools.",
  "Your team needs a small working slice before a larger build decision.",
  "The problem crosses data cleanup, communication, reporting, and operations handoffs.",
  "You want documentation and maintainability, not a black box.",
];

const notFit = [
  "Speculative app ideas without a clear operating problem.",
  "Growth hacking, scraping, spam, or account-risk automation.",
  "Projects that require publishing private client data or unverified claims.",
  "Fully autonomous customer communication, collections, dispatch, or other black-box workflows.",
  "Large enterprise rewrites that need a full agency team from day one.",
];

const process = [
  {
    title: "Diagnose the workflow",
    description:
      "Clarify the job, the current tools, the handoffs, and the cost of the messy parts.",
  },
  {
    title: "Map the data path",
    description:
      "Identify where records start, where they drift, and what the team actually needs to see or trigger.",
  },
  {
    title: "Ship a working slice",
    description:
      "Build the smallest useful automation, dashboard, script, or internal panel that proves the system.",
  },
  {
    title: "Document and hand off",
    description:
      "Leave behind the operating notes, setup details, and maintenance path so the system can keep working.",
  },
];

const proofSlugs = [
  "public-automation-lab-freelance-services-case-study",
  "google-sheets-crm-follow-up-automation-for-solo-consultants",
  "automating-slack-with-google-sheets-posting-unique-messages-from-a-spreadsheet",
  "mastering-slack-canvas-automation-a-journey-through-api-quirks",
];

function getProofPosts() {
  const posts = getAllPosts();

  return proofSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
}

export default function FreelancePage() {
  const proofPosts = getProofPosts();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Josh Peterson",
    url: SITE_URL,
    jobTitle: "Automation builder and systems-minded operator",
    knowsAbout: [
      "Office bottleneck cleanup",
      "Service-business operations",
      "Google Sheets automation",
      "Apps Script",
      "QuickBooks and service software handoffs",
      "Safe AI-assisted workflows",
      "Internal tools",
      "Owner visibility dashboards",
    ],
    offers: {
      "@type": "Offer",
      name: "Office bottleneck cleanup for service businesses",
      url: `${SITE_URL}/freelance`,
    },
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
                Office bottleneck cleanup, automation, and dashboards for service businesses.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                I help service-business owners and operations-heavy teams turn
                messy job notes, customer follow-ups, invoice reminders, and
                back-office handoffs into practical systems they can actually
                use and maintain.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-11">
                  <Link href="/contact?type=freelance">
                    Start a project conversation
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
                Best fit for owners, office managers, dispatchers, operations
                managers, and admin leads.
              </p>
              <p className="mt-3">
                The sweet spot is work where follow-up, cash visibility,
                reporting, automation, software, and clear communication all meet.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 border-y border-border bg-muted/30 py-10 md:mb-20">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Office bottleneck cleanup for service businesses
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                I help service-business owners turn messy job notes, customer
                follow-ups, invoice reminders, owner summaries, and admin
                handoffs into one safe workflow their office can actually use.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                When AI helps, it drafts, summarizes, or routes information
                behind the scenes. Your team still approves customer-facing
                messages and money-sensitive steps.
              </p>
            </div>
            <Button asChild size="lg" className="min-h-11 w-full sm:w-fit">
              <Link href="/contact?type=freelance">
                Talk through the bottleneck
                <MessageSquareText className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What you can hire me for
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Focused builds for service businesses and small teams that need
              cleaner office workflows more than they need a giant platform
              migration.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
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

        <section className="mb-16 grid gap-8 border-y border-border py-10 md:mb-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Good fit
            </h2>
            <div className="mt-5 space-y-4">
              {goodFit.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Not a fit
            </h2>
            <div className="mt-5 space-y-4">
              {notFit.map((item) => (
                <div key={item} className="flex gap-3">
                  <XCircle
                    className="mt-1 h-5 w-5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="mb-16 scroll-mt-24 md:mb-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Proof from the public lab
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Public artifacts translated into buyer problems: follow-up
                systems, spreadsheet automation, reporting cleanup, and
                maintainable operational workflows.
              </p>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-fit">
              <Link href="/portfolio">Browse portfolio</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {proofPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden rounded-md shadow-sm">
                <div className="aspect-[16/9] overflow-hidden border-b border-border">
                  <CoverImage
                    title={post.title}
                    src={post.coverImage}
                    slug={post.slug}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    {post.artifactType === "case-study"
                      ? "Case study"
                      : "Public artifact"}
                  </div>
                  <h3 className="text-2xl font-semibold leading-snug text-foreground">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-20">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How projects usually work
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Start narrow, prove the workflow, then expand only when the
              operating value is clear.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {process.map((step, index) => (
              <div key={step.title} className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-muted-foreground">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 border-t border-border py-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Bring the office bottleneck.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                A good first note includes the service software or accounting
                tool, the recurring follow-up or admin pain, the people
                affected, and what would count as a useful first win.
              </p>
            </div>
            <Button asChild size="lg" className="min-h-11">
              <Link href="/contact?type=freelance">
                Contact Josh
                <Search className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
