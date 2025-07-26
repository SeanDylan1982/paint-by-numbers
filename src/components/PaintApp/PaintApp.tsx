// src/components/PaintApp/PaintApp.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { X, Save, Download, Image as ImageIcon, Palette } from "lucide-react";

interface Segment {
  id: number;
  color: string;
  number: number;
}

export default function PaintApp() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Process image to create paint by numbers
  const processImage = useCallback(() => {
    if (!canvasRef.current || !previewCanvasRef.current || !imageRef.current) return;
    
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const previewCtx = previewCanvas.getContext('2d');
    
    if (!ctx || !previewCtx) return;
    
    setIsProcessing(true);
    
    // Set canvas dimensions
    const maxSize = 800;
    let width = imageRef.current.naturalWidth;
    let height = imageRef.current.naturalHeight;
    
    if (width > height) {
      if (width > maxSize) {
        height = (height / width) * maxSize;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width = (width / height) * maxSize;
        height = maxSize;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    previewCanvas.width = width;
    previewCanvas.height = height;
    
    // Draw image on canvas
    ctx.drawImage(imageRef.current, 0, 0, width, height);
    
    // Process image to create segments (simplified version)
    setTimeout(() => {
      // In a real app, you would use an image processing library here
      // For this example, we'll create a simplified version with random segments
      const segmentCount = 50; // Number of segments
      const newSegments: Segment[] = [];
      const newColors: string[] = [];
      
      // Generate distinct colors
      for (let i = 0; i < 10; i++) {
        newColors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`);
      }
      
      // Generate segments
      for (let i = 0; i < segmentCount; i++) {
        const colorIndex = Math.floor(Math.random() * newColors.length);
        newSegments.push({
          id: i,
          color: newColors[colorIndex],
          number: i + 1
        });
      }
      
      setColors(newColors);
      setSegments(newSegments);
      setSelectedColor(newColors[0]);
      
      // Draw the initial preview
      drawPreview();
      setIsProcessing(false);
    }, 1000);
  }, []);
  
  // Draw the paint by numbers preview
  const drawPreview = useCallback(() => {
    if (!previewCanvasRef.current || !canvasRef.current) return;
    
    const previewCtx = previewCanvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    
    if (!previewCtx) return;
    
    // Clear the canvas
    previewCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the original image in grayscale
    previewCtx.filter = 'grayscale(100%)';
    previewCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    previewCtx.filter = 'none';
    
    // Draw segments (simplified - in a real app, this would use actual image segmentation)
    const segmentSize = 40;
    const cols = Math.ceil(canvas.width / segmentSize);
    const rows = Math.ceil(canvas.height / segmentSize);
    
    previewCtx.font = '12px Arial';
    previewCtx.textAlign = 'center';
    previewCtx.textBaseline = 'middle';
    
    segments.forEach((segment, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = col * segmentSize + segmentSize / 2;
      const y = row * segmentSize + segmentSize / 2;
      
      // Draw segment with light fill
      previewCtx.fillStyle = segment.color + '40'; // Add transparency
      previewCtx.beginPath();
      previewCtx.arc(x, y, segmentSize / 2 - 2, 0, Math.PI * 2);
      previewCtx.fill();
      
      // Draw border
      previewCtx.strokeStyle = '#000';
      previewCtx.lineWidth = 1;
      previewCtx.stroke();
      
      // Draw number
      if (showNumbers) {
        previewCtx.fillStyle = '#000';
        previewCtx.fillText(segment.number.toString(), x, y);
      }
    });
  }, [segments, showNumbers]);
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          imageRef.current = img;
          setImage(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle canvas click to fill segments
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!previewCanvasRef.current || !selectedColor) return;
    
    const canvas = previewCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // In a real app, you would find which segment was clicked and fill it
    // For this example, we'll just draw a circle where clicked
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  };
  
  // Download the painted image
  const handleDownload = () => {
    if (!previewCanvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'paint-by-numbers.png';
    link.href = previewCanvasRef.current.toDataURL('image/png');
    link.click();
  };
  
  // Process image when it's loaded
  useEffect(() => {
    if (image) {
      processImage();
    }
  }, [image, processImage]);
  
  // Update preview when segments or showNumbers changes
  useEffect(() => {
    if (segments.length > 0) {
      drawPreview();
    }
  }, [segments, showNumbers, drawPreview]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Your Paint by Numbers
            </h2>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-5 w-5 mr-2" />
              Back to Home
            </a>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
            {!image ? (
              <div className="space-y-4">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Drag and drop an image here, or click to select
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Select Image
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    ref={el => imageRef.current = el}
                    src={image}
                    alt="Uploaded preview"
                    className="hidden"
                  />
                  <canvas
                    ref={canvasRef}
                    className="hidden"
                  />
                  <canvas
                    ref={previewCanvasRef}
                    className="max-w-full h-auto mx-auto rounded-lg shadow-md cursor-crosshair"
                    onClick={handleCanvasClick}
                  />
                </div>

                {colors.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        Color Palette
                      </h3>
                      <button
                        onClick={() => setShowNumbers(!showNumbers)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Palette className="h-4 w-4 mr-1" />
                        {showNumbers ? 'Hide Numbers' : 'Show Numbers'}
                      </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color
                              ? "border-purple-600"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                          title={`Color ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    disabled={!image || isProcessing}
                    onClick={processImage}
                  >
                    {isProcessing ? 'Processing...' : 'Regenerate'}
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={!image || isProcessing}
                    onClick={handleDownload}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
