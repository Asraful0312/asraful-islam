import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckoutPage } from "@/components/checkout-page";

export const metadata = {
  title: "Checkout | Asraful Islam",
};

export default function Checkout() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <CheckoutPage />
      <Footer />
    </main>
  );
}
