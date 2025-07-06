"use client";

import { useState, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Edit3, Save, RotateCcw, Loader2 } from "lucide-react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useQuery } from "convex-helpers/react/cache";

interface DraggableNoteProps {
  note: Doc<"notes">;
  onUpdatePosition: (
    id: Id<"notes">,
    position: { x: number; y: number }
  ) => void;
  onDelete: (id: Id<"notes">) => void;
}

export function DraggableNote({
  note,
  onUpdatePosition,
  onDelete,
}: DraggableNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const editNote = useMutation(api.notes.editNote);
  const user = useQuery(api.auth.loggedInUser);
  const [loading, setLoading] = useState(false);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const newPosition = {
      x: note.position.x + info.offset.x,
      y: note.position.y + info.offset.y,
    };
    onUpdatePosition(note._id, newPosition);
  };

  const handleDoubleClick = () => {
    if (user?._id !== note.userId) {
      return;
    }
    if (!isDragging) {
      setIsEditing(true);
      setEditContent(note.content);
    }
  };

  const handleSaveEdit = async () => {
    // In a real app, you'd update the note content here
    if (!editContent.trim()) {
      toast.error("Content required");
    }
    setLoading(true);
    await editNote({ noteId: note._id, content: editContent.trim() });
    setIsEditing(false);
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(note.content);
  };

  const getTextColor = (backgroundColor: string) => {
    // Simple contrast calculation
    const hex = backgroundColor.replace("#", "");
    const r = Number.parseInt(hex.substr(0, 2), 16);
    const g = Number.parseInt(hex.substr(2, 2), 16);
    const b = Number.parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      ref={constraintsRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      initial={{
        x: note.position.x,
        y: note.position.y,
        scale: 0,
        rotate: Math.random() * 10 - 5,
      }}
      animate={{
        x: note.position.x,
        y: note.position.y,
        scale: 1,
        rotate: isDragging ? 0 : Math.random() * 10 - 5,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10,
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 0,
        zIndex: 20,
        cursor: "grabbing",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ zIndex: isDragging ? 20 : 1 }}
      onDoubleClick={handleDoubleClick}
    >
      <Card
        className="w-64 min-h-32 shadow-lg border-0 overflow-hidden"
        style={{
          backgroundColor: note.color,
          color: getTextColor(note.color),
        }}
      >
        <CardContent className="p-4 relative">
          {/* Delete Button */}
          {user?._id === note.userId && (
            <Button
              onClick={(e) => {
                e.stopPropagation();

                onDelete(note._id);
              }}
              className="absolute top-2 right-2 h-6 w-6 p-0 bg-black/20 hover:bg-black/40 border-0"
              variant="ghost"
              size="sm"
            >
              <X className="h-3 w-3" />
            </Button>
          )}

          {/* Content */}
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-20 resize-none border-0 bg-white/20 text-inherit placeholder:text-inherit/60"
                placeholder="Write your note..."
                autoFocus
              />
              <div className="flex gap-1">
                <Button
                  onClick={handleSaveEdit}
                  size="sm"
                  disabled={loading}
                  className="h-6 px-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Save className="h-3 w-3" />
                  )}
                </Button>
                <Button
                  disabled={loading}
                  onClick={handleCancelEdit}
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 bg-black/20 hover:bg-black/40"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="pr-8 mb-3">
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {note.content}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs opacity-70">
                <span>{note.author}</span>
                <span>{formatDate(note.createdAt)}</span>
              </div>

              {/* Edit Indicator */}
              {user?._id === note.userId && (
                <div className="absolute bottom-2 right-8 opacity-50">
                  <Edit3 className="h-3 w-3" />
                </div>
              )}
            </>
          )}

          {/* Decorative Corner */}
          <div
            className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent"
            style={{
              borderBottomColor: `${note.color}dd`,
              filter: "brightness(0.8)",
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
