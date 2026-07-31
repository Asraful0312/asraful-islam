"use client";

import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

export type ContentFormat = "html" | "markdown";
type Mode = "rich" | "html" | "markdown";

type Props = {
  description: string;
  setDescription: (value: string) => void;
  format?: ContentFormat;
  onFormatChange?: (format: ContentFormat) => void;
};

function unescapeHtmlEntities(value: string) {
  const el = document.createElement("textarea");
  el.innerHTML = value;
  return el.value;
}

export default function RichTextEditor({
  setDescription,
  description,
  format,
  onFormatChange,
}: Props) {
  const [mode, setInternalMode] = useState<Mode>(
    format === "markdown" ? "markdown" : "rich"
  );

  useEffect(() => {
    if (format === "markdown") setInternalMode("markdown");
  }, [format]);

  const selectMode = (next: Mode) => {
    setInternalMode(next);
    onFormatChange?.(next === "markdown" ? "markdown" : "html");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex flex-wrap justify-end gap-2 mb-3">
        <Button
          type="button"
          size="sm"
          variant={mode === "rich" ? "default" : "outline"}
          onClick={() => selectMode("rich")}
        >
          Rich Text
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "html" ? "default" : "outline"}
          onClick={() => selectMode("html")}
        >
          Raw HTML
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === "markdown" ? "default" : "outline"}
          onClick={() => selectMode("markdown")}
        >
          Markdown
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
        {mode === "rich" && (
          <Editor
            value={description}
            onTextChange={(e) => setDescription(e?.htmlValue || "")}
            style={{ height: "320px" }}
          />
        )}
        {mode === "html" && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="<h2>Heading</h2>&#10;<p>Paste or write raw HTML here...</p>"
            className="w-full h-80 p-3 border rounded font-mono text-sm resize-y"
          />
        )}
        {mode === "markdown" && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"## Heading\n\nWrite **markdown** here, including ```code blocks```."}
            className="w-full h-80 p-3 border rounded font-mono text-sm resize-y"
          />
        )}
      </div>

      {description && (
        <div className="mt-6 w-full">
          <h2 className="font-semibold mb-2">Preview:</h2>
          <div className="p-2 border rounded text-sm w-full overflow-y-scroll max-h-100">
            {mode === "markdown" ? (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {description}
                </ReactMarkdown>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap wrap-break-word">
                {description}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
