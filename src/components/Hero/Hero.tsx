// src/components/Hero/Hero.tsx
import { Palette } from "lucide-react";

interface HeroProps {
  onStartNow: () => void;
}

export default function Hero({ onStartNow }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Turn Your Photos into Paint by Numbers
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create custom paint by numbers from your favorite photos. Perfect for
          artists of all skill levels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartNow}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            <Palette className="mr-2 h-5 w-5" />
            Start Now
          </button>
          <a
            href="#how-it-works"
            className="inline-flex justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-gray-50"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
