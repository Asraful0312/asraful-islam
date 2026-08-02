import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckoutSuccess } from "@/components/checkout-success";

export const metadata = {
  title: "Payment Successful | Asraful Islam",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="min-h-screen">
      <Navbar />
      <CheckoutSuccess token={token ?? ""} />
      <Footer />
    </main>
  );
}
