// ✅ Convex-synced NotesCanvas
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DraggableNote } from "@/components/draggable-note";
import { CreateNoteModal } from "@/components/create-note-modal";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { debounce } from "lodash";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex-helpers/react/cache";
import { toast } from "sonner";

export function NotesCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLCanvasElement>(null);
  const startPan = useRef<{ x: number; y: number } | null>(null);
  const pinchStartDistance = useRef<number | null>(null);
  const lastZoom = useRef<number>(1);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const dbNotes = useQuery(api.notes.getNotes);
  const createNote = useMutation(api.notes.createNote);
  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNotePosition = useMutation(api.notes.updateNotePosition);
  const [notes, setNotes] = useState<Doc<"notes">[]>([]);

  useEffect(() => {
    if (dbNotes) setNotes(dbNotes);
  }, [dbNotes]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoom((z) => Math.min(Math.max(z - e.deltaY * 0.001, 0.3), 3));
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const canvas = wrapperRef.current;
    if (!canvas) return;
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dist = getDistance(e.touches[0], e.touches[1]);
        if (pinchStartDistance.current === null) {
          pinchStartDistance.current = dist;
          lastZoom.current = zoom;
        } else {
          const scale = dist / pinchStartDistance.current;
          const newZoom = Math.min(Math.max(lastZoom.current * scale, 0.3), 3);
          setZoom(newZoom);
        }
        e.preventDefault();
      }
    };
    const handleTouchEnd = () => (pinchStartDistance.current = null);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [zoom]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingCanvas || !startPan.current) return;
      const dx = e.clientX - startPan.current.x;
      const dy = e.clientY - startPan.current.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startPan.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => {
      setIsDraggingCanvas(false);
      startPan.current = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingCanvas]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpacePressed(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpacePressed(false);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  //spark animation
  useEffect(() => {
    const canvas = sparksRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
            Math.random() * 100 + 155
          )}, 255, ${Math.random() * 0.5 + 0.1})`,
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > canvas.width) p.x = 0;
        else if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        else if (p.y < 0) p.y = canvas.height;

        // Connect particles with lines if they're close enough
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
          );
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 150, 255, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getDistance = (t1: Touch, t2: Touch) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleCreateNote = async (noteData: {
    content: string;
    color: string;
  }) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;
    try {
      const newNote = {
        content: noteData.content,
        color: noteData.color,
        position: {
          x: Math.random() * (canvasRect.width - 250) + 50,
          y: Math.random() * (canvasRect.height - 200) + 150,
        },
        createdAt: new Date().toISOString(),
        author: "Anonymous",
      };
      await createNote(newNote);
      setIsCreateModalOpen(false);
    } catch {
      toast.error("Failed to create note");
    }
  };

  const debouncedUpdatePosition = useRef(
    debounce((id: Id<"notes">, pos: { x: number; y: number }) => {
      updateNotePosition({ id, position: pos });
    }, 500)
  ).current;

  const zoomToFit = () => {
    if (!canvasRef.current || notes.length === 0) return;
    const bounds = notes.reduce(
      (acc, note) => {
        acc.minX = Math.min(acc.minX, note.position.x);
        acc.minY = Math.min(acc.minY, note.position.y);
        acc.maxX = Math.max(acc.maxX, note.position.x);
        acc.maxY = Math.max(acc.maxY, note.position.y);
        return acc;
      },
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );
    const container = wrapperRef.current;
    if (!container) return;
    const width = bounds.maxX - bounds.minX + 300;
    const height = bounds.maxY - bounds.minY + 300;
    const zoomX = container.offsetWidth / width;
    const zoomY = container.offsetHeight / height;
    const fitZoom = Math.min(zoomX, zoomY, 2);
    setZoom(fitZoom);
    setOffset({ x: -bounds.minX + 50, y: -bounds.minY + 50 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.button === 1 ||
      e.shiftKey ||
      e.metaKey ||
      e.ctrlKey ||
      spacePressed
    ) {
      e.preventDefault();
      setIsDraggingCanvas(true);
      startPan.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen overflow-hidden touch-none select-none"
      onMouseDown={handleMouseDown}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <canvas
        ref={sparksRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />
      {/* Controls */}
      <div className="absolute top-24 left-4 z-20 flex flex-col gap-1">
        <div className="text-sm text-center text-white">
          {Math.round(zoom * 100)}%
        </div>
        <Button
          size="sm"
          className="bg-jordy_blue-400 text-indigo_dye-200"
          onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
        >
          +
        </Button>
        <Button
          size="sm"
          className="bg-jordy_blue-400 text-indigo_dye-200"
          onClick={() => setZoom((z) => Math.max(z - 0.1, 0.3))}
        >
          −
        </Button>
        <Button
          size="sm"
          className="bg-jordy_blue-400 text-indigo_dye-200"
          onClick={() => setZoom(1)}
        >
          Reset
        </Button>
        <Button
          size="sm"
          className="bg-jordy_blue-400 text-indigo_dye-200"
          onClick={zoomToFit}
        >
          Fit
        </Button>
        <Button
          size="sm"
          className="bg-jordy_blue-400 text-indigo_dye-200"
          onClick={() => setIsCreateModalOpen(true)}
        >
          New Note
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        {notes.map((note) => (
          <DraggableNote
            key={note._id}
            note={note}
            onUpdatePosition={(id, pos) => {
              setNotes((prev) =>
                prev.map((n) => (n._id === id ? { ...n, position: pos } : n))
              );
              debouncedUpdatePosition(id, pos);
            }}
            onDelete={(id) => deleteNote({ id })}
          />
        ))}
      </div>

      {/* Mini Map */}
      <div className="absolute bottom-4 right-4 bg-black/40 rounded p-2 text-xs text-white z-50">
        <div className="w-32 h-20 bg-gray-800 relative overflow-hidden">
          {notes.map((note) => (
            <div
              key={note._id}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${note.position.x / 20}px`,
                top: `${note.position.y / 20}px`,
                backgroundColor: note.color,
              }}
            />
          ))}
        </div>
      </div>

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateNote={handleCreateNote}
      />
    </div>
  );
}
