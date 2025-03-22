import markdownToHtml from './markdownToHtml';

async function testMarkdownLists() {
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
`;

  const html = await markdownToHtml(markdown);
  console.log('Generated HTML:');
  console.log(html);
}

// Run the test
testMarkdownLists();

export {};

