# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Next.js (App Router, TypeScript) personal blog derived from Vercel’s blog-starter. Content is Markdown in _posts with front matter parsed at build/runtime server-side. Rendering uses components under src/app with dynamic routing for posts.
- Styling: Tailwind CSS (postcss/autoprefixer). Code highlighting via Prism CSS with Markdown-to-HTML done server-side and highlighting completed client-side.

Common commands
- Install deps (npm is implied by package-lock.json):
  - npm install
- Dev server
  - npm run dev
- Build
  - npm run build
- Start production server (after build)
  - npm run start
- Lint and Test
  - No lint or test scripts are currently defined in package.json.
  - If you want linting (recommended for Next.js):
    - Scripts to add: "lint": "next lint"
    - Dev deps (choose your pkg mgr):
      - npm i -D eslint eslint-config-next
  - If you want tests (example with Vitest):
    - Scripts to add: "test": "vitest run", "test:watch": "vitest"
    - Dev deps: npm i -D vitest @vitest/coverage-v8
    - Run a single test (once configured): npm run test -- path/to/file.test.ts

High-level architecture
- Content source
  - _posts/*.md holds blog posts with front matter. The filename determines the canonical slug used in routes and linking, not the H1 title.
- Content loading and slug strategy
  - src/lib/api.ts reads _posts using fs + gray-matter. It normalizes Dropbox symlink vs CloudStorage paths to avoid path issues on macOS.
  - It derives the URL slug from the filename (filenameToSlug), carefully handling URL encoding and potential double-encoding; when given a slug, it resolves back to a filename (slugToFilename) with safe fallbacks.
  - getAllPosts() filters for .md, maps through getPostBySlug(), augments with extracted heading, and sorts by date descending.
- Markdown pipeline
  - src/lib/markdownToHtml.ts uses remark + remark-gfm + remark-html to convert Markdown to HTML. It then:
    - Normalizes <pre><code> blocks for Prism client-side highlighting
    - Extracts the first H1 and removes it from the rendered content, returning { heading, content } so the H1 can be used as the page title while avoiding duplicate headings in the body
- Routing and rendering (App Router)
  - src/app/posts/[slug]/page.tsx loads a post by slug via getPostBySlug(), runs markdownToHtml(), and renders PostHeader + PostBody.
  - generateStaticParams() enumerates posts so static paths are generated; generateMetadata() builds <head> metadata using the extracted H1 when available.
  - src/app/posts/page.tsx is a client page that lists posts with search/suggestions. It merges local posts (via /api/posts) with external RSS feeds (via /api/proxy-rss?url=...). It computes excerpts by stripping HTML/CDATA and chooses cover images from post fields or parsed RSS content.
  - Shared UI in src/app/_components (headers, hero/preview cards, markdown styles, etc.) and TitleUpdater integrates with a context to update document.title on client pages.
- Data and APIs
  - src/pages/api/posts.ts exposes local Markdown posts as JSON (server-side fs read via getAllPosts()). Useful for client pages that need a consolidated list.
  - src/lib/rss.ts provides fetchRSSFeeds(feedUrls) using rss-parser with custom fields for media and encoded content, with helpers to extract a safe snippet.
  - src/pages/api/proxy-rss.ts proxies external feeds to avoid CORS issues; client pages call /api/proxy-rss?url=...
  - src/pages/api/contact.js posts email via nodemailer using Gmail service; requires EMAIL_USER and EMAIL_PASS.
  - src/lib/github.ts fetches pinned repos via GitHub GraphQL API and requires GITHUB_ACCESS_TOKEN.
- Environment and configuration
  - next.config.js loads dotenv and exposes env keys to the app: GITHUB_ACCESS_TOKEN, EMAIL_USER, EMAIL_PASS. Ensure these are set in a local .env (not committed) before running features that need them.
  - tsconfig.json targets ESNext modules, strict TS, with a path alias @/* -> ./src/*.
- Images and assets
  - next.config.js images.remotePatterns whitelist external hosts: cdn.midjourney.com, cdn.pixabay.com, cdn-images-1.medium.com, img.youtube.com, images.unsplash.com, substackcdn.com. Next/Image will only optimize remote images from these hosts.
  - src/app/prism.css and src/app/globals.css provide global styles and code highlighting; Tailwind is configured via devDependencies (tailwindcss, postcss, autoprefixer).

Operational tips specific to this repo
- Adding a post
  - Create _posts/your-post-title.md with front matter: title, date, author, coverImage, excerpt, ogImage, etc. The filename (not the title) defines the route slug. Special characters and spaces are supported but will be URL-encoded by the loader.
- External feeds on the Blog page
  - Feeds are specified in src/app/posts/page.tsx and loaded client-side through /api/proxy-rss. Update those URLs to change sources.
- Gmail contact form
  - The /pages/api/contact.js endpoint uses Gmail SMTP. Configure EMAIL_USER and EMAIL_PASS in your environment; for production consider app passwords or a dedicated SMTP provider.

Pointers
- README.md explains the starter lineage and where posts live. For deployment, use standard Next.js/Vercel guidance.

