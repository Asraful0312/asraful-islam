import type { CodeProduct } from "./types";

const codes: CodeProduct[] = [
  {
    id: "code-1",
    title: "React Dashboard Template",
    slug: "react-dashboard-template",
    description:
      "A complete admin dashboard template built with React, TypeScript, and Tailwind CSS. Features charts, tables, forms, and responsive design.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 29,
    language: "React",
    categories: ["Templates", "React"],
    tags: ["React", "TypeScript", "Dashboard", "Admin", "Tailwind CSS"],
    rating: 4.8,
    reviews: 124,
    downloads: 1250,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    version: "1.2.0",
  },
  {
    id: "code-2",
    title: "CSS Animation Library",
    slug: "css-animation-library",
    description:
      "A collection of smooth CSS animations and transitions. Perfect for adding life to your web projects with minimal code.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 0,
    language: "CSS",
    categories: ["Animations", "CSS"],
    tags: ["CSS", "Animations", "Transitions", "Effects", "UI"],
    rating: 4.6,
    reviews: 89,
    downloads: 2100,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    version: "2.1.0",
  },
  {
    id: "code-3",
    title: "Next.js E-commerce Starter",
    slug: "nextjs-ecommerce-starter",
    description:
      "Full-featured e-commerce starter kit with Next.js, Stripe integration, and modern UI components. Ready to deploy!",
    preview: "/placeholder.svg?height=400&width=600",
    price: 49,
    language: "Next.js",
    categories: ["Templates", "E-commerce"],
    tags: ["Next.js", "E-commerce", "Stripe", "TypeScript", "Tailwind"],
    rating: 4.9,
    reviews: 67,
    downloads: 890,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-22",
    version: "1.0.0",
  },
  {
    id: "code-4",
    title: "JavaScript Utility Functions",
    slug: "javascript-utility-functions",
    description:
      "A comprehensive collection of JavaScript utility functions for common programming tasks. Well-tested and documented.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 15,
    language: "JavaScript",
    categories: ["Utilities", "JavaScript"],
    tags: ["JavaScript", "Utilities", "Functions", "Helpers", "Tools"],
    rating: 4.7,
    reviews: 156,
    downloads: 3200,
    createdAt: "2023-12-28",
    updatedAt: "2024-01-16",
    version: "3.2.1",
  },
  {
    id: "code-5",
    title: "Vue.js Component Library",
    slug: "vuejs-component-library",
    description:
      "Modern Vue.js component library with 50+ components. Includes forms, navigation, data display, and feedback components.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 35,
    language: "Vue.js",
    categories: ["Components", "Vue.js"],
    tags: [
      "Vue.js",
      "Components",
      "UI Library",
      "TypeScript",
      "Composition API",
    ],
    rating: 4.5,
    reviews: 78,
    downloads: 650,
    createdAt: "2023-12-20",
    updatedAt: "2024-01-14",
    version: "2.0.0",
  },
  {
    id: "code-6",
    title: "Python Data Analysis Scripts",
    slug: "python-data-analysis-scripts",
    description:
      "Collection of Python scripts for data analysis, visualization, and machine learning. Includes Pandas, NumPy, and Matplotlib examples.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 25,
    language: "Python",
    categories: ["Data Science", "Python"],
    tags: ["Python", "Data Analysis", "Pandas", "NumPy", "Matplotlib"],
    rating: 4.8,
    reviews: 92,
    downloads: 1100,
    createdAt: "2023-12-15",
    updatedAt: "2024-01-12",
    version: "1.5.0",
  },
  {
    id: "code-7",
    title: "Mobile-First CSS Framework",
    slug: "mobile-first-css-framework",
    description:
      "Lightweight, mobile-first CSS framework for rapid prototyping. Includes grid system, components, and utilities.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 0,
    language: "CSS",
    categories: ["Frameworks", "CSS"],
    tags: ["CSS", "Framework", "Mobile-First", "Responsive", "Grid"],
    rating: 4.4,
    reviews: 134,
    downloads: 2800,
    createdAt: "2023-12-10",
    updatedAt: "2024-01-08",
    version: "1.8.0",
  },
  {
    id: "code-8",
    title: "React Native App Template",
    slug: "react-native-app-template",
    description:
      "Complete React Native app template with navigation, authentication, and common screens. Perfect starting point for mobile apps.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 39,
    language: "React Native",
    categories: ["Templates", "Mobile"],
    tags: [
      "React Native",
      "Mobile",
      "Template",
      "Navigation",
      "Authentication",
    ],
    rating: 4.7,
    reviews: 45,
    downloads: 420,
    createdAt: "2023-12-05",
    updatedAt: "2024-01-10",
    version: "1.1.0",
  },
  {
    id: "code-9",
    title: "Node.js API Boilerplate",
    slug: "nodejs-api-boilerplate",
    description:
      "Production-ready Node.js API boilerplate with Express, MongoDB, authentication, and comprehensive testing setup.",
    preview: "/placeholder.svg?height=400&width=600",
    price: 32,
    language: "Node.js",
    categories: ["Backend", "APIs"],
    tags: ["Node.js", "Express", "MongoDB", "API", "Authentication"],
    rating: 4.9,
    reviews: 87,
    downloads: 760,
    createdAt: "2023-11-30",
    updatedAt: "2024-01-06",
    version: "2.3.0",
  },
];

export function getAllCodes(): CodeProduct[] {
  return codes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getCodeBySlug(slug: string): CodeProduct | undefined {
  return codes.find((code) => code.slug === slug);
}

export function getRelatedCodes(currentSlug: string): CodeProduct[] {
  const currentCode = getCodeBySlug(currentSlug);
  if (!currentCode) return [];

  return codes
    .filter(
      (code) =>
        code.slug !== currentSlug &&
        (code.categories.some((category) =>
          currentCode.categories.includes(category)
        ) ||
          code.language === currentCode.language)
    )
    .slice(0, 3);
}

export function getCodesByCategory(category: string): CodeProduct[] {
  return codes.filter((code) => code.categories.includes(category));
}

export function getCodesByLanguage(language: string): CodeProduct[] {
  return codes.filter((code) => code.language === language);
}
