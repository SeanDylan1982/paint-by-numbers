import React from 'react';
import { PaintByNumbersColor } from '../types/paintByNumbers';

interface ColorPaletteProps {
  colors: PaintByNumbersColor[];
  selectedColor: string;
  onColorSelect: (color: string, colorNumber: number) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  selectedColor,
  onColorSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {colors.map((color) => (
          <button
            key={color.number}
            onClick={() => onColorSelect(color.hex, color.number)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
              selectedColor === color.hex
                ? 'border-purple-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ backgroundColor: color.hex }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 text-gray-800 font-bold text-sm px-2 py-1 rounded">
                {color.number}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Color Details */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-800 mb-3">Selected Color</h4>
        {colors.map((color) => 
          selectedColor === color.hex ? (
            <div key={color.number} className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="font-medium text-gray-800">
                  Color {color.number}
                </div>
                <div className="text-sm text-gray-600">{color.name}</div>
                <div className="text-xs text-gray-500 font-mono">
                  {color.hex}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Color Usage Stats */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-800 mb-3">Color Usage</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color.number} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.number}</span>
              </div>
              <span className="text-gray-500">0% used</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;