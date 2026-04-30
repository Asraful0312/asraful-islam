import type React from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import VoiceNavigator from "@/components/voice-naviation";
import LightBulb from "@/components/light-bulb";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/use-context";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata = {
  title: "Asraful Islam — Full Stack Developer",
  description: "Full stack developer building fast, thoughtful web applications. Based in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} bg-background text-foreground antialiased`}
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
