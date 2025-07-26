import React, { useState } from 'react';
import { Upload, Palette, Image as ImageIcon, Sparkles, Settings, Save } from 'lucide-react';

interface HomeProps {
  onImageUpload: (imageData: string) => void;
  onGeneratePaintByNumbers: (imageData: string) => void;
  onOpenGallery: () => void;
  onOpenTemplates: () => void;
}

const Home: React.FC<HomeProps> = ({
  onImageUpload,
  onGeneratePaintByNumbers,
  onOpenGallery,
  onOpenTemplates
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Handle file processing
  const processFile = (file: File, callback: (data: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        callback(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file, onImageUpload);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file, onImageUpload);
    }
  };



  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Create Your Own</span>
            <span className="block text-purple-600">Paint by Numbers</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform your photos into beautiful paint by numbers masterpieces with our AI-powered tool.
          </p>
        </div>

        {/* Main Action Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div 
            className={`p-8 border-2 border-dashed rounded-lg text-center transition-colors ${
              dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-purple-100 rounded-full">
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload an Image</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supports JPG, PNG up to 10MB
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <button
            onClick={onOpenTemplates}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-blue-100 rounded-full mb-3">
              <Palette className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Browse Templates</h3>
            <p className="mt-1 text-xs text-gray-500 text-center">Choose from our collection of beautiful designs</p>
          </button>

          <button 
            onClick={onOpenGallery}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-green-100 rounded-full mb-3">
              <ImageIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">My Gallery</h3>
            <p className="mt-1 text-xs text-gray-500 text-center">View and continue your previous works</p>
          </button>

          <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-3 bg-yellow-100 rounded-full mb-3">
              <Sparkles className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">AI Enhance</h3>
            <p className="mt-1 text-xs text-gray-500 text-center">Let AI improve your photo quality</p>
          </button>

          <button className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-3 bg-purple-100 rounded-full mb-3">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Customize</h3>
            <p className="mt-1 text-xs text-gray-500 text-center">Advanced settings for your project</p>
          </button>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
            <button className="text-sm font-medium text-purple-600 hover:text-purple-500">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-gray-100">
                    <Save className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 truncate">Project {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
