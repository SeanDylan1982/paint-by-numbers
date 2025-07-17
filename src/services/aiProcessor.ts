/**
 * AI Processing Service
 * Handles communication with the Supabase Edge Function for AI image processing
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
  private baseUrl: string;

  private constructor() {
    // Use environment variables from Supabase integration
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured. Please check your environment variables.');
    }
    this.baseUrl = `${supabaseUrl}/functions/v1`;
  }

  public static getInstance(): AIProcessorService {
    if (!AIProcessorService.instance) {
      AIProcessorService.instance = new AIProcessorService();
    }
    return AIProcessorService.instance;
  }

  /**
   * Process an image to create paint-by-numbers format
   */
  async processImageToPaintByNumbers(imageDataUrl: string): Promise<AIProcessingResult> {
    try {
      // Convert data URL to blob for form data
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      // Create form data for upload
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      console.log('Sending image to Hugging Face Flux AI processor...');

      // Call the edge function with Flux processing
      const processingResponse = await fetch(`${this.baseUrl}/process-paint-by-numbers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData
      });

      if (!processingResponse.ok) {
        const errorData = await processingResponse.json().catch(() => ({}));
        throw new Error(errorData.error || `Flux AI processing failed with status ${processingResponse.status}`);
      }

      const result = await processingResponse.json();
      console.log('Flux AI processing completed successfully');
      console.log('Processed image URL:', result.processedImageUrl ? 'Received' : 'Missing');
      console.log('Number of regions:', result.regions?.length || 0);
      console.log('Number of colors:', result.colors?.length || 0);

      return result;

    } catch (error) {
      console.error('Flux AI processing error:', error);
      
      // Provide fallback processing for development/demo
      if (import.meta.env.DEV) {
        console.warn('Using fallback processing - Flux AI service may be unavailable');
        return this.getFallbackProcessing();
      }
      
      throw error;
    }
  }

  /**
   * Fallback processing for development/demo purposes
   */
  private getFallbackProcessing(): AIProcessingResult {
    console.log('Using fallback processing - Flux AI service may be unavailable');
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
      const response = await fetch(`${this.baseUrl}/process-paint-by-numbers`, {
        method: 'OPTIONS',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}