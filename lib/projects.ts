import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Convert images to text or code",
    description:
      "Image Wizard is a Next.js-powered web application that enables users to convert images into text or code using advanced OCR and AI technologies. With features like user authentication via Clerk, credit-based conversions, coupon redemption for rewards, and a responsive UI built with Tailwind CSS and Radix UI, it offers a seamless experience for both logged-in and guest users. The app integrates with Google Gemini for AI-driven text and code extraction, OCR.Space for image-to-text conversion, and Prisma with NeonDB for efficient data management, making it a versatile tool for developers and content creators alike.",
    image: "/p1.gif",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "LemonSqueeze",
      "NeonDB",
      "Prisma",
    ],
    demoLink: "https://image-wizard-jade.vercel.app/",
    githubLink: "https://github.com/Asraful0312/image-wizard",
    slug: "image-to-text-converter",
    images: ["/project/p1-2.png", "/project/p1-3.png", "/project/p1-4.png"],
    features: [
      {
        title: "Image-to-Text and Image-to-Code Conversion",
        description:
          "Users can upload images or PDFs and convert them into plain text or code snippets. Supports basic OCR and AI-enhanced conversion via Gemini.",
      },
      {
        title: "User Authentication and Authorization",
        description:
          "Integrated with Clerk for secure user authentication. Only logged-in users can access certain features like coupon redemption and unlimited conversions, while guest users are limited to a set number of free conversions.",
      },
      {
        title: "Credit System",
        description:
          "Implements a credit-based system where users spend credits to perform conversions. Different conversion types cost varying amounts of credits (e.g., 1 credit for basic OCR, 3 credits for code extraction). Users receive 10 free credits upon registration and can purchase more via Lemon Squeezy.",
      },
      {
        title: "Coupon Redemption",
        description:
          "Logged-in users can redeem coupon codes to earn additional credits. Ensures each user can redeem a specific coupon only once, with validation for coupon validity and expiration.",
      },
      {
        title: "Responsive History Page",
        description:
          "Displays a user’s conversion history in a responsive table (for desktop) or card layout (for mobile). Includes details like conversion type, date, input preview, and output, with a dialog to view full details.",
      },
      {
        title: "Syntax Highlighting and Markdown Rendering",
        description:
          "Code outputs are rendered with syntax highlighting using react-syntax-highlighter. Text outputs are formatted as Markdown and rendered using react-markdown with remark-gfm and rehype-raw for enhanced formatting (e.g., tables, lists).",
      },
      {
        title: "Toast Notifications",
        description:
          "Uses sonner for toast notifications to provide feedback on actions like successful conversions, coupon redemptions, or errors.",
      },
      {
        title: "Responsive Design",
        description:
          "Built with Tailwind CSS and Radix UI components for a fully responsive and accessible UI. Ensures a seamless experience across devices, with mobile-specific layouts for the history page.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description:
          "Uses Prisma 6.5.0 as the ORM with NeonDB (PostgreSQL) for data storage. Schema includes models for User, Conversion, Purchase, Coupon, and CouponRedemption. Webhook integration with Clerk to sync user data (e.g., storing user email on user.created event).",
      },
      {
        title: "Authentication",
        description:
          "Clerk (`@clerk/nextjs`) for user authentication and session management. Middleware (`authMiddleware`) ensures protected routes (e.g., `/coupon`, `/api/coupon/redeem`) are accessible only to logged-in users.",
      },
      {
        title: "Image Processing and AI",
        description:
          "OCR.Space API for basic image-to-text and PDF-to-text conversions. Google Gemini 1.5 Flash (`@google/generative-ai`) for AI-enhanced text and code extraction. Uses custom prompts and post-processing (`stripCodeBlockMarkers`) to refine Gemini output.",
      },
      {
        title: "Payment Integration",
        description:
          "Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) for handling credit purchases. Stores purchase details in the `Purchase` model, including credits bought and amount paid.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements. react-markdown with remark-gfm and rehype-raw for rendering Markdown. react-syntax-highlighter for code highlighting. sonner for toast notifications.",
      },
      {
        title: "API Routes",
        description:
          "Server Actions (app/actions.ts) for handling conversions. API routes include /api/webhook, /api/coupon/redeem, and /api/user/credits.",
      },
      {
        title: "Deployment",
        description:
          "Deployed on Vercel for seamless CI/CD. Uses environment variables like DATABASE_URL, CLERK_WEBHOOK_SECRET, GEMINI_API_KEY for configuration.",
      },
    ],
    challenges: [
      {
        title: "Formatting Gemini Output",
        description:
          "Gemini often returned code with unwanted Markdown code block markers (e.g., typescript). Solved by refining prompts and adding a stripCodeBlockMarkers post-processing step.",
      },
      {
        title: "Responsive History Page",
        description:
          "The history table overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
      {
        title: "Markdown List Rendering",
        description:
          "Gemini formatted lists with extra spaces that react-markdown couldn't parse properly. Fixed using a fixMarkdownLists function and remark-gfm.",
      },
      {
        title: "Seeding the Database",
        description:
          "Faced issues with ts-node and ESM/CommonJS during seeding. Resolved by updating package.json, adding fallback JS seed file, and refining TypeScript config.",
      },
      {
        title: "Coupon Redemption Logic",
        description:
          "Needed to enforce one-time redemption per user. Added CouponRedemption model with a unique constraint and used a Prisma transaction for atomic updates.",
      },
      {
        title: "API Rate Limits and Costs",
        description:
          "To control external API usage, implemented a credit system, cached conversions in the database, and cleaned OCR.Space output locally before calling Gemini.",
      },
      {
        title: "Next.js 15 and React 19 Compatibility",
        description:
          "Some libraries had issues with the latest versions. Fixed by upgrading dependencies and ensuring compatibility across ecosystem.",
      },
    ],
  },
  {
    id: "project-2",
    title: "Games finding website",
    description:
      "A website users can find thousands of games for all platforms.",
    image: "/p2.gif",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    demoLink: "https://gamelogist.vercel.app/",
    githubLink: "https://github.com/Asraful0312/gamelogist",
    slug: "games-finding-website",
    images: ["/project/p2-2.png", "/project/p2-3.png", "/project/p2-4.png"],
    features: [
      {
        title: "Search Games",
        description: "Users can search games by their name.",
      },
      {
        title: "User Authentication and Authorization",
        description: "Integrated with firebase Authentication.",
      },
      {
        title: "Light cursor",
        description:
          "Added a cursor like a light to see the contents in the dark.",
      },
      {
        title: "Responsive Design",
        description: "Responsive for all devices and screens.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Vite and React JS. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description: "Uses firebase for backend and Authentication.",
      },
      {
        title: "Authentication",
        description: "Firebase for Authentication.",
      },
      {
        title: "Games Database API",
        description: "Used RAWG API for getting games.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements.",
      },

      {
        title: "Deployment",
        description: "Deployed on Vercel for seamless CI/CD.",
      },
    ],
    challenges: [
      {
        title: "Responsive Games Details Page",
        description:
          "The details page content overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
    ],
  },
  {
    id: "project-3",
    title: "Social Media Dashboard",
    description:
      "A comprehensive dashboard for social media analytics with data visualization, reporting tools, and scheduling capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Chart.js", "TypeScript", "Prisma", "PostgreSQL"],
    demoLink: "#",
    githubLink: "#",
    slug: "social-media-dashboard",
    images: ["/project/p1-2.png", "/project/p1-3.png", "/project/p1-4.png"],
    features: [
      {
        title: "Image-to-Text and Image-to-Code Conversion",
        description:
          "Users can upload images or PDFs and convert them into plain text or code snippets. Supports basic OCR and AI-enhanced conversion via Gemini.",
      },
      {
        title: "User Authentication and Authorization",
        description:
          "Integrated with Clerk for secure user authentication. Only logged-in users can access certain features like coupon redemption and unlimited conversions, while guest users are limited to a set number of free conversions.",
      },
      {
        title: "Credit System",
        description:
          "Implements a credit-based system where users spend credits to perform conversions. Different conversion types cost varying amounts of credits (e.g., 1 credit for basic OCR, 3 credits for code extraction). Users receive 10 free credits upon registration and can purchase more via Lemon Squeezy.",
      },
      {
        title: "Coupon Redemption",
        description:
          "Logged-in users can redeem coupon codes to earn additional credits. Ensures each user can redeem a specific coupon only once, with validation for coupon validity and expiration.",
      },
      {
        title: "Responsive History Page",
        description:
          "Displays a user’s conversion history in a responsive table (for desktop) or card layout (for mobile). Includes details like conversion type, date, input preview, and output, with a dialog to view full details.",
      },
      {
        title: "Syntax Highlighting and Markdown Rendering",
        description:
          "Code outputs are rendered with syntax highlighting using react-syntax-highlighter. Text outputs are formatted as Markdown and rendered using react-markdown with remark-gfm and rehype-raw for enhanced formatting (e.g., tables, lists).",
      },
      {
        title: "Toast Notifications",
        description:
          "Uses sonner for toast notifications to provide feedback on actions like successful conversions, coupon redemptions, or errors.",
      },
      {
        title: "Responsive Design",
        description:
          "Built with Tailwind CSS and Radix UI components for a fully responsive and accessible UI. Ensures a seamless experience across devices, with mobile-specific layouts for the history page.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description:
          "Uses Prisma 6.5.0 as the ORM with NeonDB (PostgreSQL) for data storage. Schema includes models for User, Conversion, Purchase, Coupon, and CouponRedemption. Webhook integration with Clerk to sync user data (e.g., storing user email on user.created event).",
      },
      {
        title: "Authentication",
        description:
          "Clerk (`@clerk/nextjs`) for user authentication and session management. Middleware (`authMiddleware`) ensures protected routes (e.g., `/coupon`, `/api/coupon/redeem`) are accessible only to logged-in users.",
      },
      {
        title: "Image Processing and AI",
        description:
          "OCR.Space API for basic image-to-text and PDF-to-text conversions. Google Gemini 1.5 Flash (`@google/generative-ai`) for AI-enhanced text and code extraction. Uses custom prompts and post-processing (`stripCodeBlockMarkers`) to refine Gemini output.",
      },
      {
        title: "Payment Integration",
        description:
          "Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) for handling credit purchases. Stores purchase details in the `Purchase` model, including credits bought and amount paid.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements. react-markdown with remark-gfm and rehype-raw for rendering Markdown. react-syntax-highlighter for code highlighting. sonner for toast notifications.",
      },
      {
        title: "API Routes",
        description:
          "Server Actions (app/actions.ts) for handling conversions. API routes include /api/webhook, /api/coupon/redeem, and /api/user/credits.",
      },
      {
        title: "Deployment",
        description:
          "Deployed on Vercel for seamless CI/CD. Uses environment vriables like DTABASE_URL, CLERK_EBOOK_SECRET, EMINI_API_KEY for configuration.",
      },
    ],
    challenges: [
      {
        title: "Formatting Gemini Output",
        description:
          "Gemini often returned code with unwanted Markdown code block markers (e.g., typescript). Solved by refining prompts and adding a stripCodeBlockMarkers post-processing step.",
      },
      {
        title: "Responsive History Page",
        description:
          "The history table overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
      {
        title: "Markdown List Rendering",
        description:
          "Gemini formatted lists with extra spaces that react-markdown couldn't parse properly. Fixed using a fixMarkdownLists function and remark-gfm.",
      },
      {
        title: "Seeding the Database",
        description:
          "Faced issues with ts-node and ESM/CommonJS during seeding. Resolved by updating package.json, adding fallback JS seed file, and refining TypeScript config.",
      },
      {
        title: "Coupon Redemption Logic",
        description:
          "Needed to enforce one-time redemption per user. Added CouponRedemption model with a unique constraint and used a Prisma transaction for atomic updates.",
      },
      {
        title: "API Rate Limits and Costs",
        description:
          "To control external API usage, implemented a credit system, cached conversions in the database, and cleaned OCR.Space output locally before calling Gemini.",
      },
      {
        title: "Next.js 15 and React 19 Compatibility",
        description:
          "Some libraries had issues with the latest versions. Fixed by upgrading dependencies and ensuring compatibility across ecosystem.",
      },
    ],
  },
  {
    id: "project-4",
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates blog posts, social media content, and marketing copy based on user prompts.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "OpenAI API", "Express", "MongoDB"],
    demoLink: "#",
    githubLink: "#",
    slug: "ai-content-generator",
    images: ["/project/p1-2.png", "/project/p1-3.png", "/project/p1-4.png"],
    features: [
      {
        title: "Image-to-Text and Image-to-Code Conversion",
        description:
          "Users can upload images or PDFs and convert them into plain text or code snippets. Supports basic OCR and AI-enhanced conversion via Gemini.",
      },
      {
        title: "User Authentication and Authorization",
        description:
          "Integrated with Clerk for secure user authentication. Only logged-in users can access certain features like coupon redemption and unlimited conversions, while guest users are limited to a set number of free conversions.",
      },
      {
        title: "Credit System",
        description:
          "Implements a credit-based system where users spend credits to perform conversions. Different conversion types cost varying amounts of credits (e.g., 1 credit for basic OCR, 3 credits for code extraction). Users receive 10 free credits upon registration and can purchase more via Lemon Squeezy.",
      },
      {
        title: "Coupon Redemption",
        description:
          "Logged-in users can redeem coupon codes to earn additional credits. Ensures each user can redeem a specific coupon only once, with validation for coupon validity and expiration.",
      },
      {
        title: "Responsive History Page",
        description:
          "Displays a user’s conversion history in a responsive table (for desktop) or card layout (for mobile). Includes details like conversion type, date, input preview, and output, with a dialog to view full details.",
      },
      {
        title: "Syntax Highlighting and Markdown Rendering",
        description:
          "Code outputs are rendered with syntax highlighting using react-syntax-highlighter. Text outputs are formatted as Markdown and rendered using react-markdown with remark-gfm and rehype-raw for enhanced formatting (e.g., tables, lists).",
      },
      {
        title: "Toast Notifications",
        description:
          "Uses sonner for toast notifications to provide feedback on actions like successful conversions, coupon redemptions, or errors.",
      },
      {
        title: "Responsive Design",
        description:
          "Built with Tailwind CSS and Radix UI components for a fully responsive and accessible UI. Ensures a seamless experience across devices, with mobile-specific layouts for the history page.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description:
          "Uses Prisma 6.5.0 as the ORM with NeonDB (PostgreSQL) for data storage. Schema includes models for User, Conversion, Purchase, Coupon, and CouponRedemption. Webhook integration with Clerk to sync user data (e.g., storing user email on user.created event).",
      },
      {
        title: "Authentication",
        description:
          "Clerk (`@clerk/nextjs`) for user authentication and session management. Middleware (`authMiddleware`) ensures protected routes (e.g., `/coupon`, `/api/coupon/redeem`) are accessible only to logged-in users.",
      },
      {
        title: "Image Processing and AI",
        description:
          "OCR.Space API for basic image-to-text and PDF-to-text conversions. Google Gemini 1.5 Flash (`@google/generative-ai`) for AI-enhanced text and code extraction. Uses custom prompts and post-processing (`stripCodeBlockMarkers`) to refine Gemini output.",
      },
      {
        title: "Payment Integration",
        description:
          "Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) for handling credit purchases. Stores purchase details in the `Purchase` model, including credits bought and amount paid.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements. react-markdown with remark-gfm and rehype-raw for rendering Markdown. react-syntax-highlighter for code highlighting. sonner for toast notifications.",
      },
      {
        title: "API Routes",
        description:
          "Server Actions (app/actions.ts) for handling conversions. API routes include /api/webhook, /api/coupon/redeem, and /api/user/credits.",
      },
      {
        title: "Deployment",
        description:
          "Deployed on Vercel for seamless CI/CD. Uses environment vriables like DTABASE_URL, CLERK_EBOOK_SECRET, EMINI_API_KEY for configuration.",
      },
    ],
    challenges: [
      {
        title: "Formatting Gemini Output",
        description:
          "Gemini often returned code with unwanted Markdown code block markers (e.g., typescript). Solved by refining prompts and adding a stripCodeBlockMarkers post-processing step.",
      },
      {
        title: "Responsive History Page",
        description:
          "The history table overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
      {
        title: "Markdown List Rendering",
        description:
          "Gemini formatted lists with extra spaces that react-markdown couldn't parse properly. Fixed using a fixMarkdownLists function and remark-gfm.",
      },
      {
        title: "Seeding the Database",
        description:
          "Faced issues with ts-node and ESM/CommonJS during seeding. Resolved by updating package.json, adding fallback JS seed file, and refining TypeScript config.",
      },
      {
        title: "Coupon Redemption Logic",
        description:
          "Needed to enforce one-time redemption per user. Added CouponRedemption model with a unique constraint and used a Prisma transaction for atomic updates.",
      },
      {
        title: "API Rate Limits and Costs",
        description:
          "To control external API usage, implemented a credit system, cached conversions in the database, and cleaned OCR.Space output locally before calling Gemini.",
      },
      {
        title: "Next.js 15 and React 19 Compatibility",
        description:
          "Some libraries had issues with the latest versions. Fixed by upgrading dependencies and ensuring compatibility across ecosystem.",
      },
    ],
  },
  {
    id: "project-5",
    title: "Fitness Tracking App",
    description:
      "A mobile-first fitness tracking application with workout plans, progress tracking, and social features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "GraphQL", "Node.js", "MongoDB", "AWS"],
    demoLink: "#",
    githubLink: "#",
    slug: "fitness-tracking-app",
    images: ["/project/p1-2.png", "/project/p1-3.png", "/project/p1-4.png"],
    features: [
      {
        title: "Image-to-Text and Image-to-Code Conversion",
        description:
          "Users can upload images or PDFs and convert them into plain text or code snippets. Supports basic OCR and AI-enhanced conversion via Gemini.",
      },
      {
        title: "User Authentication and Authorization",
        description:
          "Integrated with Clerk for secure user authentication. Only logged-in users can access certain features like coupon redemption and unlimited conversions, while guest users are limited to a set number of free conversions.",
      },
      {
        title: "Credit System",
        description:
          "Implements a credit-based system where users spend credits to perform conversions. Different conversion types cost varying amounts of credits (e.g., 1 credit for basic OCR, 3 credits for code extraction). Users receive 10 free credits upon registration and can purchase more via Lemon Squeezy.",
      },
      {
        title: "Coupon Redemption",
        description:
          "Logged-in users can redeem coupon codes to earn additional credits. Ensures each user can redeem a specific coupon only once, with validation for coupon validity and expiration.",
      },
      {
        title: "Responsive History Page",
        description:
          "Displays a user’s conversion history in a responsive table (for desktop) or card layout (for mobile). Includes details like conversion type, date, input preview, and output, with a dialog to view full details.",
      },
      {
        title: "Syntax Highlighting and Markdown Rendering",
        description:
          "Code outputs are rendered with syntax highlighting using react-syntax-highlighter. Text outputs are formatted as Markdown and rendered using react-markdown with remark-gfm and rehype-raw for enhanced formatting (e.g., tables, lists).",
      },
      {
        title: "Toast Notifications",
        description:
          "Uses sonner for toast notifications to provide feedback on actions like successful conversions, coupon redemptions, or errors.",
      },
      {
        title: "Responsive Design",
        description:
          "Built with Tailwind CSS and Radix UI components for a fully responsive and accessible UI. Ensures a seamless experience across devices, with mobile-specific layouts for the history page.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description:
          "Uses Prisma 6.5.0 as the ORM with NeonDB (PostgreSQL) for data storage. Schema includes models for User, Conversion, Purchase, Coupon, and CouponRedemption. Webhook integration with Clerk to sync user data (e.g., storing user email on user.created event).",
      },
      {
        title: "Authentication",
        description:
          "Clerk (`@clerk/nextjs`) for user authentication and session management. Middleware (`authMiddleware`) ensures protected routes (e.g., `/coupon`, `/api/coupon/redeem`) are accessible only to logged-in users.",
      },
      {
        title: "Image Processing and AI",
        description:
          "OCR.Space API for basic image-to-text and PDF-to-text conversions. Google Gemini 1.5 Flash (`@google/generative-ai`) for AI-enhanced text and code extraction. Uses custom prompts and post-processing (`stripCodeBlockMarkers`) to refine Gemini output.",
      },
      {
        title: "Payment Integration",
        description:
          "Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) for handling credit purchases. Stores purchase details in the `Purchase` model, including credits bought and amount paid.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements. react-markdown with remark-gfm and rehype-raw for rendering Markdown. react-syntax-highlighter for code highlighting. sonner for toast notifications.",
      },
      {
        title: "API Routes",
        description:
          "Server Actions (app/actions.ts) for handling conversions. API routes include /api/webhook, /api/coupon/redeem, and /api/user/credits.",
      },
      {
        title: "Deployment",
        description:
          "Deployed on Vercel for seamless CI/CD. Uses environment vriables like DTABASE_URL, CLERK_EBOOK_SECRET, EMINI_API_KEY for configuration.",
      },
    ],
    challenges: [
      {
        title: "Formatting Gemini Output",
        description:
          "Gemini often returned code with unwanted Markdown code block markers (e.g., typescript). Solved by refining prompts and adding a stripCodeBlockMarkers post-processing step.",
      },
      {
        title: "Responsive History Page",
        description:
          "The history table overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
      {
        title: "Markdown List Rendering",
        description:
          "Gemini formatted lists with extra spaces that react-markdown couldn't parse properly. Fixed using a fixMarkdownLists function and remark-gfm.",
      },
      {
        title: "Seeding the Database",
        description:
          "Faced issues with ts-node and ESM/CommonJS during seeding. Resolved by updating package.json, adding fallback JS seed file, and refining TypeScript config.",
      },
      {
        title: "Coupon Redemption Logic",
        description:
          "Needed to enforce one-time redemption per user. Added CouponRedemption model with a unique constraint and used a Prisma transaction for atomic updates.",
      },
      {
        title: "API Rate Limits and Costs",
        description:
          "To control external API usage, implemented a credit system, cached conversions in the database, and cleaned OCR.Space output locally before calling Gemini.",
      },
      {
        title: "Next.js 15 and React 19 Compatibility",
        description:
          "Some libraries had issues with the latest versions. Fixed by upgrading dependencies and ensuring compatibility across ecosystem.",
      },
    ],
  },
  {
    id: "project-6",
    title: "Real Estate Platform",
    description:
      "A real estate listing platform with property search, virtual tours, and agent communication features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "Mapbox", "Prisma", "PostgreSQL", "AWS S3"],
    demoLink: "#",
    githubLink: "#",
    slug: "real-estate-platform",
    images: ["/project/p1-2.png", "/project/p1-3.png", "/project/p1-4.png"],
    features: [
      {
        title: "Image-to-Text and Image-to-Code Conversion",
        description:
          "Users can upload images or PDFs and convert them into plain text or code snippets. Supports basic OCR and AI-enhanced conversion via Gemini.",
      },
      {
        title: "User Authentication and Authorization",
        description:
          "Integrated with Clerk for secure user authentication. Only logged-in users can access certain features like coupon redemption and unlimited conversions, while guest users are limited to a set number of free conversions.",
      },
      {
        title: "Credit System",
        description:
          "Implements a credit-based system where users spend credits to perform conversions. Different conversion types cost varying amounts of credits (e.g., 1 credit for basic OCR, 3 credits for code extraction). Users receive 10 free credits upon registration and can purchase more via Lemon Squeezy.",
      },
      {
        title: "Coupon Redemption",
        description:
          "Logged-in users can redeem coupon codes to earn additional credits. Ensures each user can redeem a specific coupon only once, with validation for coupon validity and expiration.",
      },
      {
        title: "Responsive History Page",
        description:
          "Displays a user’s conversion history in a responsive table (for desktop) or card layout (for mobile). Includes details like conversion type, date, input preview, and output, with a dialog to view full details.",
      },
      {
        title: "Syntax Highlighting and Markdown Rendering",
        description:
          "Code outputs are rendered with syntax highlighting using react-syntax-highlighter. Text outputs are formatted as Markdown and rendered using react-markdown with remark-gfm and rehype-raw for enhanced formatting (e.g., tables, lists).",
      },
      {
        title: "Toast Notifications",
        description:
          "Uses sonner for toast notifications to provide feedback on actions like successful conversions, coupon redemptions, or errors.",
      },
      {
        title: "Responsive Design",
        description:
          "Built with Tailwind CSS and Radix UI components for a fully responsive and accessible UI. Ensures a seamless experience across devices, with mobile-specific layouts for the history page.",
      },
    ],
    technicalDetails: [
      {
        title: "Framework and Language",
        description:
          "Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience.",
      },
      {
        title: "Backend and Database",
        description:
          "Uses Prisma 6.5.0 as the ORM with NeonDB (PostgreSQL) for data storage. Schema includes models for User, Conversion, Purchase, Coupon, and CouponRedemption. Webhook integration with Clerk to sync user data (e.g., storing user email on user.created event).",
      },
      {
        title: "Authentication",
        description:
          "Clerk (`@clerk/nextjs`) for user authentication and session management. Middleware (`authMiddleware`) ensures protected routes (e.g., `/coupon`, `/api/coupon/redeem`) are accessible only to logged-in users.",
      },
      {
        title: "Image Processing and AI",
        description:
          "OCR.Space API for basic image-to-text and PDF-to-text conversions. Google Gemini 1.5 Flash (`@google/generative-ai`) for AI-enhanced text and code extraction. Uses custom prompts and post-processing (`stripCodeBlockMarkers`) to refine Gemini output.",
      },
      {
        title: "Payment Integration",
        description:
          "Lemon Squeezy (`@lemonsqueezy/lemonsqueezy.js`) for handling credit purchases. Stores purchase details in the `Purchase` model, including credits bought and amount paid.",
      },
      {
        title: "Frontend Libraries",
        description:
          "Tailwind CSS with @tailwindcss/typography for styling. Radix UI components (@radix-ui/react-*) for accessible UI elements. react-markdown with remark-gfm and rehype-raw for rendering Markdown. react-syntax-highlighter for code highlighting. sonner for toast notifications.",
      },
      {
        title: "API Routes",
        description:
          "Server Actions (app/actions.ts) for handling conversions. API routes include /api/webhook, /api/coupon/redeem, and /api/user/credits.",
      },
      {
        title: "Deployment",
        description:
          "Deployed on Vercel for seamless CI/CD. Uses environment vriables like DTABASE_URL, CLERK_EBOOK_SECRET, EMINI_API_KEY for configuration.",
      },
    ],
    challenges: [
      {
        title: "Formatting Gemini Output",
        description:
          "Gemini often returned code with unwanted Markdown code block markers (e.g., typescript). Solved by refining prompts and adding a stripCodeBlockMarkers post-processing step.",
      },
      {
        title: "Responsive History Page",
        description:
          "The history table overflowed on mobile. Fixed by using Tailwind’s dual layout (hidden md:block, md:hidden) and applying break-words and min-w-0.",
      },
      {
        title: "Markdown List Rendering",
        description:
          "Gemini formatted lists with extra spaces that react-markdown couldn't parse properly. Fixed using a fixMarkdownLists function and remark-gfm.",
      },
      {
        title: "Seeding the Database",
        description:
          "Faced issues with ts-node and ESM/CommonJS during seeding. Resolved by updating package.json, adding fallback JS seed file, and refining TypeScript config.",
      },
      {
        title: "Coupon Redemption Logic",
        description:
          "Needed to enforce one-time redemption per user. Added CouponRedemption model with a unique constraint and used a Prisma transaction for atomic updates.",
      },
      {
        title: "API Rate Limits and Costs",
        description:
          "To control external API usage, implemented a credit system, cached conversions in the database, and cleaned OCR.Space output locally before calling Gemini.",
      },
      {
        title: "Next.js 15 and React 19 Compatibility",
        description:
          "Some libraries had issues with the latest versions. Fixed by upgrading dependencies and ensuring compatibility across ecosystem.",
      },
    ],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string): Project[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, 3);
}
