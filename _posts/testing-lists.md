---
title: Testing Lists with remark-gfm
excerpt: A test post to verify that lists and other GitHub Flavored Markdown features are working correctly.
coverImage: https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80
date: 2023-11-15T05:35:07.322Z
author:
  name: Test User
  picture: /assets/blog/authors/jj.jpeg
ogImage:
  url: https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80
id: 01JPYR5TAR4HF3WVYDF8YAZ8TT
---

# Testing Lists with remark-gfm

This post tests various types of lists to make sure they're rendering correctly.

![A well-organized workspace with a notebook showing a checklist and to-do items](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)
*Photo by [Andrew Neel](https://unsplash.com/@andrewtneel) on [Unsplash](https://unsplash.com/)*

## Unordered Lists

* First item
* Second item
    * Nested item 1
    * Nested item 2
* Third item

## Ordered Lists

1. First item
2. Second item
    1. Nested item 1
    2. Nested item 2
3. Third item

## Task Lists

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Mixed Lists

1. First ordered item
    * Unordered nested item
    * Another unordered nested item
2. Second ordered item
    1. Ordered nested item
    2. Another ordered nested item

## Other GitHub Flavored Markdown Features

### Tables

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Strikethrough

~~This text is strikethrough~~

### URL Auto-linking

Visit https://example.com

### Code Fences

```javascript
function hello() {
  console.log('Hello, world!');
}
```

