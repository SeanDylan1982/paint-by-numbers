// src/components/Features/Features.tsx
import { Upload, Sliders, Download } from 'lucide-react';

const features = [
  {
    icon: <Upload className="h-12 w-12" />,
    title: "Easy Upload",
    description: "Simply upload your favorite photo and let our tool do the rest."
  },
  {
    icon: <Sliders className="h-12 w-12" />,
    title: "Customizable",
    description: "Adjust the number of colors and complexity to match your skill level."
  },
  {
    icon: <Download className="h-12 w-12" />,
    title: "Print & Paint",
    description: "Download and print your custom paint by numbers template."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Create Beautiful Artwork
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Transform your photos into custom paint by numbers masterpieces.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto h-24 w-24 text-purple-600 mb-6 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}