import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogListing } from "@/components/blog-listing";

export const metadata: Metadata = {
  title: "Blog | Asraful Islam",
  description:
    "Articles on web development, Next.js, TypeScript, and building real products.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <BlogListing />
      <Footer />
    </main>
  );
}
