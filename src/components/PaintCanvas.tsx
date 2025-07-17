import React, { useRef, useEffect, useState } from 'react';
import { PaintByNumbersData } from '../types/paintByNumbers';

interface PaintCanvasProps {
  originalImage: string;
  paintByNumbersData: PaintByNumbersData | null;
  selectedColor: string;
  selectedColorNumber: number;
  brushSize: number;
  isProcessing: boolean;
  processingError: string | null;
}

const PaintCanvas: React.FC<PaintCanvasProps> = ({
  originalImage,
  paintByNumbersData,
  selectedColor,
  selectedColorNumber,
  brushSize,
  isProcessing,
  processingError
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);

  useEffect(() => {
    if (paintByNumbersData && canvasRef.current) {
      drawPaintByNumbers();
    }
  }, [paintByNumbersData, showNumbers]);

  const drawPaintByNumbers = () => {
    const canvas = canvasRef.current;
    if (!canvas || !paintByNumbersData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = paintByNumbersData.dimensions.width;
    canvas.height = paintByNumbersData.dimensions.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the AI-processed paint-by-numbers image as background
    const processedImg = new Image();
    processedImg.onload = () => {
      // Draw the processed paint-by-numbers image
      ctx.drawImage(processedImg, 0, 0, canvas.width, canvas.height);
      
      // Draw regions and numbers on top
      drawRegionsAndNumbers(ctx);
    };
    processedImg.src = paintByNumbersData.processedImageUrl || originalImage;
  };

  const drawRegionsAndNumbers = (ctx: CanvasRenderingContext2D) => {
    if (!paintByNumbersData) return;

    paintByNumbersData.regions.forEach(region => {
      const color = paintByNumbersData.colors.find(c => c.number === region.colorNumber);
      if (!color) return;

      // Create path from SVG path string
      const path2D = new Path2D(region.path);
      
      // Draw region outline
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke(path2D);

      // Fill region if painted
      if (region.isPainted) {
        ctx.fillStyle = color.hex;
        ctx.fill(path2D);
      }

      // Draw numbers if enabled and region not painted
      if (showNumbers && !region.isPainted) {
        // Calculate center of region for number placement
        const bounds = getPathBounds(region.path);
        const centerX = bounds.x + bounds.width / 2;
        const centerY = bounds.y + bounds.height / 2;
        
        // Draw number with background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(centerX - 12, centerY - 8, 24, 16);
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(region.colorNumber.toString(), centerX, centerY);
      }
    });
  };

  const getPathBounds = (pathString: string) => {
    // Simple bounds calculation for SVG path
    // Extract numbers from path string
    const numbers = pathString.match(/[\d.]+/g)?.map(Number) || [];
    if (numbers.length < 4) return { x: 0, y: 0, width: 100, height: 100 };
    
    const xCoords = numbers.filter((_, i) => i % 2 === 0);
    const yCoords = numbers.filter((_, i) => i % 2 === 1);
    
    const minX = Math.min(...xCoords);
    const maxX = Math.max(...xCoords);
    const minY = Math.min(...yCoords);
    const maxY = Math.max(...yCoords);
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!paintByNumbersData) return;
    setIsPainting(true);
    paint(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPainting || !paintByNumbersData) return;
    paint(e);
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const paint = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !paintByNumbersData) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find which region contains this point
    const clickedRegion = paintByNumbersData.regions.find(region => {
      const path2D = new Path2D(region.path);
      return ctx.isPointInPath(path2D, x, y);
    });

    if (clickedRegion && clickedRegion.colorNumber === selectedColorNumber) {
      // Paint the region if it matches the selected color
      clickedRegion.isPainted = true;
      drawPaintByNumbers(); // Redraw canvas
    } else if (clickedRegion) {
      // Show feedback for wrong color
      console.log(`Wrong color! This region needs color ${clickedRegion.colorNumber}, but you selected ${selectedColorNumber}`);
    } else {
      // Free painting mode - paint with brush
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
      ctx.fillStyle = selectedColor;
      ctx.fill();
    }
  };

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">AI is analyzing your image...</p>
          <p className="text-sm text-gray-500 mt-2">Processing through Hugging Face models</p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="text-xs text-gray-400 space-y-1">
              <div>• AI image analysis</div>
              <div>• Paint-by-numbers style conversion</div>
              <div>• Color palette and region generation</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (processingError) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-50 rounded-lg border border-red-200">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Processing Failed</h3>
          <p className="text-red-600 mb-4">{processingError}</p>
          <div className="text-sm text-red-500 space-y-1">
            <p>• Check your internet connection</p>
            <p>• Try a different image format (JPG, PNG)</p>
            <p>• Ensure image size is under 10MB</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showNumbers}
              onChange={(e) => setShowNumbers(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">Show Numbers</span>
          </label>
        </div>
        <div className="text-sm text-gray-500">
          Selected: Color {selectedColorNumber}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">🎨 How to Paint:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Select a color from the palette on the right</li>
          <li>2. Click and drag on the canvas to paint regions</li>
          <li>3. Use the brush size slider to adjust your brush</li>
          <li>4. Toggle numbers on/off to see your progress</li>
        </ol>
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600">
            💡 <strong>Tip:</strong> This image was processed using Hugging Face AI for optimal paint-by-numbers conversion
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaintCanvas;