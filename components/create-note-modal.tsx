"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Palette, Send } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex-helpers/react/cache";
import { api } from "@/convex/_generated/api";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNote: (noteData: { content: string; color: string }) => void;
}

const NOTE_COLORS = [
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#ec4899", // Pink
  "#8b5a2b", // Brown
  "#6b7280", // Gray
  "#3b82f6", // Blue
  "#84cc16", // Lime
  "#f97316", // Orange
  "#a855f7", // Violet
];

export function CreateNoteModal({
  isOpen,
  onClose,
  onCreateNote,
}: CreateNoteModalProps) {
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAuthenticated = useQuery(api.auth.isAuthenticated);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    onCreateNote({
      content: content.trim(),
      color: selectedColor,
    });

    // Reset form
    setContent("");
    setSelectedColor(NOTE_COLORS[0]);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setContent("");
    setSelectedColor(NOTE_COLORS[0]);
    onClose();
  };

  const getTextColor = (backgroundColor: string) => {
    const hex = backgroundColor.replace("#", "");
    const r = Number.parseInt(hex.substr(0, 2), 16);
    const g = Number.parseInt(hex.substr(2, 2), 16);
    const b = Number.parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <Card className="w-full max-w-md bg-[#1a1a1a] border-gray-800 overflow-y-scroll h-screen">
              {!isAuthenticated && (
                <p className="text-center mt-5 font-medium">
                  <Link
                    className="text-purple-500 font-bold underline"
                    href="/signin"
                  >
                    Login
                  </Link>{" "}
                  to create notes
                </p>
              )}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl text-white">
                  Create Anonymous Note
                  <p className="text-sm text-gray-400">
                    Your note will be deleted after 1 day
                  </p>
                </CardTitle>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Content Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Your Note
                  </label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your thoughts, inspiration, or anything you'd like..."
                    className="min-h-32 bg-[#232323] border-gray-700 focus:border-purple-500 resize-none"
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {content.length}/500 characters
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-jordy_blue" />
                    <label className="text-sm font-medium text-gray-300">
                      Choose Color
                    </label>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {NOTE_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                          selectedColor === color
                            ? "border-white shadow-lg scale-110"
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Preview
                  </label>
                  <div
                    className="p-4 rounded-lg border min-h-24 relative"
                    style={{
                      backgroundColor: selectedColor,
                      color: getTextColor(selectedColor),
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {content || "Your note will appear like this..."}
                    </p>
                    <div className="absolute bottom-2 right-2 text-xs opacity-70">
                      Anonymous
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 border-gray-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !content.trim() || isSubmitting || !isAuthenticated
                    }
                    className="flex-1 bg-jordy_blue-400 hover:bg-jordy_blue-400 text-indigo_dye-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Create Note
                      </div>
                    )}
                  </Button>
                </div>

                {/* Guidelines */}
                <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-700">
                  <p className="font-medium">Guidelines:</p>
                  <ul className="space-y-1 ml-2">
                    <li>• Be respectful and kind to others</li>
                    <li>• No personal information or harmful content</li>
                    <li>• Notes are public and visible to everyone</li>
                    <li>• Keep it positive and inspiring! ✨</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
