import React, { useState, useEffect } from 'react';
import { Upload, Palette, Brush, Download, RotateCcw, User, LogOut, Save, FolderOpen } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import PaintCanvas from './components/PaintCanvas';
import ColorPalette from './components/ColorPalette';
import BrushTool from './components/BrushTool';
import BoardSelection from './components/BoardSelection';
import AuthModal from './components/AuthModal';
import UserPaintings from './components/UserPaintings';
import { AIProcessorService } from './services/aiProcessor';
import { PaintingService, UserPainting } from './services/paintingService';
import { PaintByNumbersData } from './types/paintByNumbers';
import { useAuth } from './hooks/useAuth';

type AppMode = 'upload' | 'boards' | 'paintings' | 'canvas';

function App() {
  const [mode, setMode] = useState<AppMode>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [paintByNumbersData, setPaintByNumbersData] = useState<PaintByNumbersData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedColorNumber, setSelectedColorNumber] = useState<number>(1);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [currentPaintingId, setCurrentPaintingId] = useState<string | null>(null);
  const [paintingTitle, setPaintingTitle] = useState<string>('Untitled Painting');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  const { user, loading: authLoading, signOut } = useAuth();
  const aiProcessor = AIProcessorService.getInstance();

  const handleImageUpload = async (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setMode('canvas');
    setIsProcessing(true);
    setProcessingError(null);
    setCurrentPaintingId(null);
    setPaintingTitle('Untitled Painting');
    
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
    setMode('upload');
    setUploadedImage(null);
    setPaintByNumbersData(null);
    setProcessingError(null);
    setSelectedColor('#000000');
    setSelectedColorNumber(1);
    setCurrentPaintingId(null);
    setPaintingTitle('Untitled Painting');
  };

  const handleSavePainting = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!uploadedImage || !paintByNumbersData) return;

    try {
      if (currentPaintingId) {
        // Update existing painting
        const { error } = await PaintingService.updatePainting(
          currentPaintingId,
          paintByNumbersData,
          paintingTitle
        );
        if (error) {
          alert('Failed to save painting');
        } else {
          alert('Painting saved successfully!');
        }
      } else {
        // Save new painting
        const { data, error } = await PaintingService.savePainting(
          paintingTitle,
          uploadedImage,
          null, // processed image URL will be handled by the service
          paintByNumbersData
        );
        if (error) {
          alert('Failed to save painting');
        } else {
          setCurrentPaintingId(data?.id || null);
          alert('Painting saved successfully!');
        }
      }
    } catch (error) {
      alert('Failed to save painting');
    }
  };

  const handleLoadPainting = (painting: UserPainting) => {
    setUploadedImage(painting.original_image_url);
    setPaintByNumbersData(painting.painting_data);
    setCurrentPaintingId(painting.id);
    setPaintingTitle(painting.title);
    setMode('canvas');
  };

  const handleExport = () => {
    // Export functionality will be implemented
    console.log('Exporting artwork...');
  };

  const handleSignOut = async () => {
    await signOut();
    handleReset();
  };

  const getProgress = () => {
    if (!paintByNumbersData) return 0;
    const completedRegions = paintByNumbersData.regions.filter(r => r.isPainted).length;
    return Math.round((completedRegions / paintByNumbersData.regions.length) * 100);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setMode('upload')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mode === 'upload' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setMode('boards')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mode === 'boards' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Boards
              </button>
              {user && (
                <button
                  onClick={() => setMode('paintings')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    mode === 'paintings' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  My Paintings
                </button>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {mode === 'canvas' && paintByNumbersData && (
                <>
                  {user && (
                    <button
                      onClick={handleSavePainting}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  )}
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
                </>
              )}

              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {mode === 'upload' && (
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
        )}

        {mode === 'boards' && (
          <BoardSelection onBoardSelect={handleImageUpload} />
        )}

        {mode === 'paintings' && user && (
          <UserPaintings onLoadPainting={handleLoadPainting} />
        )}

        {mode === 'canvas' && uploadedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-semibold text-gray-800">Paint Canvas</h3>
                    {user && (
                      <input
                        type="text"
                        value={paintingTitle}
                        onChange={(e) => setPaintingTitle(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Painting title..."
                      />
                    )}
                  </div>
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
                      <span>{getProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgress()}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {paintByNumbersData.regions.filter(r => r.isPainted).length} of {paintByNumbersData.regions.length} regions painted
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}

export default App;