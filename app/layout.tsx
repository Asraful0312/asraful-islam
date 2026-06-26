import type React from "react";
import { Outfit, IBM_Plex_Sans } from "next/font/google";
// @ts-ignore: side-effect import for global CSS (no type declarations)
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import VoiceNavigator from "@/components/voice-naviation";
import LightBulb from "@/components/light-bulb";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/use-context";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'], variable: '--font-sans',
  weight: "100"
});

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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", ibmPlexSans.variable)}>
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
