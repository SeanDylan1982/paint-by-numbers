import React from 'react';
import { Brush } from 'lucide-react';

interface BrushToolProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  selectedColor: string;
}

const BrushTool: React.FC<BrushToolProps> = ({
  brushSize,
  onBrushSizeChange,
  selectedColor
}) => {
  return (
    <div className="space-y-4">
      {/* Brush Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brush Size: {brushSize}px
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1px</span>
            <span>50px</span>
          </div>
        </div>
      </div>

      {/* Brush Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brush Preview
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center justify-center">
          <div
            className="rounded-full border-2 border-gray-300"
            style={{
              width: `${brushSize}px`,
              height: `${brushSize}px`,
              backgroundColor: selectedColor,
              minWidth: '4px',
              minHeight: '4px'
            }}
          />
        </div>
      </div>

      {/* Brush Settings */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opacity
          </label>
          <input
            type="range"
            min="10"
            max="100"
            defaultValue="100"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hardness
          </label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="80"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Quick Size Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quick Sizes
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[5, 15, 25].map((size) => (
            <button
              key={size}
              onClick={() => onBrushSizeChange(size)}
              className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                brushSize === size
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrushTool;