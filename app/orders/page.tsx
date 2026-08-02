import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { OrderLookup } from "@/components/order-lookup";

export const metadata = {
  title: "Track Your Order | Asraful Islam",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="min-h-screen">
      <Navbar />
      <OrderLookup token={token ?? null} />
      <Footer />
    </main>
  );
}
