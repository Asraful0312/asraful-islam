"use client";

import { useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "@/components/ui/button";

type Props = {
  description: string;
  setDescription: (value: string) => void;
};

function unescapeHtmlEntities(value: string) {
  const el = document.createElement("textarea");
  el.innerHTML = value;
  return el.value;
}

export default function RichTextEditor({ setDescription, description }: Props) {
  const [mode, setMode] = useState<"rich" | "html">("rich");

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex justify-end gap-2 mb-3">
        <Button
          type="button"
          size="sm"
          variant={mode === "rich" ? "default" : "outline"}
          onClick={() => setMode("rich")}
        >
          Rich Text
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "html" ? "default" : "outline"}
          onClick={() => setMode("html")}
        >
          Raw HTML
        </Button>
        {mode === "html" && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setDescription(unescapeHtmlEntities(description))}
            title="Fixes content that was previously typed as literal tags in Rich Text mode and got HTML-escaped (e.g. &lt;h2&gt; instead of a real <h2> tag)"
          >
            Unescape HTML entities
          </Button>
        )}
      </div>

      <div className="card">
        {mode === "rich" ? (
          <Editor
            value={description}
            onTextChange={(e) => setDescription(e?.htmlValue || "")}
            style={{ height: "320px" }}
          />
        ) : (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="<h2>Heading</h2>&#10;<p>Paste or write raw HTML here...</p>"
            className="w-full h-80 p-3 border rounded font-mono text-sm resize-y"
          />
        )}
      </div>

      {description && (
        <div className="mt-6 w-full">
          <h2 className="font-semibold mb-2">Output HTML:</h2>
          <div className="p-2 border rounded text-sm w-full overflow-y-scroll max-h-100">
            <pre className="whitespace-pre-wrap wrap-break-word">{description}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
