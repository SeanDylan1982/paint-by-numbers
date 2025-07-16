import React, { useState } from 'react';
import { Upload, Palette, Brush, Download, RotateCcw } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import PaintCanvas from './components/PaintCanvas';
import ColorPalette from './components/ColorPalette';
import BrushTool from './components/BrushTool';
import { AIProcessorService } from './services/aiProcessor';
import { PaintByNumbersData } from './types/paintByNumbers';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [paintByNumbersData, setPaintByNumbersData] = useState<PaintByNumbersData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedColorNumber, setSelectedColorNumber] = useState<number>(1);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const aiProcessor = AIProcessorService.getInstance();

  const handleImageUpload = async (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setIsProcessing(true);
    setProcessingError(null);
    
    try {
      console.log('Starting AI processing...');
      const processedData = await aiProcessor.processImageToPaintByNumbers(imageDataUrl);
      setPaintByNumbersData(processedData);
      console.log('AI processing completed successfully');
    } catch (error) {
      console.error('Error processing image:', error);
      setProcessingError(error instanceof Error ? error.message : 'Processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleColorSelect = (color: string, colorNumber: number) => {
    setSelectedColor(color);
    setSelectedColorNumber(colorNumber);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setPaintByNumbersData(null);
    setProcessingError(null);
    setSelectedColor('#000000');
    setSelectedColorNumber(1);
  };

  const handleExport = () => {
    // Export functionality will be implemented
    console.log('Exporting artwork...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Paint by Numbers
              </h1>
            </div>
            {paintByNumbersData && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!uploadedImage ? (
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Transform Your Images into Paint by Numbers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload any image and watch as AI converts it into a beautiful paint-by-numbers template. 
                Then paint it digitally with our intuitive tools.
              </p>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Paint Canvas</h3>
                  {isProcessing && (
                    <div className="flex items-center space-x-2 text-purple-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span>AI is analyzing your image...</span>
                    </div>
                  )}
                  {processingError && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <span className="text-sm">⚠️ {processingError}</span>
                    </div>
                  )}
                </div>
                
                <PaintCanvas
                  originalImage={uploadedImage}
                  paintByNumbersData={paintByNumbersData}
                  selectedColor={selectedColor}
                  selectedColorNumber={selectedColorNumber}
                  brushSize={brushSize}
                  isProcessing={isProcessing}
                  processingError={processingError}
                />
              </div>
            </div>

            {/* Tools Panel */}
            <div className="space-y-6">
              {/* Brush Tool */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Brush className="w-5 h-5 mr-2" />
                  Brush Tool
                </h3>
                <BrushTool
                  brushSize={brushSize}
                  onBrushSizeChange={setBrushSize}
                  selectedColor={selectedColor}
                />
              </div>

              {/* Color Palette */}
              {paintByNumbersData && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Color Palette
                  </h3>
                  <ColorPalette
                    colors={paintByNumbersData.colors}
                    selectedColor={selectedColor}
                    onColorSelect={handleColorSelect}
                  />
                </div>
              )}

              {/* Progress */}
              {paintByNumbersData && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Completion</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full w-0 transition-all duration-300"></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      0 of {paintByNumbersData.regions.length} regions painted
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;