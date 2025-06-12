"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogListing } from "@/components/blog-listing";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <BlogListing />
      <Footer />
    </main>
  );
}
