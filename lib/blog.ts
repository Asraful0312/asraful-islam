"use client";

import type { Blog } from "./types";

const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Building Modern Web Applications with Next.js 14",
    slug: "building-modern-web-applications-nextjs-14",
    excerpt:
      "Explore the latest features in Next.js 14 and learn how to build performant, scalable web applications with the App Router, Server Components, and more.",
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>Next.js 14 brings exciting new features and improvements that make building modern web applications easier and more efficient than ever before. In this comprehensive guide, we'll explore the key features and best practices for leveraging Next.js 14 in your projects.</p>
      
      <h2 id="getting-started">Getting Started</h2>
      <p>To get started with Next.js 14, you'll need to have Node.js installed on your machine. The recommended way to create a new Next.js project is using the create-next-app command:</p>
      
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
      
      <p>This command creates a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured out of the box.</p>
      
      <h3>App Router</h3>
      <p>The App Router is the recommended way to build applications in Next.js 14. It provides a more intuitive file-based routing system and better support for React Server Components.</p>
      
      <h2 id="best-practices">Best Practices</h2>
      <p>When building with Next.js 14, consider these best practices:</p>
      
      <ul>
        <li>Use Server Components by default for better performance</li>
        <li>Implement proper error boundaries</li>
        <li>Optimize images with the next/image component</li>
        <li>Leverage static generation when possible</li>
      </ul>
      
      <h2 id="conclusion">Conclusion</h2>
      <p>Next.js 14 represents a significant step forward in React-based web development. By following the patterns and practices outlined in this guide, you'll be well-equipped to build modern, performant web applications.</p>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readingTime: 8,
    categories: ["Web Development", "React"],
    tags: ["Next.js", "React", "TypeScript", "Web Development", "JavaScript"],
  },
  {
    id: "blog-2",
    title: "Mastering CSS Grid: A Complete Guide",
    slug: "mastering-css-grid-complete-guide",
    excerpt:
      "Learn everything you need to know about CSS Grid, from basic concepts to advanced techniques for creating complex layouts with ease.",
    content: `
      <h2>Introduction to CSS Grid</h2>
      <p>CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease. Unlike Flexbox, which is primarily one-dimensional, Grid is designed for two-dimensional layouts.</p>
      
      <h2>Basic Grid Concepts</h2>
      <p>Understanding the fundamental concepts of CSS Grid is crucial for mastering this layout system:</p>
      
      <ul>
        <li><strong>Grid Container:</strong> The parent element with display: grid</li>
        <li><strong>Grid Items:</strong> The direct children of the grid container</li>
        <li><strong>Grid Lines:</strong> The dividing lines that make up the structure of the grid</li>
        <li><strong>Grid Tracks:</strong> The space between two adjacent grid lines</li>
      </ul>
      
      <h2>Creating Your First Grid</h2>
      <p>Let's start with a simple example:</p>
      
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 100px;
  gap: 10px;
}</code></pre>
      
      <p>This creates a 3x2 grid with equal column widths and 100px row heights.</p>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2024-01-10",
    readingTime: 12,
    categories: ["CSS", "Web Development"],
    tags: ["CSS", "Grid", "Layout", "Responsive Design", "Frontend"],
  },
  {
    id: "blog-3",
    title: "The Future of JavaScript: ES2024 Features",
    slug: "future-javascript-es2024-features",
    excerpt:
      "Discover the latest JavaScript features coming in ES2024 and how they'll improve your development experience and code quality.",
    content: `
      <h2>What's New in ES2024</h2>
      <p>ES2024 brings several exciting new features to JavaScript that will enhance developer productivity and code readability.</p>
      
      <h2>Top Features to Watch</h2>
      <p>Here are the most significant additions in ES2024:</p>
      
      <h3>1. Array Grouping</h3>
      <p>The new Object.groupBy() method makes it easier to group array elements:</p>
      
      <pre><code>const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 25 }
];

const grouped = Object.groupBy(people, person => person.age);
// { 25: [...], 30: [...] }</code></pre>
      
      <h3>2. Promise.withResolvers()</h3>
      <p>This new method provides a more convenient way to create promises with external resolve/reject functions.</p>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2024-01-05",
    readingTime: 6,
    categories: ["JavaScript", "Programming"],
    tags: [
      "JavaScript",
      "ES2024",
      "Programming",
      "Web Development",
      "Features",
    ],
  },
  {
    id: "blog-4",
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt:
      "Learn the essential principles and techniques for creating web applications that are accessible to all users, including those with disabilities.",
    content: `
      <h2>Why Accessibility Matters</h2>
      <p>Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. It's not just the right thing to do—it's also a legal requirement in many jurisdictions.</p>
      
      <h2>Key Accessibility Principles</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) are built on four main principles:</p>
      
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
        <li><strong>Operable:</strong> Interface components must be operable</li>
        <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough for various assistive technologies</li>
      </ul>
      
      <h2>Practical Implementation</h2>
      <p>Here are some practical steps you can take to improve accessibility:</p>
      
      <h3>Semantic HTML</h3>
      <p>Use proper HTML elements for their intended purpose:</p>
      
      <pre><code>&lt;button&gt;Click me&lt;/button&gt;
&lt;nav&gt;...&lt;/nav&gt;
&lt;main&gt;...&lt;/main&gt;
&lt;article&gt;...&lt;/article&gt;</code></pre>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2023-12-28",
    readingTime: 10,
    categories: ["Accessibility", "Web Development"],
    tags: ["Accessibility", "WCAG", "Inclusive Design", "Web Standards", "UX"],
  },
  {
    id: "blog-5",
    title: "Optimizing React Performance: Tips and Tricks",
    slug: "optimizing-react-performance-tips-tricks",
    excerpt:
      "Discover proven techniques for optimizing React application performance, from component optimization to bundle size reduction.",
    content: `
      <h2>Understanding React Performance</h2>
      <p>React performance optimization is crucial for creating smooth, responsive user experiences. Understanding how React works under the hood is the first step to optimization.</p>
      
      <h2>Common Performance Issues</h2>
      <p>Before diving into solutions, let's identify common performance bottlenecks:</p>
      
      <ul>
        <li>Unnecessary re-renders</li>
        <li>Large bundle sizes</li>
        <li>Inefficient state management</li>
        <li>Memory leaks</li>
        <li>Blocking the main thread</li>
      </ul>
      
      <h2>Optimization Techniques</h2>
      
      <h3>1. Memoization</h3>
      <p>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders:</p>
      
      <pre><code>const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);
  
  return &lt;div&gt;{processedData}&lt;/div&gt;;
});</code></pre>
      
      <h3>2. Code Splitting</h3>
      <p>Split your code into smaller chunks using dynamic imports:</p>
      
      <pre><code>const LazyComponent = lazy(() => import('./LazyComponent'));</code></pre>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2023-12-20",
    readingTime: 15,
    categories: ["React", "Performance"],
    tags: ["React", "Performance", "Optimization", "JavaScript", "Frontend"],
  },
  {
    id: "blog-6",
    title: "Introduction to TypeScript for JavaScript Developers",
    slug: "introduction-typescript-javascript-developers",
    excerpt:
      "Make the transition from JavaScript to TypeScript with this comprehensive guide covering types, interfaces, and best practices.",
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static type checking to JavaScript, helping catch errors at compile time rather than runtime. This leads to more robust and maintainable code.</p>
      
      <h2>Getting Started</h2>
      <p>Installing TypeScript is straightforward:</p>
      
      <pre><code>npm install -g typescript
tsc --init</code></pre>
      
      <h2>Basic Types</h2>
      <p>TypeScript provides several basic types:</p>
      
      <pre><code>let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["apple", "banana"];
let user: { name: string; age: number } = { name: "John", age: 30 };</code></pre>
      
      <h2>Interfaces</h2>
      <p>Interfaces define the structure of objects:</p>
      
      <pre><code>interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

function createUser(user: User): User {
  return user;
}</code></pre>
    `,
    featuredImage: "/placeholder.svg?height=400&width=800",
    author: "John Doe",
    publishedAt: "2023-12-15",
    readingTime: 9,
    categories: ["TypeScript", "Programming"],
    tags: ["TypeScript", "JavaScript", "Types", "Programming", "Development"],
  },
];

export function getAllBlogs(): Blog[] {
  return blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getRelatedBlogs(currentSlug: string): Blog[] {
  const currentBlog = getBlogBySlug(currentSlug);
  if (!currentBlog) return [];

  return blogs
    .filter(
      (blog) =>
        blog.slug !== currentSlug &&
        blog.categories.some((category) =>
          currentBlog.categories.includes(category)
        )
    )
    .slice(0, 3);
}

export function getBlogsByCategory(category: string): Blog[] {
  return blogs.filter((blog) => blog.categories.includes(category));
}

export function getBlogsByTag(tag: string): Blog[] {
  return blogs.filter((blog) => blog.tags.includes(tag));
}
