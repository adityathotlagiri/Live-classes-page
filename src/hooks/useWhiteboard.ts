import { useRef, useState, useCallback, useEffect } from 'react';

export type WhiteboardTool = 'pen' | 'eraser' | 'text';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  tool: WhiteboardTool;
  color: string;
  size: number;
  points: Point[];
}

export function useWhiteboard(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [tool, setTool] = useState<WhiteboardTool>('pen');
  const [color, setColor] = useState('#238B45');
  const [brushSize, setBrushSize] = useState(4);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);

  const isDrawing = useRef(false);
  const currentPoints = useRef<Point[]>([]);
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const sizeRef = useRef(brushSize);

  // Keep refs in sync so the mousemove handler always sees latest values
  // without needing to re-run the effect that attaches full redraw logic.
  useEffect(() => { toolRef.current = tool; }, [tool]);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => { sizeRef.current = brushSize; }, [brushSize]);

  const fullRedraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const stroke of strokes) {
      drawStroke(ctx, stroke);
    }
  }, [strokes, canvasRef]);

  // Only re-runs on undo/redo/clear/mount — NOT on every mouse move
  useEffect(() => {
    fullRedraw();
  }, [fullRedraw]);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    currentPoints.current = [getPoint(e)];
    setRedoStack([]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const point = getPoint(e);
    const prevPoint = currentPoints.current[currentPoints.current.length - 1];
    currentPoints.current.push(point);

    // Draw only the new segment directly — no React state, no full redraw
    ctx.beginPath();
    ctx.strokeStyle = toolRef.current === 'eraser' ? '#ffffff' : colorRef.current;
    ctx.lineWidth = toolRef.current === 'eraser' ? sizeRef.current * 3 : sizeRef.current;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing.current && currentPoints.current.length > 1) {
      const newStroke: Stroke = {
        tool: toolRef.current,
        color: colorRef.current,
        size: sizeRef.current,
        points: currentPoints.current,
      };
      setStrokes((prev) => [...prev, newStroke]);
    }
    isDrawing.current = false;
    currentPoints.current = [];
  };

  const undo = useCallback(() => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((redo) => [...redo, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const clearBoard = useCallback(() => {
    setStrokes([]);
    setRedoStack([]);
  }, []);

  return {
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
    canUndo: strokes.length > 0,
    canRedo: redoStack.length > 0,
  };
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
  if (stroke.points.length < 2) return;
  ctx.beginPath();
  ctx.strokeStyle = stroke.tool === 'eraser' ? '#ffffff' : stroke.color;
  ctx.lineWidth = stroke.tool === 'eraser' ? stroke.size * 3 : stroke.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (const point of stroke.points.slice(1)) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}