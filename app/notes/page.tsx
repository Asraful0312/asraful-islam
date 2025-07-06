import { Navbar } from "@/components/navbar";
import { NotesCanvas } from "@/components/notes-canvas";
export const metadata = {
  title: "Anonymous Notes | Portfolio",
  description: "Create and share anonymous floating notes with the world",
};

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] overflow-hidden">
      <Navbar />
      <NotesCanvas />
    </main>
  );
}
