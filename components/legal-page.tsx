import type { ReactNode } from "react";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="section-container pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: {lastUpdated}
        </p>
        <div className="prose dark:prose-invert prose-sm md:prose-base max-w-none text-foreground prose-headings:font-semibold prose-a:text-primary">
          {children}
        </div>
      </div>
    </div>
  );
}
