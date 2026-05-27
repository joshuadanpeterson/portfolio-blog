# Portfolio Blog Status

Last updated: 2026-05-25 01:58 MDT

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

## Open Questions

- Whether the niche pilot earns its own name, newsletter, or domain after validation.
- Which artifact format gets the strongest response: Sheet template, Apps Script snippet, checklist, or teardown.
- Whether the Reporter's Notebook should later split into public records, source trails, and methods sub-pages.

## Next Verification

- Smoke-test `/posts` and `/api/syndicated-posts` in a browser-backed local run after the merge.
- Verify `/`, `/about`, `/posts`, `/notebook`, `/portfolio`, `/robots.txt`, and `/sitemap.xml` before publishing.
