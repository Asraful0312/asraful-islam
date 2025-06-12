"use client";

import { Editor } from "primereact/editor";

type Props = {
  description: string;
  setDescription: (value: string) => void;
};

export default function RichTextEditor({ setDescription, description }: Props) {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="card">
        <Editor
          value={description}
          onTextChange={(e) => setDescription(e?.htmlValue || "")}
          style={{ height: "320px" }}
        />
      </div>

      {description && (
        <div className="mt-6 w-full">
          <h2 className="font-semibold mb-2">Output HTML:</h2>
          <div className="p-2 border rounded text-white text-sm w-full overflow-y-scroll max-h-[400px">
            <pre>{description}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
