# AGENTS.md

This file provides guidance to Codex and other coding agents when working with code in this repository.

Project overview
- Next.js (App Router + Pages Router hybrid) portfolio site, public automation lab, and reporter's notebook
- Mixed routing: App Router for UI (src/app), Pages Router for APIs (src/pages/api)
- Content: Markdown files in _posts with front matter, parsed at build/runtime server-side
- Public lanes: `automation-lab`, `reporters-notebook`, and `portfolio`
- Styling: Tailwind CSS + ShadCN UI components (src/components/ui)
- Code highlighting: Prism.js applied client-side after markdown-to-HTML conversion
- External writing is normalized server-side through src/lib/syndication.ts and src/app/api/syndicated-posts/route.ts. The local-plus-syndicated feed merge is a signature feature, so preserve it when changing `/posts` behavior.

Common commands
- Install deps (npm is implied by package-lock.json):
  - npm install
- Dev server
  - npm run dev
  - npm run dev -- -p 3001  # Use different port
- Build
  - npm run build
  - rm -rf .next && npm run build  # Clean build
- Start production server (after build)
  - npm run start
- Type checking
  - npx tsc --noEmit
- Lint and Test
  - No lint or test scripts are currently defined in package.json.
  - If you want linting (recommended for Next.js):
    - Scripts to add: "lint": "next lint"
    - Dev deps: npm i -D eslint eslint-config-next
  - If you want tests (example with Vitest):
    - Scripts to add: "test": "vitest run", "test:watch": "vitest"
    - Dev deps: npm i -D vitest @vitest/coverage-v8
    - Run a single test: npm run test -- path/to/file.test.ts

Environment setup
- Create .env file with required variables:
  - GITHUB_ACCESS_TOKEN: GitHub personal access token for fetching pinned repos (portfolio page)
  - EMAIL_USER: Gmail address for contact form
  - EMAIL_PASS: Gmail app password (not regular password) for SMTP
- Without these, specific features will fail silently - homepage won't show pinned repos, contact form won't send emails

Image handling
- Blog post images should be stored in `public/assets/blog/images/`
- Reference images in frontmatter with paths starting with `/assets/blog/images/`
- Example frontmatter:
  ```yaml
  coverImage: /assets/blog/images/post-name-cover.png
  ogImage:
    url: /assets/blog/images/post-name-cover.png
  ```
- Images in public directory are served from root URL in Next.js
- Use descriptive filenames like `post-slug-cover.png` for organization
- Supported formats: PNG, JPG, WebP (PNG recommended for quality)
- External image URLs (CDN) are supported but local images load faster

High-level architecture
- Content source
  - _posts/*.md holds blog posts with front matter. The filename determines the canonical slug used in routes and linking, not the H1 title.
  - Optional frontmatter fields `lane` and `artifactType` classify posts for the public lab. Missing `lane` values default to `automation-lab`.
  - Supported lanes are `automation-lab`, `reporters-notebook`, and `portfolio`. Supported artifact types are `template`, `script`, `checklist`, `research-note`, `source-map`, and `case-study`.
- Content loading and slug strategy
  - src/lib/api.ts reads _posts using fs + gray-matter. It normalizes Dropbox symlink vs CloudStorage paths to avoid path issues on macOS.
  - URL slug encoding: filenameToSlug() converts filenames to URL-safe slugs, detecting and preventing double-encoding (checks for %25 and % patterns)
  - Slug decoding: slugToFilename() safely decodes URLs back to filenames, handling double-encoded slugs (%2520 → space) with fallbacks
  - Special characters in filenames (apostrophes, spaces, unicode) are preserved through encode/decode cycle
  - getAllPosts() filters for .md, maps through getPostBySlug(), augments with extracted heading, and sorts by date descending.
- Dropbox path normalization (macOS specific)
  - getPostsDirectory() handles two scenarios: symlink path (/Users/*/Dropbox) vs actual path (/Users/*/Library/CloudStorage/Dropbox)
  - Automatically detects and normalizes paths to prevent "posts not found" errors
  - If posts aren't loading, check process.cwd() output and _posts directory location
- Markdown pipeline
  - src/lib/markdownToHtml.ts uses remark + remark-gfm + remark-html to convert Markdown to HTML. It then:
    - Normalizes <pre><code> blocks for Prism client-side highlighting
    - Extracts the first H1 and removes it from the rendered content, returning { heading, content } so the H1 can be used as the page title while avoiding duplicate headings in the body
- Routing and rendering (App Router)
  - src/app/posts/[slug]/page.tsx loads a post by slug via getPostBySlug(), runs markdownToHtml(), and renders PostHeader + PostBody.
  - generateStaticParams() enumerates posts so static paths are generated; generateMetadata() builds <head> metadata using the extracted H1 when available.
  - src/app/posts/page.tsx is a client page that lists local Markdown posts with search/suggestions via /api/posts and normalized external writing via /api/syndicated-posts.
  - src/app/notebook/page.tsx lists only `reporters-notebook` posts and should remain a cleaned public research surface, not a raw reporting dump.
  - Shared UI in src/app/_components (headers, hero/preview cards, markdown styles, etc.) and TitleUpdater integrates with a context to update document.title on client pages.
- Data and APIs
  - src/pages/api/posts.ts exposes local Markdown posts as JSON (server-side fs read via getAllPosts()). Useful for client pages that need a consolidated list.
  - src/lib/rss.ts provides fetchRSSFeeds(feedSources) using rss-parser with custom fields for media and encoded content, with helpers to extract a safe snippet.
  - src/lib/syndication.ts combines native RSS sources with the Steemit JSON-RPC adapter from src/lib/steemit.ts.
  - src/app/api/syndicated-posts/route.ts exposes normalized external writing and avoids client-side CORS/proxy URL handling.
  - src/pages/api/contact.js posts email via nodemailer using Gmail service; requires EMAIL_USER and EMAIL_PASS.
  - src/lib/github.ts fetches pinned repos via GitHub GraphQL API and requires GITHUB_ACCESS_TOKEN.
- Environment and configuration
  - next.config.js loads dotenv and exposes env keys to the app: GITHUB_ACCESS_TOKEN, EMAIL_USER, EMAIL_PASS. Ensure these are set in a local .env (not committed) before running features that need them.
  - tsconfig.json targets ESNext modules, strict TS, with a path alias @/* -> ./src/*.
- Images and assets
  - next.config.js images.remotePatterns whitelist external hosts used by local posts and syndicated posts. Next/Image will only optimize remote images from these hosts, so add a host there before returning a new syndicated image domain.
  - src/app/prism.css and src/app/globals.css provide global styles and code highlighting; Tailwind is configured via devDependencies (tailwindcss, postcss, autoprefixer).

Operational tips specific to this repo
- Adding a post
  - Create _posts/your-post-title.md with front matter: title, date, author, coverImage, excerpt, ogImage, etc. The filename (not the title) defines the route slug. Special characters and spaces are supported but will be URL-encoded by the loader.
- External feeds on the Lab Notes page
  - Native RSS sources are specified in src/lib/syndication.ts and loaded server-side through /api/syndicated-posts. Steemit syndication uses src/lib/steemit.ts instead of an RSS.app wrapper.
- Gmail contact form
  - The /pages/api/contact.js endpoint uses Gmail SMTP. Configure EMAIL_USER and EMAIL_PASS in your environment; for production consider app passwords or a dedicated SMTP provider.

Pointers
- README.md explains the public lab direction and content model. For deployment, use standard Next.js/Vercel guidance.
