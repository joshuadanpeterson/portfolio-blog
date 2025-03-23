---
title: Rendering Markdown Lists in Next.js - A Step-by-Step Guide
date_created: 2025-03-22 04:51:25
date_modified: 2025-03-22 05:52:16
tags: 
favorite: 
id: 01JQ02CDWYYS923XPH76RZ8J8X
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80
date: 2025-03-22T12:00:00.000Z
excerpt: Here’s how I transform Markdown lists from Obsidian into HTML for my Next.js blog
ogImage:
  url: https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80
---
Picture this: You’ve poured your heart into drafting the perfect blog post in [Obsidian](https://obsidian.md/), complete with crisp Markdown lists and handy task checkboxes. You hit publish on your [Next.js](https://nextjs.org/) blog, only to find your beautifully structured lists look like a jumbled mess. Sound familiar? In today’s web development hustle, where every pixel counts, nailing that polished presentation isn’t just nice—it’s a must. Lucky for you, there’s a way to make those Markdown lists pop on your site, and I’m about to spill the secrets. Whether it’s nested bullets or checked-off tasks, this guide will transform your content into a reader’s dream, effortlessly bridging Obsidian and Next.js. Ready to level up your blog game? Let’s dive in!

### The Rendering Process

Here’s how I transform Markdown lists from Obsidian into HTML for my Next.js blog:  

1. **Processing Markdown Content**:  
   I write blog posts in Obsidian using Markdown. These drafts are processed by a TypeScript file, `markdownToHtml.ts`, which converts the Markdown into HTML. This ensures that list structures—like bullets, numbers, and checkboxes—are accurately translated for the web.

2. **Using the remarkGfm Plugin**:  
   To support advanced Markdown features, I use the [remarkGfm](https://github.com/remarkjs/remark-gfm) plugin with the `remark` library. This plugin enables GitHub Flavored Markdown (GFM) features, such as task lists with checkboxes, which I often use in Obsidian.

3. **Styling with CSS**:  
   After conversion, I style the HTML lists using a CSS module, `markdown-styles.module.css`. This file defines:  
   - `ul`: Unordered lists with disc bullets.  
   - `ol`: Ordered lists with decimal numbering.  
   - Task lists with functional checkboxes.  
   - Spacing and indentation for nested lists.

4. **Testing with a Markdown File**:  
   I test the process using `markdown-test.md`, a file with various list types—unordered, ordered, mixed, and task lists—to ensure everything renders correctly.

Here are examples of how these lists look after rendering:

#### Unordered Lists

```markdown
- Item 1
- Item 2
- Item 3
  - Nested item 3.1
  - Nested item 3.2
- Item 4
```

**Renders as:**  
- Item 1  
- Item 2  
- Item 3  
  - Nested item 3.1  
  - Nested item 3.2  
- Item 4  

#### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
4. 1. Nested item 3.1
5. 2. Nested item 3.2
6. Fourth item
```

**Renders as:**  
1. First item  
2. Second item  
3. Third item  
4. 1. Nested item 3.1  
5. 2. Nested item 3.2  
6. Fourth item  

#### Mixed Lists

```markdown
- Unordered item
  1. Ordered sub-item 1
  2. Ordered sub-item 2
- Another unordered item
  - Unordered sub-item
  - Another unordered sub-item
```

**Renders as:**  
- Unordered item  
  1. Ordered sub-item 1  
  2. Ordered sub-item 2  
- Another unordered item  
  - Unordered sub-item  
  - Another unordered sub-item  

#### Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
  - [x] Completed subtask
  - [ ] Incomplete subtask
```

**Renders as:**  
- [x] Completed task  
- [ ] Incomplete task  
- [ ] Another task  
  - [x] Completed subtask  
  - [ ] Incomplete subtask  

### The `markdownToHtml.ts` File: How It Works

The core of this process is the `markdownToHtml.ts` file. Here’s the code, followed by a breakdown:

```typescript
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  
  // Convert the markdown to HTML first
  let content = result.toString();
  
  // Adjust code block classes for Prism.js highlighting
  content = content.replace(
    /<pre><code class=\"language-(\w+)\">/g,
    '<pre class="language-$1"><code class="language-$1">'
  );
  
  return content;
}
```

#### Code Breakdown

- **Markdown Processing**:  
  - `remark()` initializes the processor.  
  - `.use(remarkGfm)` adds GFM support for features like task lists and complex list structures.  
  - `.use(html, { sanitize: false })` converts the processed Markdown to HTML, preserving raw HTML (with caution for security).  
  - `.process(markdown)` applies these steps to the input Markdown string.

- **HTML Output**:  
  - `result.toString()` generates the HTML string, including list tags (`<ul>`, `<ol>`, `<li>`) and checkbox inputs for task lists.

- **Syntax Highlighting Setup**:  
  - The `replace` method tweaks `<pre><code>` tags (e.g., `language-typescript`) to match Prism.js conventions. This ensures code blocks are highlighted client-side when the page loads.

#### Example Transformation

For a task list like:

```markdown
- [x] Write blog post
- [ ] Publish blog post
```

The function outputs:

```html
<ul>
  <li><input type="checkbox" checked disabled> Write blog post</li>
  <li><input type="checkbox" disabled> Publish blog post</li>
</ul>
```

This HTML is then styled with CSS and enhanced with JavaScript (e.g., Prism.js for code blocks).

### Tying It All Together

The `markdownToHtml.ts` output integrates with:  

- **Styling**: `markdown-styles.module.css` applies visual rules to lists and checkboxes.  
- **Testing**: `markdown-test.md` confirms all list types render as expected.

This workflow—using `markdownToHtml.ts`, [remark-gfm](https://github.com/remarkjs/remark-gfm), and CSS—ensures that my [Obsidian](https://obsidian.md/) Markdown lists become polished HTML on my [Next.js](https://nextjs.org/) blog. It handles everything from simple bullet points to nested task lists with ease.