import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ReviewsSection } from "@/components/reviews-section";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-[#0f0f0f]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
