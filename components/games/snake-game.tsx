"use client";

import { Button } from "../ui/button";
import { useFullscreen } from "@mantine/hooks";

export function SnakeGame() {
  const { ref, toggle, fullscreen } = useFullscreen();

  return (
    <iframe
      ref={ref}
      src="https://prototype-projects.vercel.app/snakeGame.html"
      width="100%"
      className="h-dvh"
      loading="lazy"
    ></iframe>
  );
}
