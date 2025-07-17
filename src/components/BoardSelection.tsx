import React, { useState } from 'react';
import { Search, Filter, Clock, Palette } from 'lucide-react';
import { boardCategories, Board } from '../data/boards';

interface BoardSelectionProps {
  onBoardSelect: (imageUrl: string) => void;
}

const BoardSelection: React.FC<BoardSelectionProps> = ({ onBoardSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const getFilteredBoards = (): Board[] => {
    let boards = selectedCategory === 'all' 
      ? boardCategories.flatMap(cat => cat.boards)
      : boardCategories.find(cat => cat.id === selectedCategory)?.boards || [];

    if (searchTerm) {
      boards = boards.filter(board => 
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (difficultyFilter !== 'all') {
      boards = boards.filter(board => board.difficulty === difficultyFilter);
    }

    return boards;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredBoards = getFilteredBoards();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Your Paint by Numbers Board
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select from our curated collection of boards across multiple categories. 
          Each board is optimized for AI processing to create the perfect paint-by-numbers experience.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search boards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {boardCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {boardCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center text-gray-600">
        Showing {filteredBoards.length} board{filteredBoards.length !== 1 ? 's' : ''}
        {selectedCategory !== 'all' && (
          <span> in {boardCategories.find(cat => cat.id === selectedCategory)?.name}</span>
        )}
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBoards.map((board) => (
          <div
            key={board.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => onBoardSelect(board.imageUrl)}
          >
            <div className="relative overflow-hidden">
              <img
                src={board.imageUrl}
                alt={board.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white font-medium">Select This Board</div>
              </div>
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(board.difficulty)}`}>
                {board.difficulty}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                {board.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {board.estimatedTime}
                </div>
                <div className="flex items-center">
                  <Palette className="w-4 h-4 mr-1" />
                  {board.colors} colors
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBoards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No boards found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default BoardSelection;