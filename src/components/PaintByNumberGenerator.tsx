import React, { useState, useRef } from 'react';
import { PaintByNumberService } from '../services/paintByNumberService';
import { PaintByNumbersData } from '../types/paintByNumbers';

interface PaintByNumberGeneratorProps {
  onGenerate: (data: PaintByNumbersData) => void;
  onError: (error: Error) => void;
}

const PaintByNumberGenerator: React.FC<PaintByNumberGeneratorProps> = ({
  onGenerate,
  onError,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [colorCount, setColorCount] = useState(16);
  const [simplifyTolerance, setSimplifyTolerance] = useState(1.5);
  const [minFacetArea, setMinFacetArea] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const imageData = await loadImageData(file);
      await processImage(imageData);
    } catch (error) {
      console.error('Error processing image:', error);
      onError(error instanceof Error ? error : new Error('Failed to process image'));
    } finally {
      setIsProcessing(false);
    }
  };

  const loadImageData = (file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not create canvas context'));
          return;
        }

        // Limit maximum dimensions for performance
        const maxDimension = 2000;
        let width = img.width;
        let height = img.height;
        
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Update preview
        if (previewCanvasRef.current) {
          const previewCtx = previewCanvasRef.current.getContext('2d');
          if (previewCtx) {
            previewCanvasRef.current.width = width;
            previewCanvasRef.current.height = height;
            previewCtx.drawImage(canvas, 0, 0, width, height);
          }
        }

        const imageData = ctx.getImageData(0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(imageData);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  };

  const processImage = async (imageData: ImageData) => {
    try {
      const service = PaintByNumberService.getInstance();
      const result = await service.generatePaintByNumber(
        imageData,
        {
          colorCount,
          simplifyTolerance,
          minFacetArea,
        }
      );
      onGenerate(result);
    } catch (error) {
      console.error('Error in processImage:', error);
      throw error;
    }
  };

  const handleGenerateClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Paint by Number Generator</h2>
      
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <canvas
            ref={previewCanvasRef}
            className="border border-gray-300 max-w-full h-auto"
            style={{ maxHeight: '300px' }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Colors: {colorCount}
            </label>
            <input
              type="range"
              min="2"
              max="32"
              value={colorCount}
              onChange={(e) => setColorCount(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={isProcessing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Simplify: {simplifyTolerance.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={simplifyTolerance}
              onChange={(e) => setSimplifyTolerance(parseFloat(e.target.value))}
              className="w-full"
              disabled={isProcessing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Area: {minFacetArea}
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={minFacetArea}
              onChange={(e) => setMinFacetArea(parseInt(e.target.value, 10))}
              className="w-full"
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleGenerateClick}
            disabled={isProcessing}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Generate Paint by Numbers'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isProcessing}
          />
        </div>
      </div>
      
      {isProcessing && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Processing image, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default PaintByNumberGenerator;
