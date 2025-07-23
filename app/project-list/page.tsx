import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectListing } from "@/components/project/ProjectList";
import React from "react";

const ProjectsListPage = () => {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <ProjectListing />
      <Footer />
    </main>
  );
};

export default ProjectsListPage;
