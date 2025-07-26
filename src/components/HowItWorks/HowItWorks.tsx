// src/components/HowItWorks/HowItWorks.tsx
import { Upload as UploadIcon, Sliders, Paintbrush, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <UploadIcon className="h-8 w-8" />,
    title: "Upload Your Photo",
    description: "Choose a photo from your device or take a new one."
  },
  {
    icon: <Sliders className="h-8 w-8" />,
    title: "Customize Settings",
    description: "Adjust the number of colors and complexity."
  },
  {
    icon: <Paintbrush className="h-8 w-8" />,
    title: "Paint by Numbers",
    description: "Follow the numbers and colors to paint your masterpiece."
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Save & Share",
    description: "Save your completed artwork and share it with friends."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Create your custom paint by numbers in just a few simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 text-purple-600 mb-4 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}