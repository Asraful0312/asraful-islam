import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { getAllGames } from "@/lib/games";
import { GamesListing } from "@/components/game-listing";

export const metadata = {
  title: "Games | Portfolio",
  description: "Fun interactive games built with modern web technologies",
};

export default function GamesPage() {
  const games = getAllGames();

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <GamesListing games={games} />
      <Footer />
    </main>
  );
}
