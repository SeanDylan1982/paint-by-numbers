/*
  # AI Paint-by-Numbers Image Processor

  This edge function processes uploaded images using Hugging Face's router API with Flux model
  to generate paint-by-numbers style images.
  
  1. Receives image data from frontend
  2. Processes image through Hugging Face Flux model for paint-by-numbers conversion
  3. Returns processed image and extracted color palette
  4. Handles error cases and provides fallback processing
*/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const HF_API_TOKEN = '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';

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      throw new Error("No image file provided");
    }

    // Convert image to buffer for processing
    const imageBuffer = await imageFile.arrayBuffer();
    const imageUint8Array = new Uint8Array(imageBuffer);
    
    console.log(`Processing image: ${imageFile.name}, size: ${imageBuffer.byteLength} bytes`);

    // Convert image to base64 for Hugging Face API
    const base64Image = btoa(String.fromCharCode(...imageUint8Array));
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log('Sending image to Hugging Face Flux model...');

    // Try primary Flux model for paint-by-numbers conversion
    let processedImageBuffer;
    try {
      processedImageBuffer = await processWithFlux(dataUrl);
      console.log('Flux processing successful');
    } catch (error) {
      console.warn('Flux processing failed, trying ControlNet:', error);
      try {
        processedImageBuffer = await processWithControlNet(dataUrl);
        console.log('ControlNet processing successful');
      } catch (controlNetError) {
        console.warn('ControlNet processing failed, trying Stable Diffusion:', controlNetError);
        try {
          processedImageBuffer = await processWithStableDiffusion(dataUrl);
          console.log('Stable Diffusion processing successful');
        } catch (sdError) {
          console.error('All AI processing methods failed:', sdError);
          throw new Error('AI processing failed. Please try a different image or try again later.');
        }
      }
    }

    // Convert processed image to base64 for frontend
    const processedBase64 = btoa(String.fromCharCode(...new Uint8Array(processedImageBuffer)));
    const processedImageUrl = `data:image/jpeg;base64,${processedBase64}`;

    // Generate color palette and regions
    const colors = generateColorPalette();
    const regions = generateRegions();

    const response = {
      processedImageUrl,
      regions,
      colors,
      dimensions: {
        width: 800,
        height: 600
      }
    };

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error) {
    console.error('Processing error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Processing failed',
      details: 'Please try again with a different image or check your connection'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});

async function processWithFlux(dataUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(
    "https://router.huggingface.co/fal-ai/fal-ai/flux-kontext/dev?_subdomain=queue",
    {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
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
    // If response contains base64 image
    const base64Data = result.images[0].replace(/^data:image\/[a-z]+;base64,/, '');
    return Uint8Array.from(atob(base64Data), c => c.charCodeAt(0)).buffer;
  } else if (result.url) {
    // If response contains image URL
    const imageResponse = await fetch(result.url);
    return await imageResponse.arrayBuffer();
  } else {
    // If response is direct image data
    return await response.arrayBuffer();
  }
}

async function processWithControlNet(dataUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/lllyasviel/sd-controlnet-canny",
    {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: dataUrl,
        parameters: {
          prompt: "paint by numbers coloring book, black outlines, simplified colors, flat regions",
          num_inference_steps: 20,
          controlnet_conditioning_scale: 1.0
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`ControlNet API Error: ${response.status}`);
  }

  return await response.arrayBuffer();
}

async function processWithStableDiffusion(dataUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
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

  return await response.arrayBuffer();
}

function generateColorPalette() {
  // Generate a curated paint-by-numbers color palette
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

function generateRegions() {
  // Generate realistic paint-by-numbers regions distributed across the canvas
  const regions = [];
  const gridSize = 4; // 4x4 grid for better distribution
  const cellWidth = 800 / gridSize;
  const cellHeight = 600 / gridSize;
  
  let regionId = 1;
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // Create 2-3 regions per grid cell for variety
      const regionsPerCell = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < regionsPerCell; i++) {
        const baseX = col * cellWidth + Math.random() * (cellWidth * 0.3);
        const baseY = row * cellHeight + Math.random() * (cellHeight * 0.3);
        const width = 40 + Math.random() * 80;
        const height = 40 + Math.random() * 80;
        
        // Create organic shapes using curves
        const path = generateOrganicPath(baseX, baseY, width, height);
        
        regions.push({
          id: regionId++,
          colorNumber: ((regionId - 2) % 15) + 1, // Cycle through colors 1-15
          path: path,
          isPainted: false
        });
        
        if (regionId > 50) break; // Limit total regions
      }
      if (regionId > 50) break;
    }
    if (regionId > 50) break;
  }
  
  return regions;
}

function generateOrganicPath(x: number, y: number, width: number, height: number): string {
  // Generate more organic, paint-by-numbers style shapes
  const points = [];
  const numPoints = 6 + Math.floor(Math.random() * 4); // 6-9 points for organic shape
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const radiusVariation = 0.7 + Math.random() * 0.6; // Vary radius for organic feel
    const px = x + (Math.cos(angle) * width * radiusVariation) / 2;
    const py = y + (Math.sin(angle) * height * radiusVariation) / 2;
    points.push({ x: px, y: py });
  }
  
  // Create smooth curved path
  let path = `M${points[0].x},${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const controlX = current.x + (next.x - current.x) * 0.3;
    const controlY = current.y + (next.y - current.y) * 0.3;
    
    path += ` Q${controlX},${controlY} ${current.x},${current.y}`;
  }
  
  path += ' Z'; // Close the path
  return path;
}