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
  {
    command: "contact",
    to: "/#contact",
    label: "Contact",
  },
  {
    command: "project",
    to: "/#projects",
    label: "Project",
  },
  {
    command: "skill",
    to: "/#skills",
    label: "Skills",
  },
  {
    command: "home",
    to: "/",
    label: "Home",
  },
  {
    command: "top",
    to: "/",
    label: "Top",
  },

  {
    command: "bottom",
    to: "/#footer",
    label: "Bottom",
  },
  {
    command: "p1",
    to: "/projects/e-commerce-platform",
    label: "Project one",
  },
];

export default function VoiceNavigator() {
  const [show, setShow] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [transcriptText, setTranscriptText] = useState("");
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

  console.log("transcript", transcript);

  useEffect(() => {
    const command = transcript.toLowerCase();

    console.log("command", command);
    setTranscriptText(command);

    const handleRedirect = (path: string) => {
      router.push(path); // redirect
    };

    if (command.includes("contact")) {
      handleRedirect("/#contact");
    } else if (command.includes("project")) {
      handleRedirect("/#projects");
    } else if (command.includes("skill")) {
      handleRedirect("/#skills");
    } else if (command.includes("about")) {
      handleRedirect("/#about");
    } else if (command.includes("home")) {
      handleRedirect("/");
    } else if (command.includes("bottom")) {
      handleRedirect("/#footer");
    } else if (command.includes("top")) {
      handleRedirect("/");
    } else if (command.includes("p1")) {
      handleRedirect("/projects/e-commerce-platform");
    }
  }, [transcript]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      resetTranscript();
      setTranscriptText("");
    }, 800);

    return () => clearTimeout(timeOut);
  }, [transcriptText]);

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
          transcriptText !== ""
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 translate-x-5 invisible"
        } `}
      >
        {transcriptText}
      </div>

      <button
        onClick={() => setShow((prev) => !prev)}
        className="bg-primary fixed right-4  bottom-[70px] rounded-full flex items-center justify-center size-7"
      >
        <Info className="size-4 shrink-0 text-white" />
      </button>

      <div
        ref={ref}
        className={` bg-[#232323] w-[250px] rounded fixed bottom-20 right-8  max-h-[350px] overflow-y-scroll text-white p-3 z-50 ${
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
              {c.command === "p1" ? "page" : "section"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
