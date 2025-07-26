// src/components/Header/Header.tsx
import { Palette } from "lucide-react";

interface HeaderProps {
  onStartCreating: () => void;
}

export default function Header({ onStartCreating }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between h-16 items-center">
          <a href="/" className="flex items-center">
            <Palette className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Paint by Numbers
            </span>
          </a>
          <button
            onClick={onStartCreating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
          >
            Start Creating
          </button>
        </nav>
      </div>
    </header>
  );
}
