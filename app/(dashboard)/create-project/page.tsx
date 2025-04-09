import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const CreateProject = () => {
  return (
    <AppShell>
      <form className="space-y-4 w-full">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              className="w-full"
              name="name"
              id="name"
              placeholder="Project name"
            />
          </div>
          <div className="w-full md:basis-1/2 space-y-1">
            <Label htmlFor="slug">Slug</Label>
            <Input
              className="w-full"
              name="slug"
              id="slug"
              placeholder="Project slug"
            />
          </div>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            className="w-full"
            name="description"
            id="description"
            rows={5}
            placeholder="Project description"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="thumbnail">Thumbnail</Label>
          <Input
            type="file"
            className="w-full"
            name="thumbnail"
            id="thumbnail"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="image-gallery">Image Gallery</Label>
          <Input
            type="file"
            className="w-full"
            name="image-gallery"
            id="image-gallery"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="project-type">Project Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="Web Application">Web Application</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Desktop Software">
                  Desktop Software
                </SelectItem>
                <SelectItem value="Desgin">Design</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="role">Role</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="Full-stack Developer">
                  Full-stack Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1">
          <Label htmlFor="source-code">Source Code</Label>
          <Input
            className="w-full"
            name="source-code"
            id="source-code"
            placeholder="http://github.com"
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="demo">Demo Link</Label>
          <Input
            className="w-full"
            name="demo"
            id="demo"
            placeholder="http://exmple.com"
          />
        </div>
        <div className="w-full space-y-1">tags</div>

        <div className="w-full space-y-1">
          <Label htmlFor="timeline">Timeline</Label>
          <Input
            className="w-full"
            name="timeline"
            id="timeline"
            placeholder="3 months (Jan - Mar 2023)"
          />
        </div>

        <div className="w-full space-y-1">
          <Label htmlFor="timeline">Related Id</Label>
          <Input
            className="w-full"
            name="related"
            id="related"
            placeholder="#23"
          />
        </div>

        <div className="w-full space-y-1">
          <h2 className="text-center">Features</h2>

          <div className="w-full space-y-1">
            <Label htmlFor="feature-title">Title</Label>
            <Input
              className="w-full"
              name="feature-title"
              id="feature-title"
              placeholder="Authentication"
            />
          </div>
          <div className="w-full space-y-1 mt-1 mb-3">
            <Label htmlFor="feature-description">Description</Label>
            <Input
              className="w-full"
              name="feature-description"
              id="feature-description"
              placeholder="Integrated with Clerk for secure user authentication."
            />
          </div>

          <Button className="mt-3" type="button">
            Add
          </Button>
        </div>

        <div className="w-full space-y-1">
          <h2 className="text-center">Technical Details</h2>

          <div className="w-full space-y-1">
            <Label htmlFor="feature-title">Title</Label>
            <Input
              className="w-full"
              name="technical-title"
              id="technical-title"
              placeholder="Framework and Language"
            />
          </div>
          <div className="w-full space-y-1 mt-1 mb-3">
            <Label htmlFor="technical-description">Description</Label>
            <Input
              className="w-full"
              name="technical-description"
              id="technical-description"
              placeholder="Built with Next.js 15.2.3 (App Router) and React 19. Written in TypeScript for type safety and better developer experience."
            />
          </div>

          <Button className="mt-3" type="button">
            Add
          </Button>
        </div>

        <div className="w-full space-y-1">
          <h2 className="text-center">Challenges</h2>

          <div className="w-full space-y-1">
            <Label htmlFor="feature-title">Title</Label>
            <Input
              className="w-full"
              name="challenges-title"
              id="challenges-title"
              placeholder=""
            />
          </div>
          <div className="w-full space-y-1 mt-1 mb-3">
            <Label htmlFor="challenges-description">Description</Label>
            <Input
              className="w-full"
              name="challenges-description"
              id="challenges-description"
              placeholder=""
            />
          </div>

          <Button className="mt-3" type="button">
            Add
          </Button>
        </div>

        <Button className="w-full">Create</Button>
      </form>
    </AppShell>
  );
};

export default CreateProject;
