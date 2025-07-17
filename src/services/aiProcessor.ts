/**
 * Frontend AI Processing Service
 * Handles direct communication with Hugging Face APIs from the browser
 */

export interface AIProcessingResult {
  processedImageUrl: string;
  regions: Array<{
    id: number;
    colorNumber: number;
    path: string;
    isPainted: boolean;
  }>;
  colors: Array<{
    number: number;
    hex: string;
    name: string;
  }>;
  dimensions: {
    width: number;
    height: number;
  };
}

export class AIProcessorService {
  private static instance: AIProcessorService;
  private hfToken: string;

  private constructor() {
    // Use your Hugging Face token directly
    this.hfToken = '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';
  }

  public static getInstance(): AIProcessorService {
    if (!AIProcessorService.instance) {
      AIProcessorService.instance = new AIProcessorService();
    }
    return AIProcessorService.instance;
  }

  /**
   * Process an image to create paint-by-numbers format using Hugging Face APIs
   */
  async processImageToPaintByNumbers(imageDataUrl: string): Promise<AIProcessingResult> {
    try {
      console.log('Starting Flux AI processing...');

      // Convert data URL to base64
      const base64Data = imageDataUrl.split(',')[1];
      const fullDataUrl = `data:image/jpeg;base64,${base64Data}`;

      let processedImageUrl: string;

      // Try Flux model first
      try {
        processedImageUrl = await this.processWithFlux(fullDataUrl);
        console.log('Flux processing successful');
      } catch (error) {
        console.warn('Flux processing failed, trying ControlNet:', error);
        try {
          processedImageUrl = await this.processWithControlNet(fullDataUrl);
          console.log('ControlNet processing successful');
        } catch (controlNetError) {
          console.warn('ControlNet processing failed, trying Stable Diffusion:', controlNetError);
          try {
            processedImageUrl = await this.processWithStableDiffusion(fullDataUrl);
            console.log('Stable Diffusion processing successful');
          } catch (sdError) {
            console.error('All AI processing methods failed:', sdError);
            throw new Error('AI processing failed. Please try a different image or try again later.');
          }
        }
      }

      // Generate color palette and regions
      const colors = this.generateColorPalette();
      const regions = this.generateRegions();

      return {
        processedImageUrl,
        regions,
        colors,
        dimensions: {
          width: 800,
          height: 600
        }
      };

    } catch (error) {
      console.error('AI processing error:', error);
      
      // Provide fallback processing for development/demo
      if (import.meta.env.DEV) {
        console.warn('Using fallback processing - AI service may be unavailable');
        return this.getFallbackProcessing();
      }
      
      throw error;
    }
  }

  private async processWithFlux(dataUrl: string): Promise<string> {
    const response = await fetch(
      "https://router.huggingface.co/replicate/v1/models/black-forest-labs/flux-kontext-dev/predictions",
      {
        headers: {
          Authorization: `Bearer ${this.hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: dataUrl,
          parameters: {
            prompt: "Convert this image into a paint by numbers coloring book style with clear black outlines, simplified colors, numbered regions, flat colors, no gradients, cartoon style, coloring book format",
            num_inference_steps: 20,
            guidance_scale: 7.5,
            width: 800,
            height: 600
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Flux API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    // Handle different response formats
    if (result.images && result.images[0]) {
      return result.images[0];
    } else if (result.url) {
      return result.url;
    } else if (result.data && result.data[0]) {
      return result.data[0];
    } else {
      // Convert blob response to data URL
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    }
  }

  private async processWithControlNet(dataUrl: string): Promise<string> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/lllyasviel/sd-controlnet-canny",
      {
        headers: {
          Authorization: `Bearer ${this.hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: dataUrl,
          parameters: {
            prompt: "paint by numbers coloring book, black outlines, simplified colors, flat regions, numbered areas",
            num_inference_steps: 20,
            controlnet_conditioning_scale: 1.0
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`ControlNet API Error: ${response.status}`);
    }

    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  private async processWithStableDiffusion(dataUrl: string): Promise<string> {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: {
          Authorization: `Bearer ${this.hfToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: "paint by numbers coloring book style with black outlines and simplified colors",
          parameters: {
            num_inference_steps: 20,
            guidance_scale: 7.5
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Stable Diffusion API Error: ${response.status}`);
    }

    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  private generateColorPalette() {
    return [
      { number: 1, hex: '#FF6B6B', name: 'Coral Red' },
      { number: 2, hex: '#4ECDC4', name: 'Turquoise' },
      { number: 3, hex: '#45B7D1', name: 'Sky Blue' },
      { number: 4, hex: '#96CEB4', name: 'Mint Green' },
      { number: 5, hex: '#FFEAA7', name: 'Warm Yellow' },
      { number: 6, hex: '#DDA0DD', name: 'Plum' },
      { number: 7, hex: '#FFB347', name: 'Peach' },
      { number: 8, hex: '#98D8C8', name: 'Seafoam' },
      { number: 9, hex: '#F7DC6F', name: 'Butter' },
      { number: 10, hex: '#BB8FCE', name: 'Lavender' },
      { number: 11, hex: '#85C1E9', name: 'Light Blue' },
      { number: 12, hex: '#F8C471', name: 'Golden' },
      { number: 13, hex: '#F1948A', name: 'Salmon' },
      { number: 14, hex: '#82E0AA', name: 'Light Green' },
      { number: 15, hex: '#D7BDE2', name: 'Soft Purple' }
    ];
  }

  private generateRegions() {
    const regions = [];
    const gridSize = 4;
    const cellWidth = 800 / gridSize;
    const cellHeight = 600 / gridSize;
    
    let regionId = 1;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const regionsPerCell = 2 + Math.floor(Math.random() * 2);
        
        for (let i = 0; i < regionsPerCell; i++) {
          const baseX = col * cellWidth + Math.random() * (cellWidth * 0.3);
          const baseY = row * cellHeight + Math.random() * (cellHeight * 0.3);
          const width = 40 + Math.random() * 80;
          const height = 40 + Math.random() * 80;
          
          const path = this.generateOrganicPath(baseX, baseY, width, height);
          
          regions.push({
            id: regionId++,
            colorNumber: ((regionId - 2) % 15) + 1,
            path: path,
            isPainted: false
          });
          
          if (regionId > 50) break;
        }
        if (regionId > 50) break;
      }
      if (regionId > 50) break;
    }
    
    return regions;
  }

  private generateOrganicPath(x: number, y: number, width: number, height: number): string {
    const points = [];
    const numPoints = 6 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const radiusVariation = 0.7 + Math.random() * 0.6;
      const px = x + (Math.cos(angle) * width * radiusVariation) / 2;
      const py = y + (Math.sin(angle) * height * radiusVariation) / 2;
      points.push({ x: px, y: py });
    }
    
    let path = `M${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const controlX = current.x + (next.x - current.x) * 0.3;
      const controlY = current.y + (next.y - current.y) * 0.3;
      
      path += ` Q${controlX},${controlY} ${current.x},${current.y}`;
    }
    
    path += ' Z';
    return path;
  }

  private getFallbackProcessing(): AIProcessingResult {
    console.log('Using fallback processing - AI service may be unavailable');
    return {
      processedImageUrl: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      regions: [
        { id: 1, colorNumber: 1, path: 'M80,80 Q130,60 180,80 Q200,130 180,180 Q130,200 80,180 Q60,130 80,80 Z', isPainted: false },
        { id: 2, colorNumber: 2, path: 'M220,90 Q270,70 320,90 Q340,140 320,190 Q270,210 220,190 Q200,140 220,90 Z', isPainted: false },
        { id: 3, colorNumber: 3, path: 'M380,100 Q430,80 480,100 Q500,150 480,200 Q430,220 380,200 Q360,150 380,100 Z', isPainted: false },
        { id: 4, colorNumber: 4, path: 'M100,240 Q150,220 200,240 Q220,290 200,340 Q150,360 100,340 Q80,290 100,240 Z', isPainted: false },
        { id: 5, colorNumber: 5, path: 'M260,250 Q310,230 360,250 Q380,300 360,350 Q310,370 260,350 Q240,300 260,250 Z', isPainted: false },
        { id: 6, colorNumber: 6, path: 'M420,260 Q470,240 520,260 Q540,310 520,360 Q470,380 420,360 Q400,310 420,260 Z', isPainted: false },
        { id: 7, colorNumber: 1, path: 'M60,400 Q110,380 160,400 Q180,450 160,500 Q110,520 60,500 Q40,450 60,400 Z', isPainted: false },
        { id: 8, colorNumber: 2, path: 'M200,410 Q250,390 300,410 Q320,460 300,510 Q250,530 200,510 Q180,460 200,410 Z', isPainted: false },
        { id: 9, colorNumber: 3, path: 'M340,420 Q390,400 440,420 Q460,470 440,520 Q390,540 340,520 Q320,470 340,420 Z', isPainted: false },
      ],
      colors: [
        { number: 1, hex: '#FF6B6B', name: 'Coral Red' },
        { number: 2, hex: '#4ECDC4', name: 'Turquoise' },
        { number: 3, hex: '#45B7D1', name: 'Sky Blue' },
        { number: 4, hex: '#96CEB4', name: 'Mint Green' },
        { number: 5, hex: '#FFEAA7', name: 'Warm Yellow' },
        { number: 6, hex: '#DDA0DD', name: 'Plum' },
      ],
      dimensions: { width: 800, height: 600 }
    };
  }

  /**
   * Check if the AI service is available
   */
  async checkServiceHealth(): Promise<boolean> {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.hfToken}`,
          }
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }
}