# Josh Peterson Public Automation Lab

This is Josh Peterson's portfolio site, public automation lab, and reporter's notebook.

The site is built with Next.js, Markdown posts, TypeScript, and Tailwind CSS. It publishes two public lanes:

- **Automation Lab**: workflow systems, Google Sheets tools, Apps Script snippets, AI-assisted operations, and practical artifacts.
- **Reporter's Notebook**: cleaned public research logs, source trails, FOIA/public-record methods, and investigation notes.

## Content Model

Posts live in `/_posts` as Markdown files with YAML frontmatter. The filename determines the canonical slug.

Optional lane fields:

```yaml
lane: automation-lab
artifactType: checklist
```

Supported lanes:

- `automation-lab`
- `reporters-notebook`
- `portfolio`

Supported artifact types:

- `template`
- `script`
- `checklist`
- `research-note`
- `source-map`
- `case-study`

Posts without a `lane` default to `automation-lab`.

## Local Runtime

This project targets Node.js `20.19.4`, matching the checked-in `.nvmrc` and `.node-version` files. If you use nvm, run:

```bash
nvm install
nvm use
```

The npm scripts source nvm automatically when it is available, so `npm run build` works even if the parent shell still points at an older Node binary.

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
npx tsc --noEmit
```

## Strategy And Status

- Strategy: `docs/strategy/2026-05-24-public-lab-niche-pilot.md`
- Status: `docs/status.md`
