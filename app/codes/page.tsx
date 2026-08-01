import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodesListingWrapper } from "@/components/codes-listing-wrapper";

export const metadata = {
  title: "Code Marketplace | Portfolio",
  description: "Premium code snippets, templates, and components for developers",
};

export default function CodesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CodesListingWrapper />
      <Footer />
    </main>
  );
}
