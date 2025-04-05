---
title: code-highlighting-in-nextjs-using-prismjs-with-markdown
date_created: 2025-03-22 03:53:15
date_modified: 2025-04-04 09:42:27
tags: 
favorite: 
id: 01JPYMAR6XGG00194ET01P20EC
author:
  name: Josh Peterson
  picture: /assets/blog/authors/2017_profile_pic.jpg
coverImage: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
date: 2025-03-22T10:00:00.000Z
excerpt: This post demonstrates code syntax highlighting with Prism.js in our Next.js blog.
ogImage:
  url: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---
# Code Highlighting in Next.js - Using Prism.js with Markdown

**Say goodbye to plain code blocks.** If you're building a [Next.js](https://nextjs.org/) blog and drafting posts in [Obsidian](https://obsidian.md/), you might have noticed that your code blocks don’t look as polished on your blog as they do in your markdown editor. Without syntax highlighting, code can be hard to read and less engaging for your readers. That’s where **[Prism.js](https://prismjs.com/)** comes in—a lightweight, extensible syntax highlighter that seamlessly integrates with Next.js to bring vibrant syntax highlighting to your code blocks. In this post, we’ll explore how Prism.js works to display code blocks when converting markdown to HTML in a Next.js blog, ensuring that your Obsidian-authored posts render properly with beautiful highlighting.

Before diving into the setup, let’s briefly understand what Prism.js is and why it’s so effective.

---

## What is Prism.js?

Prism.js is a lightweight, extensible syntax highlighter designed to format and color-code programming languages within code blocks. It’s widely used in web development due to its simplicity, customization options, and compatibility with frameworks like Next.js. For blogs that source content from markdown files—such as those created in Obsidian—Prism.js is an excellent tool to ensure code blocks are displayed with proper syntax highlighting, making technical content more readable and visually appealing.

---

## Common Issues with Code Blocks and How Prism.js Solves Them

If you’re struggling with code blocks not rendering properly in your Next.js blog, especially when using markdown files from Obsidian, you’re not alone. Here are some common issues you might encounter:

- **No syntax highlighting**: Code appears as plain text, making it hard to read and understand.
- **Incorrect language detection**: The wrong programming language might be assumed, leading to mismatched or missing highlighting.
- **Broken formatting**: Indentation, line breaks, or special characters can get mangled, ruining the code’s structure.
- **Performance slowdowns**: Large code blocks might slow down your page if the rendering process isn’t optimized.

Fortunately, Prism.js offers a straightforward and effective way to overcome these challenges:

- **Rich syntax highlighting**: Prism.js applies language-specific rules to color-code keywords, strings, and other elements, transforming plain code into visually appealing and readable blocks.
- **Precise language support**: By specifying the language in your markdown (e.g., ```` ```javascript ````), Prism.js ensures the correct highlighting rules are applied every time.
- **Intact formatting**: Your code’s original structure—indentation, line breaks, and special characters—remains perfectly preserved.
- **Lightweight and efficient**: Prism.js is optimized for performance, and you can load only the language definitions you need, keeping your blog fast and responsive.

With Prism.js, your code blocks go from bland and broken to polished and professional, enhancing both the aesthetics and functionality of your blog.

---

## How Prism.js Works in Next.js with Markdown

Now that we’ve seen the problems Prism.js solves, let’s explore how to implement it in your Next.js blog to ensure your Obsidian markdown files render beautifully.

When building a blog with Next.js, markdown files (like those drafted in Obsidian) are typically converted to HTML for rendering on the web. Code blocks within these markdown files require special handling to achieve syntax highlighting, and Prism.js integrates seamlessly into this process. Here’s how:

### 1. Markdown to HTML Conversion

Use a markdown processing library like `remark` or `markdown-it` in your Next.js project. These tools take your Obsidian markdown files and transform them into HTML, turning code blocks into `<pre><code>` tags. For example, a markdown code block like this:

```javascript
console.log("Hello, World!");
```

becomes:

```html
<pre><code>console.log("Hello, World!");</code></pre>
```

### 2. Adding Language Classes

Configure your markdown processor to include the language identifier as a class on the `<code>` tag. For instance, ```` ```javascript ```` should produce:

```html
<pre><code class="language-javascript">console.log("Hello, World!");</code></pre>
```

This class tells Prism.js which language’s highlighting rules to apply. Most markdown processors support this with plugins or configuration—check your library’s documentation to ensure this step works with your Obsidian files.

### 3. Prism.js Initialization in Next.js

Install Prism.js via npm (`npm install prismjs`), then import it into your Next.js component. Add your preferred theme (e.g., `prismjs/themes/prism-okaidia.css`) and call `Prism.highlightAll()` to activate highlighting. Here’s a basic example:

```javascript
import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Import a Prism theme

export default function BlogPost({ htmlContent }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
```

This ensures Prism.js processes all code blocks on the page after the HTML is rendered.

### 4. Styling with CSS Themes

Prism.js provides a variety of CSS themes that define the colors and styles for different code tokens, such as keywords, strings, and comments. By including a theme in your Next.js project, your code blocks will be styled consistently and attractively.

### 5. Rendering in the Browser

When the Next.js page loads, Prism.js scans the DOM for `<code>` elements with `language-*` classes and applies the appropriate highlighting based on the specified language and theme.

By following these steps, you ensure that the code blocks you carefully crafted in Obsidian are displayed with the same clarity and style on your Next.js blog.

---

## Why Prism.js is Perfect for Rendering Obsidian Markdown Files in Next.js

If you’re using Obsidian to draft your blog posts, Prism.js is an ideal companion for several reasons:

- **Seamless Compatibility**: Obsidian uses standard markdown syntax for code blocks, including language specifiers (e.g., ```` ```javascript ````). Prism.js relies on these specifiers to apply the correct highlighting, so your Obsidian files are ready to go without any extra tweaking.
- **Consistency Across Platforms**: With Prism.js, the code blocks you see in Obsidian will look just as polished on your Next.js blog. This ensures that your readers experience the same readability and visual appeal that you intended when writing.
- **Lightweight and Customizable**: Prism.js is efficient and allows you to include only the languages you need, keeping your blog fast and responsive—perfect for technical content.

By integrating Prism.js, you bridge the gap between your markdown editor and your blog, ensuring that your code blocks are not only functional but also visually engaging.

---

## Example: Highlighted Code Block

Here’s an example of a JavaScript code block as it would appear in an Obsidian markdown file and how Prism.js highlights it in a Next.js blog:

### Markdown in Obsidian

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World"));
```

### Rendered HTML with Prism.js

```html
<pre><code class="language-javascript">
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("World"));
</code></pre>
```

When Prism.js processes this, keywords like `function` and `return` might turn blue, strings like `"World"` might turn green, and the overall block will be styled according to the chosen theme, making it easy to read.

---

## Conclusion

If you’ve been frustrated by plain or poorly rendered code blocks in your Next.js blog, especially when sourcing content from Obsidian, Prism.js is the solution you’ve been looking for. By following the steps outlined in this post—converting markdown to HTML, adding language classes, and initializing Prism.js—you can transform your code blocks into vibrant, readable elements that enhance your technical content. With Prism.js, your blog will not only function smoothly but also look professional, making your readers’ experience as enjoyable as your writing process in Obsidian.