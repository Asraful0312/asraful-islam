import { Id } from "@/convex/_generated/dataModel";

export interface Project {
  _creationTime: number;
  _id: Id<"projects">;
  challenges: Array<{
    description: string;
    title: string;
  }>;
  demoLink: string;
  description: string;
  features: Array<{
    description: string;
    title: string;
  }>;
  galleryImageUrls?: string[];
  imageGallery: Id<"_storage">[];
  name: string;
  projectType: string;
  relatedId: Id<"projects">[];
  role: string;
  slug: string;
  sourceCode: string;
  tags: string[];
  technicalDetails: Array<{
    description: string;
    title: string;
  }>;
  thumbnail: Id<"_storage">;
  thumbnailUrl: string;
  timeline: string;
  userId: Id<"users">;
}

export interface Blog {
  _creationTime: number;
  _id: Id<"blogs">;
  author: string;
  authorId: Id<"users">;
  categories: string[];
  commentsCount: number;
  content: string;
  excerpt: string;
  featureImageUrl: string;
  featuredImage: Id<"_storage">;
  isLiked: boolean;
  likesCount: number;
  published: boolean;
  readingTime: number;
  slug: string;
  tags: string[];
  title: string;
  relatedBlogs?: Id<"blogs">[];
}
