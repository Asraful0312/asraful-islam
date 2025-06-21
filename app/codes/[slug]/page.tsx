import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodeDetails } from "@/components/code-details";
import { getCodeBySlug, getRelatedCodes } from "@/lib/codes";
import { notFound } from "next/navigation";

export default function CodeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const code = getCodeBySlug(params.slug);

  if (!code) {
    notFound();
  }

  const relatedCodes = getRelatedCodes(params.slug);

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <CodeDetails code={code} relatedCodes={relatedCodes} />
      <Footer />
    </main>
  );
}
