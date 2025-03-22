---
title: Testing Code Syntax Highlighting
excerpt: This post demonstrates code syntax highlighting with Prism.js in our Next.js blog.
coverImage: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
date: 2025-03-22T10:00:00.000Z
author:
  name: Josh Peterson
  picture: /assets/blog/authors/josh.jpeg
ogImage:
  url: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
id: 01JPYMAR6XGG00194ET01P20EC
---

# Code Syntax Highlighting Test

This post demonstrates how code blocks are styled with syntax highlighting using Prism.js.

## JavaScript Example

```javascript
// This is a JavaScript function
function greeting(name) {
  console.log(`Hello, ${name}!`);
  return `Hello, ${name}!`;
}

// Call the function
const message = greeting('World');
console.log(message);
```

## Python Example

```python
# This is a Python function
def fibonacci(n):
    a, b = 0, 1
    result = []
    while len(result) < n:
        result.append(a)
        a, b = b, a + b
    return result
    
# Generate first 10 Fibonacci numbers
fib_sequence = fibonacci(10)
print(f"First 10 Fibonacci numbers: {fib_sequence}")
```

## TypeScript Example

```typescript
// Interface definition
interface User {
  id: number;
  name: string;
  email: string;
  active?: boolean;
}

// Function that uses the interface
function createUser(userData: Omit<User, 'id'>): User {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData,
    active: userData.active ?? true
  };
}

// Create a new user
const newUser = createUser({
  name: 'Jane Doe',
  email: 'jane@example.com'
});

console.log(newUser);
```

## HTML and CSS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Code Syntax Test</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello, Syntax Highlighting!</h1>
    <p>This is a test HTML document.</p>
  </div>
</body>
</html>
```

## Bash/Shell Example

```bash
#!/bin/bash
# A simple shell script

echo "Starting backup process..."

# Create a timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/$TIMESTAMP"

# Create the backup directory
mkdir -p "$BACKUP_DIR"

# Copy files to backup directory
cp -r /var/www/html "$BACKUP_DIR"
cp -r /etc/nginx "$BACKUP_DIR"

# Create an archive
tar -czf "$BACKUP_DIR.tar.gz" "$BACKUP_DIR"

echo "Backup completed successfully!"
```

## JSON Example

```json
{
  "name": "Code Syntax Test",
  "version": "1.0.0",
  "description": "A test file to demonstrate syntax highlighting",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "keywords": [
    "syntax",
    "highlighting",
    "prism",
    "nextjs"
  ],
  "author": "Josh Peterson",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "react": "^18.2.0",
    "typescript": "^4.9.5"
  }
}
```

## Inline Code

Sometimes you want to include `inline code` within your text. This should be styled differently than regular text and code blocks.

## Conclusion

With Prism.js properly configured, our blog now has beautiful syntax highlighting for code blocks across multiple languages!

