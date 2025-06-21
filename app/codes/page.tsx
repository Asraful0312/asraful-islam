import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodesListing } from "@/components/codes-listing";
import { getAllCodes } from "@/lib/codes";

export const metadata = {
  title: "Code Marketplace | Portfolio",
  description:
    "Premium code snippets, templates, and components for developers",
};

export default function CodesPage() {
  const codes = getAllCodes();

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <CodesListing codes={codes} />
      <Footer />
    </main>
  );
}
