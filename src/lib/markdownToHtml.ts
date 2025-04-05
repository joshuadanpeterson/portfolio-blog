import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

// Define a type for the return value with both heading and content
type MarkdownResult = {
  heading: string | null;
  content: string;
};

export default async function markdownToHtml(markdown: string): Promise<MarkdownResult> {
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(markdown);
  
  // Convert the markdown to HTML first
  let content = result.toString();
  
  // Then apply Prism.js highlighting using browser-side JavaScript
  // The actual highlighting will happen client-side when Prism.js runs
  content = content.replace(/<pre><code class=\"language-(\w+)\">/g, '<pre class="language-$1"><code class="language-$1">');
  
  // Extract the first H1 tag and its content
  let heading: string | null = null;
  const h1Regex = /<h1>(.*?)<\/h1>/;
  const h1Match = content.match(h1Regex);
  
  if (h1Match && h1Match[1]) {
    // Store the heading text
    heading = h1Match[1];
    
    // Remove the first H1 tag from the content
    content = content.replace(h1Match[0], '');
  }
  
  return {
    heading,
    content
  };
}
