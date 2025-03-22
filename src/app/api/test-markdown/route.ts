import { NextResponse } from 'next/server';
import markdownToHtml from '@/lib/markdownToHtml';

export async function GET() {
  const markdown = `
# Testing Lists

## Unordered List
* Item 1
* Item 2
  * Nested Item 2.1
  * Nested Item 2.2
* Item 3

## Ordered List
1. First
2. Second
   1. Nested First
   2. Nested Second
3. Third

## Task List
- [x] Completed task
- [ ] Incomplete task
`;

  try {
    const html = await markdownToHtml(markdown);
    
    return NextResponse.json({
      success: true,
      html: html,
      markdown: markdown
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 });
  }
}

