# Portfolio Blog Status

Last updated: 2026-06-04 21:13 MDT

## Current Direction

The site is being repositioned as a public automation lab with a visible reporter's notebook. The first niche pilot is small-business AI workflow automation, beginning with Google Sheets CRM and follow-up systems for solo consultants and freelancers.

## Implementation Notes

- `/posts` remains the all-content index.
- `/posts` now merges local Markdown posts with normalized syndicated posts from Medium, Substack, and Steemit via `/api/syndicated-posts`.
- `/notebook` filters public notes to `lane: reporters-notebook`.
- Posts without a `lane` in frontmatter default to `automation-lab`.
- Major automation posts should include a practical artifact.
- Notebook posts should include an evidence artifact such as a source trail, public-record method, or open-question list.
- The old client-side `/api/proxy-rss` flow has been replaced by server-side syndication helpers in `src/lib/syndication.ts` and `src/lib/steemit.ts`.
- The first freelance services layer is implemented at `/freelance`, with `Services` in the nav, homepage/about/contact entry points, project-fit contact fields, sitemap coverage, and a public case-study proof asset.
- The next buyer-path expansion keeps `/freelance` focused on automation, adds `/work-with-me` as the main hub, and adds `/writing` for technical editorial writing plus AI-assisted creative production as a sub-offer. The nav now points to `Work With Me`.

## Open Questions

- Whether the niche pilot earns its own name, newsletter, or domain after validation.
- Which artifact format gets the strongest response: Sheet template, Apps Script snippet, checklist, or teardown.
- Whether the Reporter's Notebook should later split into public records, source trails, and methods sub-pages.
- Which deeper proof assets should come next for the freelance services layer: Sheets CRM, reporting dashboard, API/CRM sync, Python cleanup, or lightweight admin panel case studies.

## Next Verification

- Smoke-test `/posts` and `/api/syndicated-posts` in a browser-backed local run after the merge.
- Before publishing, recheck the full buyer-path smoke set: `/`, `/work-with-me`, `/freelance`, `/writing`, `/about`, `/portfolio`, `/contact?type=freelance`, `/contact?type=writing`, `/posts`, `/notebook`, `/robots.txt`, `/sitemap.xml`, and `/posts/public-automation-lab-freelance-services-case-study`.

## Recent Verification

- 2026-06-03 19:10 MDT: `npm run build` passed; route table included `/freelance` and `/posts/public-automation-lab-freelance-services-case-study`.
- 2026-06-03 19:10 MDT: `npx tsc --noEmit` passed after the build regenerated `.next/types`.
- 2026-06-03 19:10 MDT: Local smoke checks returned 200 for `/`, `/freelance`, `/about`, `/portfolio`, `/contact?type=freelance`, `/posts`, `/notebook`, `/robots.txt`, `/sitemap.xml`, and the new case-study post.
