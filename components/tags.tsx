"use client";
import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type Tag = string;

export default function Tags({ initialTags = [] }: { initialTags?: string[] }) {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(initialTags);
  const [tag, setTag] = useState("");

  const handleAddTag = (value: string) => {
    if (value.trim() === "") return;
    setExampleTags((prv) => [...prv, value.trim()]);
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
      <div className="flex items-center border px-2 py-1">
        {exampleTags.map((t) => (
          <div
            key={t}
            className="flex items-center gap-1 bg-transparent border py-1 px-2 mr-1"
          >
            <input type="hidden" name="tags" value={t} />
            {t}
            <button
              type="button"
              onClick={() => handleDeleteTag(t)}
              className="ml-1"
            >
              <X className="shrink-0 size-4 text-white" />
            </button>
          </div>
        ))}
        <input
          className="w-full border-none outline-none bg-transparent mx-3"
          onChange={(e) => setTag(e.target.value)}
          type="text"
          value={tag}
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
