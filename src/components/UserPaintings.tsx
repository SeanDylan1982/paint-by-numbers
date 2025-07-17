import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Play, Calendar, Palette, Clock } from 'lucide-react';
import { PaintingService, UserPainting } from '../services/paintingService';
import { useAuth } from '../hooks/useAuth';

interface UserPaintingsProps {
  onLoadPainting: (painting: UserPainting) => void;
}

const UserPaintings: React.FC<UserPaintingsProps> = ({ onLoadPainting }) => {
  const [paintings, setPaintings] = useState<UserPainting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadPaintings();
    }
  }, [user]);

  const loadPaintings = async () => {
    try {
      setLoading(true);
      const { data, error } = await PaintingService.getUserPaintings();
      if (error) {
        setError(error.message);
      } else {
        setPaintings(data || []);
      }
    } catch (err) {
      setError('Failed to load paintings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePainting = async (paintingId: string) => {
    if (!confirm('Are you sure you want to delete this painting?')) return;

    try {
      const { error } = await PaintingService.deletePainting(paintingId);
      if (error) {
        alert('Failed to delete painting');
      } else {
        setPaintings(paintings.filter(p => p.id !== paintingId));
      }
    } catch (err) {
      alert('Failed to delete painting');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-3 text-gray-600">Loading your paintings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Paintings</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadPaintings}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (paintings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved paintings yet</h3>
        <p className="text-gray-500">Start creating your first paint-by-numbers masterpiece!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Paintings</h2>
        <div className="text-sm text-gray-500">
          {paintings.length} painting{paintings.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintings.map((painting) => (
          <div
            key={painting.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={painting.processed_image_url || painting.original_image_url}
                alt={painting.title}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getCompletionColor(painting.completion_percentage)}`}>
                {painting.completion_percentage}% Complete
              </div>
              {painting.is_completed && (
                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Completed
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 truncate">
                {painting.title}
              </h3>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(painting.updated_at)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Palette className="w-4 h-4 mr-2" />
                  {painting.painting_data.colors?.length || 0} colors
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{painting.completion_percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${painting.completion_percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => onLoadPainting(painting)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Continue</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeletePainting(painting.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete painting"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPaintings;