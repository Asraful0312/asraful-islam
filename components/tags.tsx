"use client";

import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type Tag = string;

const tags = ["React"];

export default function Tags() {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [tag, setTag] = useState("");

  const handleAddTag = (value: string) => {
    setExampleTags((prv) => [...prv, value]);
    setTag("");
  };

  const handleDeleteTag = (value: string) => {
    if (exampleTags.includes(value)) {
      const newTags = exampleTags.filter((t) => t !== value);
      setExampleTags(newTags);
    }
  };

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Tags</Label>
      <div className={"flex items-center border px-2 py-1"}>
        {exampleTags.map((t) => (
          <button
            type="button"
            onClick={() => handleDeleteTag(t)}
            className="flex items-center gap-1 bg-transparent border py-1 px-2 mr-1"
          >
            {t} <X className="shrink-0 size-4 text-white" />
          </button>
        ))}
        <input
          className="w-full border-none outline-none bg-transparent mx-3"
          onChange={(e) => setTag(e.target.value)}
          type="text"
        />
        <button
          onClick={() => handleAddTag(tag)}
          type="button"
          className="bg-primary py-1 px-2"
        >
          Add
        </button>
      </div>
    </div>
  );
}
