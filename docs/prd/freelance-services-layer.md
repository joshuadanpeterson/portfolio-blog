# PRD: Freelance Services Layer

Created: 2026-06-03 18:28 MDT
Status: Draft
Owner: Josh Peterson
Repo: portfolio-blog

## Overview

Build a dedicated freelance services layer into the existing Josh Peterson Public Automation Lab site. The site should remain one coherent personal domain, but it needs a buyer-facing path for freelance prospects who are evaluating Josh for automation, dashboards, internal tools, and operations workflow projects.

The services layer should make the existing public lab more commercially useful without turning the whole site into a generic agency website. The lab, notebook, posts, and portfolio become proof beneath a clear freelance offer.

## Problem

The current site explains Josh's public automation lab and reporter's notebook, but a freelance buyer has to infer:

- what Josh can be hired for
- who the best-fit buyer is
- what kinds of problems he solves
- what proof is relevant to client work
- how to start a project conversation

That friction weakens outbound replies, job-board proposals, LinkedIn profile clicks, Gmail signature traffic, and warm referrals. A prospect should land on one URL and quickly understand whether Josh is a fit.

## Goals

- Add a clear freelance landing page that can be linked from proposals, outreach, LinkedIn, Gmail, and job-board profiles.
- Preserve the current public lab identity while adding a business-ready path.
- Translate Josh's strongest freelance positioning into concise, buyer-facing web copy.
- Connect service offers to relevant proof: posts, repositories, case studies, artifacts, and contact flow.
- Improve conversion from "interesting person/site" to "I should ask Josh about this workflow problem."
- Make the implementation easy to expand later into a separate brand, niche newsletter, or productized service if demand appears.

## Non-Goals

- Do not create a separate domain or standalone business site in this phase.
- Do not rebrand the whole site as an agency.
- Do not build a full CRM, scheduling, payment, or proposal system inside the site.
- Do not add paid API dependencies.
- Do not publish private client details, sensitive reporting material, or unverified claims.
- Do not create broad SEO pages for every possible service until the first services layer validates demand.

## Target Users

Primary:

- operations-heavy small businesses
- solo consultants and tiny service businesses with spreadsheet workflow pain
- agencies drowning in client reporting
- founders/operators who need dashboards, internal tools, automation, or CRM cleanup
- fractional COOs, ops managers, finance/admin managers, and agency owners

Secondary:

- freelance marketplace reviewers
- warm referrals
- LinkedIn visitors
- editors or collaborators evaluating Josh's systems/reporting work

## Core Positioning

Josh builds practical internal tools, dashboards, and automations for operations-heavy teams.

Primary offer language:

- Google Sheets and Apps Script automation
- Google Workspace workflows
- API-connected reporting
- Python automation and data cleanup
- lightweight React/Next admin panels
- CRM, reporting, scheduling, dispatch, inventory, and back-office workflow systems

Proof language:

- turns messy operations into clean workflows
- thinks like an operator, not just a coder
- can start with a small audit before a full build
- documents the system so the team can maintain it
- strongest where operations, automation, software, and communication meet

## Proposed Information Architecture

Add:

- `/freelance` or `/services`: primary buyer-facing landing page.
- `/freelance/case-studies` or case-study filtered content: optional v1.1 if not enough content exists for v1.
- `lane: portfolio` plus `artifactType: case-study` posts for proof assets.

Update:

- Homepage: add a secondary CTA to "Work with Josh" or "Hire me for automation."
- Navigation: include a clear `Services` or `Freelance` link.
- About page: add one concise paragraph pointing buyers to the services page.
- Portfolio page: better group repositories and public builds by client-relevant problem type, not only GitHub pinned repos.
- Contact page/form: add project-fit language and optional fields for project type, workflow pain, timeline, and budget range.
- Metadata/sitemap/schema: include service-oriented metadata and structured organization/person information where appropriate.

## Primary Page Requirements

The `/freelance` page should include:

- Hero with literal offer, not a vague tagline.
- Short positioning paragraph for best-fit buyers.
- Primary CTA to contact Josh.
- Secondary CTA to view proof/case studies.
- Service lanes with concise descriptions:
  - Sheets and Apps Script automation
  - dashboards and reporting workflows
  - API integrations and CRM sync
  - Python automation and cleanup scripts
  - lightweight internal tools/admin panels
- "Good fit" section with buyer and project signals.
- "Not a fit" section to filter out low-quality or risky work.
- Proof section pulling from selected posts, artifacts, repositories, and case studies.
- Process section:
  - diagnose workflow
  - map the messy handoff/data path
  - ship a small working slice
  - document and hand off
- Contact CTA with expectation-setting.

## Content Requirements

Minimum copy assets for v1:

- one freelance landing page
- revised homepage CTA block
- revised nav label
- revised about-page service pointer
- revised contact intro

Minimum proof assets for v1:

- 3 selected public artifacts or posts that map to freelance lanes
- 1 case-study style post, even if it is a self-owned/public lab project
- portfolio grouping copy for selected repos/builds

Future proof assets:

- 3-5 case studies:
  - Sheets CRM plus follow-up automation
  - reporting dashboard or KPI workflow
  - API integration / CRM sync
  - Python automation cleanup
  - lightweight admin panel/internal tool

## Functional Requirements

- Services page renders statically through the App Router.
- Navigation includes the services page on desktop and mobile.
- Contact flow remains usable without exposing secrets or requiring client-side credentials.
- Page metadata includes title, description, canonical path, and Open Graph basics.
- Sitemap includes new routes automatically or explicitly.
- Existing `/posts` syndication behavior remains intact.
- Existing `/notebook` filtering remains intact.
- Existing markdown post slug behavior remains intact.
- Existing GitHub pinned repo behavior should degrade gracefully if `GITHUB_ACCESS_TOKEN` is missing.
- Contact form should continue to degrade gracefully if email environment variables are missing.

## UX Requirements

- The services page should feel like a quiet, competent operator/developer service page, not a generic startup landing page.
- Keep information dense enough for scanning.
- Avoid over-designed hero treatment, decorative cards, or vague marketing copy.
- Use existing Tailwind/ShadCN conventions.
- Keep cards only for repeated proof items or service lane items.
- Make CTA language direct and practical.
- Ensure mobile text wrapping is clean and no buttons overflow.
- Do not use emojis in professional service copy.

## SEO And Discoverability Requirements

- Target specific intent rather than broad vanity keywords.
- Primary title direction: "Automation, Dashboards, and Internal Tools | Josh Peterson".
- Primary description direction: "Practical Google Sheets, Apps Script, reporting, API integration, and internal tool automation for operations-heavy teams."
- Add structured data for Josh/person or organization profile if it fits the current metadata approach.
- Use internal links from relevant Automation Lab posts to the services page.
- Use the services page URL as the canonical destination for outreach/proposal profiles.

## Analytics And Success Signals

The first phase can be measured manually if no analytics stack is installed.

Track:

- clicks from services page to contact
- contact form submissions mentioning automation/dashboard/internal tools
- proposal/outreach reply rate when linking `/freelance`
- LinkedIn/Gmail/job-board profile clickthrough if available
- which proof links prospects mention in replies
- whether service-page visitors read case studies or posts

Success after 30 days:

- the page is useful enough to link in every relevant outbound/proposal flow
- at least one prospect references the page, a proof artifact, or a specific service lane
- Josh can send a freelance link without explaining the entire offer manually

## Acceptance Criteria

- `/freelance` or `/services` exists and has the full buyer-facing page structure.
- Homepage includes a services CTA that does not displace the public lab identity.
- Navigation includes the services route.
- About page points freelance buyers to the services route.
- Contact page supports freelance inquiries with clear project-fit language.
- Portfolio page or proof section groups selected work by buyer problem.
- At least one case-study style proof asset exists or is explicitly stubbed with a tracked follow-up.
- Metadata and sitemap include the new route.
- `npm run build` completes successfully.
- `npx tsc --noEmit` completes successfully.
- Browser smoke test covers `/`, `/freelance` or `/services`, `/about`, `/portfolio`, `/contact`, `/posts`, `/notebook`, `/robots.txt`, and `/sitemap.xml`.

## Open Questions

- Should the route be `/freelance` or `/services`?
- Should the nav label say `Services`, `Freelance`, or `Work With Me`?
- Should the first CTA route to `/contact`, an email link, or a lightweight project inquiry form?
- Which three proof assets should be featured first?
- Is there a preferred budget/timeline filter to include in the contact form?
- Should the first case study be the freelance revenue ops system itself, the public automation lab, or a Google Sheets CRM artifact?

## Phased Implementation

Phase 1: Buyer Path

- Add services route and copy.
- Add nav/home/about/contact pointers.
- Add metadata and sitemap verification.
- Feature existing proof assets.

Phase 2: Proof Depth

- Add 3-5 case-study posts.
- Improve portfolio grouping by buyer problem.
- Add internal links from automation posts to services.
- Add lightweight inquiry fields if needed.

Phase 3: Validation And Split Decision

- Track inquiries and reply quality for 30 days.
- Decide whether to keep the services layer inside the public lab, rename it, or spin out a separate niche/business domain.
- Consider productized offers only after repeated demand is visible.

## Risks

- The page could dilute the public lab identity if the homepage becomes too sales-heavy.
- Case studies may be too abstract unless each one includes a concrete artifact, before/after workflow, or repo/demo link.
- A generic service page may not help outbound unless it speaks directly to operations-heavy workflow pain.
- Contact form deliverability depends on email environment configuration.
- GitHub proof can look too code-centric unless translated into business problems.

## Dependencies

- Existing Next.js App Router pages and shared components.
- Existing Tailwind/ShadCN styling.
- Existing markdown post lane/content model.
- Existing contact API and environment variables.
- Existing portfolio/GitHub pinned repo integration.

## Future Opportunities

- Dedicated productized "workflow audit" page.
- Downloadable Google Sheets CRM/follow-up checklist.
- Newsletter or email capture for automation artifacts.
- Public template gallery.
- Separate niche site if the small-business automation pilot earns it.
