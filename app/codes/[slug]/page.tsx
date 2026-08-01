import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodeDetailWrapper } from "@/components/code-detail-wrapper";

export default function CodeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <CodeDetailWrapper slug={params.slug} />
      <Footer />
    </main>
  );
}
