"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface DynamicSectionProps {
  sectionName: string;
  namePrefix: string;
  initialItems?: Field[];
}

interface Field {
  title: string;
  description: string;
}

export default function DynamicSection({
  sectionName,
  namePrefix,
  initialItems,
}: DynamicSectionProps) {
  const [fields, setFields] = useState<Field[]>(
    initialItems || [{ title: "", description: "" }]
  );

  const handleFieldChange = (
    index: number,
    key: keyof Field,
    value: string
  ) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const addField = () => {
    const lastField = fields[fields.length - 1];
    if (lastField.title.trim() && lastField.description.trim()) {
      setFields([...fields, { title: "", description: "" }]);
    } else {
      alert(
        `Please fill both title and description for the last ${sectionName.toLowerCase()} before adding a new one.`
      );
    }
  };

  const removeField = (index: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full space-y-1">
      <h2 className="text-center">{sectionName}</h2>
      {fields.map((field, index) => (
        <div key={index} className="space-y-1 mb-3">
          <div className="w-full space-y-1">
            <Label htmlFor={`${namePrefix}-title-${index}`}>Title</Label>
            <Input
              className="w-full"
              name={`${namePrefix}-title-${index}`}
              id={`${namePrefix}-title-${index}`}
              placeholder={`Enter ${sectionName.toLowerCase()} title`}
              value={field.title}
              onChange={(e) =>
                handleFieldChange(index, "title", e.target.value)
              }
            />
          </div>
          <div className="w-full space-y-1 mt-1">
            <Label htmlFor={`${namePrefix}-description-${index}`}>
              Description
            </Label>
            <Input
              className="w-full"
              name={`${namePrefix}-description-${index}`}
              id={`${namePrefix}-description-${index}`}
              placeholder={`Enter ${sectionName.toLowerCase()} description`}
              value={field.description}
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </div>
          {fields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => removeField(index)}
              className="mt-2"
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={addField}
        className="mt-5 w-full"
      >
        Add another {sectionName}
      </Button>
    </div>
  );
}
