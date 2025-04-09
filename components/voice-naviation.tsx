"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { AudioLines, Info, Mic, X } from "lucide-react";
import { useClickOutside } from "@mantine/hooks";

const commands = [
  { command: "about", to: "/#about", label: "About" },
  { command: "contact", to: "/#contact", label: "Contact" },
  { command: "project", to: "/#projects", label: "Project" },
  { command: "review", to: "/#reviews", label: "Reviews" },
  { command: "skill", to: "/#skills", label: "Skills" },
  { command: "home", to: "/", label: "Home" },
  { command: "top", to: "/", label: "Top" },
  { command: "bottom", to: "/#footer", label: "Bottom" },
  {
    command: "p1",
    to: "/projects/image-to-text-converter",
    label: "Project one",
  },
  {
    command: "p2",
    to: "/projects/games-finding-website",
    label: "Project two",
  },
  { command: "back", to: "back", label: "Previous" },
];

export default function VoiceNavigator() {
  const [show, setShow] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const router = useRouter();
  const ref = useClickOutside(() => setShow(false));

  const handleOnOff = () => {
    if (typeof window !== "undefined") {
      const isSpeechSupported =
        "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
      if (!isSpeechSupported) {
        alert(
          "Your browser does not support speech recognition. Please use Google Chrome or Microsoft Edge"
        );
      }
    }
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust based on your navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const command = transcript.toLowerCase();

    const handleRedirect = (path: string) => {
      if (path === "back") {
        router.back();
      } else if (path.includes("#")) {
        // Handle section navigation with smooth scroll
        const sectionId = path.split("#")[1];
        // If already on the homepage, scroll directly
        if (window.location.pathname === "/") {
          scrollToSection(sectionId);
        } else {
          // Navigate to home first, then scroll
          router.push(path);
          setTimeout(() => scrollToSection(sectionId), 100); // Delay to ensure page load
        }
      } else {
        // Full page navigation
        router.push(path);
      }
    };

    // Check stop command first
    if (command.includes("stop listening")) {
      SpeechRecognition.stopListening();
      resetTranscript(); // Clear the transcript to avoid re-processing
      return; // Exit the effect to prevent navigation
    }

    // Then check navigation commands
    commands.forEach((c) => {
      if (command.includes(c.command.toLowerCase())) {
        handleRedirect(c.to);
      }
    });

    const timeOut = setTimeout(() => {
      resetTranscript();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [transcript, router]);

  return (
    <>
      <Button
        size="icon"
        onClick={handleOnOff}
        className="rounded right-6 bottom-5 z-50 fixed bg-purple-600"
      >
        {listening ? (
          <AudioLines className="size-4 shrink-0" />
        ) : (
          <Mic className="size-4 shrink-0" />
        )}
      </Button>

      <div
        className={`bg-purple-500/55 py-1 px-4 text-center text-white fixed bottom-5 right-[70px] h-8 z-50 transition-all duration-200 ${
          transcript !== ""
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 translate-x-5 invisible"
        } `}
      >
        {transcript}
      </div>

      <button
        onClick={() => setShow((prev) => !prev)}
        className="bg-primary fixed right-4 bottom-[70px] rounded-full flex items-center justify-center size-7 z-50"
      >
        <Info className="size-4 shrink-0 text-white" />
      </button>

      <div
        ref={ref}
        className={`bg-[#232323] w-[250px] rounded fixed bottom-20 right-8 max-h-[350px] overflow-y-scroll text-white p-3 z-50 ${
          show ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-end">
          <button onClick={() => setShow(false)}>
            <X className="text-white shrink-0 size-4" />
          </button>
        </div>
        <h2 className="text-center font-semibold text-sm mb-2">
          Voice Navigation
        </h2>
        <ul className="list-disc ml-5 space-y-2">
          {commands.map((c) => (
            <li key={c.label} className="text-sm">
              Say <span className="font-bold text-purple-500">{c.command}</span>{" "}
              to navigate to{" "}
              <span className="text-primary font-bold">{c.label}</span>{" "}
              {c.command === "p1" || c.command === "p2"
                ? "page"
                : c.command === "back"
                ? "section/page"
                : "section"}
            </li>
          ))}
          <li>
            Say{" "}
            <span className="font-bold text-purple-500">stop listening</span> to
            stop voice navigation.
          </li>
        </ul>
      </div>
    </>
  );
}
