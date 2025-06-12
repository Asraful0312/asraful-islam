// components/SearchRelatedProjects.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X } from "lucide-react";
import { useId, useState } from "react";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useDebouncedValue } from "@mantine/hooks";

type Props = {
  relatedProjects: Id<"projects">[] | undefined;
  setRelatedProjects: (value: any) => void;
};

function SearchRelatedProjects({ relatedProjects, setRelatedProjects }: Props) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 200);
  const projects = useQuery(
    api.project.searchProject,
    value ? { query: debounced } : { query: "" }
  );

  const fetchRelatedProjects = useQuery(api.project.getRelatedProjects, {
    ids: relatedProjects || [],
  });

  const deleteRelatedBlog = (blogId: Id<"projects">) => {
    const newBlog = relatedProjects?.filter((b) => b !== blogId);
    setRelatedProjects(newBlog as any);
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>Related Projects</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? projects?.find((project) => project.name === value)?.name ||
                  "Select project"
                : "Select project"}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput
              placeholder="Search blog..."
              value={value}
              onValueChange={setValue}
            />
            <CommandList>
              <CommandEmpty>
                {projects === undefined ? "Loading..." : "No blogs found."}
              </CommandEmpty>
              <CommandGroup>
                {projects?.map((project) => (
                  <CommandItem
                    key={project._id}
                    value={project.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      if (relatedProjects && relatedProjects?.length > 3) {
                        return alert("You cannot add more than 3 project");
                      }
                      setRelatedProjects((prev: any) => [project._id, ...prev]);
                    }}
                  >
                    {project.name}
                    {value === project.name && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {relatedProjects && relatedProjects?.length > 0 && (
        <div className="ml-4">
          <h2 className="text-white font-semibold">
            Selected Related Projects:
          </h2>
          {fetchRelatedProjects?.map((project) => (
            <div className="flex items-center justify-between mt-1 py-1 px-4 border border-purple-600 mb-3">
              <h2 className="text-white">{project.name}</h2>
              <button
                type="button"
                onClick={() => deleteRelatedBlog(project._id)}
              >
                <X className="size-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchRelatedProjects;
