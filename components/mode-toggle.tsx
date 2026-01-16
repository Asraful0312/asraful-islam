"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="text-foreground">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        );
    }

    const isLight = resolvedTheme === 'light';

    const toggleTheme = async (e: React.MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // Access the document-level API, casting to any because it might not be in the standard TS lib yet
        // @ts-ignore
        if (!document.startViewTransition) {
            setTheme(isLight ? 'dark' : 'light');
            return;
        }

        // @ts-ignore
        const transition = document.startViewTransition(async () => {
            // Disable all CSS transitions to ensure instantaneous atomic update
            document.documentElement.classList.add('disable-transitions');

            // Force manual DOM update FIRST to ensure the "new" snapshot is correct immediately
            if (isLight) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }

            // Then let next-themes sync its state
            flushSync(() => {
                setTheme(isLight ? 'dark' : 'light');
            });

            // Small delay to ensure all effects settle
            await new Promise((resolve) => setTimeout(resolve, 50));
        });

        await transition.ready;

        // Re-enable transitions after the snapshot logic is done and transition starts
        document.documentElement.classList.remove('disable-transitions');

        // Animate the root's new view
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 700,
                easing: "ease-in-out",
                // Specify which pseudo-element to animate
                pseudoElement: "::view-transition-new(root)",
            }
        );
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative overflow-hidden text-foreground hover:bg-transparent"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            <div className="relative z-10">
                {isLight ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </div>
        </Button>
    );
}
