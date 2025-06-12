// components/SearchRelated.tsx
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
  relatedBlogs: Id<"blogs">[] | undefined;
  setRelatedBlogs: (value: any) => void;
};

function SearchRelated({ relatedBlogs, setRelatedBlogs }: Props) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [debounced] = useDebouncedValue(value, 200);
  const blogs = useQuery(
    api.blogs.searchBlog,
    value ? { query: debounced } : { query: "" }
  );

  const fetchRelatedBlogs = useQuery(api.blogs.getRelatedBlogs, {
    ids: relatedBlogs || [],
  });

  const deleteRelatedBlog = (blogId: Id<"blogs">) => {
    const newBlog = relatedBlogs?.filter((b) => b !== blogId);
    setRelatedBlogs(newBlog as any);
  };

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id}>Related Blogs</Label>
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
                ? blogs?.find((blog) => blog.title === value)?.title ||
                  "Select blog"
                : "Select blog"}
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
                {blogs === undefined ? "Loading..." : "No blogs found."}
              </CommandEmpty>
              <CommandGroup>
                {blogs?.map((blog) => (
                  <CommandItem
                    key={blog._id}
                    value={blog.title}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      if (relatedBlogs && relatedBlogs?.length > 3) {
                        return alert("You cannot add more than 3 blogs");
                      }
                      setRelatedBlogs((prev: any) => [blog._id, ...prev]);
                    }}
                  >
                    {blog.title}
                    {value === blog.title && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {relatedBlogs && relatedBlogs?.length > 0 && (
        <div className="ml-4">
          <h2 className="text-white font-semibold">Selected Related Blogs:</h2>
          {fetchRelatedBlogs?.map((blog) => (
            <div className="flex items-center justify-between mt-1 py-1 px-4 border border-purple-600 mb-3">
              <h2 className="text-white">{blog.title}</h2>
              <button type="button" onClick={() => deleteRelatedBlog(blog._id)}>
                <X className="size-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchRelated;
