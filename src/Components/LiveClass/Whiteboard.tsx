import { useRef, useState } from 'react';
import {
  Pen,
  Eraser,
  Type,
  Undo2,
  Redo2,
  Trash2,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useWhiteboard, type WhiteboardTool } from '@/hooks/useWhiteboard';

interface WhiteboardProps {
  onClose: () => void;
}

const COLORS = ['#238B45', '#0F172A', '#DC2626', '#2563EB', '#D97706', '#7C3AED'];
const SIZES = [2, 4, 8, 14];

export default function Whiteboard({ onClose }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    startDrawing,
    draw,
    stopDrawing,
    undo,
    redo,
    clearBoard,
    canUndo,
    canRedo,
  } = useWhiteboard(canvasRef);

  const tools: { key: WhiteboardTool; icon: React.ReactNode; label: string }[] = [
    { key: 'pen', icon: <Pen className="h-4 w-4" />, label: 'Pen' },
    { key: 'eraser', icon: <Eraser className="h-4 w-4" />, label: 'Eraser' },
    { key: 'text', icon: <Type className="h-4 w-4" />, label: 'Text' },
  ];

  return (
    <div
      className={`flex flex-col overflow-hidden border-l border-slate-800 bg-white ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-full w-full flex-1'
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
        {tools.map((t) => (
          <button
            key={t.key}
            onClick={() => setTool(t.key)}
            title={t.label}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              tool === t.key
                ? 'bg-[#238B45] text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.icon}
          </button>
        ))}

        <div className="mx-1 h-6 w-px bg-slate-300" />

        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? 'border-slate-900 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="mx-1 h-6 w-px bg-slate-300" />

        <div className="flex items-center gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setBrushSize(s)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                brushSize === s ? 'bg-slate-200' : 'hover:bg-slate-100'
              }`}
            >
              <span
                className="rounded-full bg-slate-700"
                style={{ width: s + 2, height: s + 2 }}
              />
            </button>
          ))}
        </div>

        <div className="mx-1 h-6 w-px bg-slate-300" />

        <button
          onClick={undo}
          disabled={!canUndo}
          title="Undo"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-30"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          title="Redo"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-200 disabled:opacity-30"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <button
          onClick={clearBoard}
          title="Clear Board"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setIsFullscreen((v) => !v)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-200"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            title="Close Whiteboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={1400}
          height={800}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="h-full w-full cursor-crosshair touch-none"
        />
      </div>
    </div>
  );
}