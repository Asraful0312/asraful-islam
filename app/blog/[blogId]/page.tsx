import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preloadQuery, fetchQuery } from "convex/nextjs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BlogDetailsLive } from "@/components/blog-details-live";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

interface BlogProps {
  params: Promise<{ blogId: Id<"blogs"> }>;
}

async function getBlog(blogId: Id<"blogs">) {
  try {
    return await fetchQuery(api.blogs.getBlog, { blogId });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogProps): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await getBlog(blogId);

  if (!blog) {
    return { title: "Blog not found" };
  }

  const title = blog.title;
  const description = blog.excerpt;
  const url = `/blog/${blog._id}`;
  const images = blog.featureImageUrl ? [{ url: blog.featureImageUrl }] : [];

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: blog.tags,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      images,
      publishedTime: new Date(blog._creationTime).toISOString(),
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogProps) {
  const { blogId } = await params;
  const blog = await getBlog(blogId);

  if (!blog) {
    notFound();
  }

  const preloaded = await preloadQuery(api.blogs.getBlog, { blogId });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featureImageUrl ? [blog.featureImageUrl] : undefined,
    datePublished: new Date(blog._creationTime).toISOString(),
    author: {
      "@type": "Person",
      name: blog.author,
    },
    keywords: blog.tags?.join(", "),
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <BlogDetailsLive preloaded={preloaded} />
      <Footer />
    </main>
  );
}
