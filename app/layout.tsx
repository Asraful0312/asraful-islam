import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import VoiceNavigator from "@/components/voice-naviation";
import LightBulb from "@/components/light-bulb";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/use-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio | Creative Developer",
  description: "Personal portfolio showcasing creative development work",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#0f0f0f] text-white antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
          {/* <ScrollToTop /> */}
          <VoiceNavigator />
          <LightBulb />
        </ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
