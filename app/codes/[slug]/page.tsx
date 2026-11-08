import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CodeDetailWrapper } from "@/components/code-detail-wrapper";

export default async function CodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <CodeDetailWrapper slug={slug} />
      <Footer />
    </main>
  );
}
