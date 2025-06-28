import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GamePlayer } from "@/components/game-player";
import { getGameBySlug } from "@/lib/games";
import { notFound } from "next/navigation";

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <GamePlayer game={game} />
      <Footer />
    </main>
  );
}
