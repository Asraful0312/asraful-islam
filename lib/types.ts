export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
  slug: string;
  images: string[];
  features: { title: string; description: string }[];

  technicalDetails: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
}
