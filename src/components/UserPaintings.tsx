import { useState, useEffect, useCallback } from 'react';
import { Trash2, Play, Calendar, Palette } from 'lucide-react';
import { PaintingService, UserPainting } from '../services/paintingService';
import { useAuth } from '../hooks/useAuth';

interface UserPaintingsProps {
  onLoadPainting?: (painting: UserPainting) => void;
  onSelectPainting?: (painting: UserPainting) => void;
}

const UserPaintings = ({ onLoadPainting, onSelectPainting }: UserPaintingsProps) => {
  const [paintings, setPaintings] = useState<UserPainting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Load user's paintings
  const loadPaintings = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await PaintingService.getUserPaintings();
      
      if (error) {
        setError(error.message || 'Failed to load paintings');
      } else {
        setPaintings(data || []);
      }
    } catch (err) {
      setError('An error occurred while loading paintings');
      console.error('Error loading paintings:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  // Load paintings when component mounts or user changes
  useEffect(() => {
    loadPaintings();
  }, [loadPaintings]);
  
  // Handle selecting a painting
  const handleSelectPainting = useCallback((painting: UserPainting) => {
    if (onSelectPainting) {
      onSelectPainting(painting);
    } else if (onLoadPainting) {
      onLoadPainting(painting);
    }
  }, [onLoadPainting, onSelectPainting]);

  // Handle deleting a painting
  const handleDeletePainting = useCallback(async (paintingId: string) => {
    if (!confirm('Are you sure you want to delete this painting?')) return;

    try {
      const { error } = await PaintingService.deletePainting(paintingId);
      if (error) {
        alert('Failed to delete painting');
      } else {
        setPaintings(prevPaintings => prevPaintings.filter(p => p.id !== paintingId));
      }
    } catch (err) {
      console.error('Error deleting painting:', err);
      alert('Failed to delete painting');
    }
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get color for completion percentage
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Please sign in to view your paintings</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading your paintings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={loadPaintings}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (paintings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved paintings yet</h3>
        <p className="text-gray-500">Create your first paint-by-numbers masterpiece!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Paintings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintings.map((painting) => {
          const colors = painting.paintByNumbersData?.colors || painting.painting_data?.colors || [];
          const imageUrl = painting.thumbnail || painting.processed_image_url || painting.original_image_url;
          const completionPercentage = 'completion_percentage' in painting ? painting.completion_percentage : 0;
          
          return (
            <div
              key={painting.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg truncate">{painting.title}</h3>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPainting(painting);
                      }}
                      title="Open painting"
                    >
                      <Play size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePainting(painting.id);
                      }}
                      title="Delete painting"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(painting.updated_at || painting.created_at || new Date().toISOString())}
                  <Palette size={14} className="ml-3 mr-1" />
                  {colors.length} color{colors.length !== 1 ? 's' : ''}
                </div>

                <div 
                  className="aspect-square bg-gray-100 rounded overflow-hidden mb-3 cursor-pointer"
                  onClick={() => handleSelectPainting(painting)}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={painting.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No preview available
                    </div>
                  )}
                </div>

                {completionPercentage > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getCompletionColor(completionPercentage)}`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPaintings;