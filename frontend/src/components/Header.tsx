import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Upload, GamepadIcon, Trophy, Menu, X, History, Image, Plus, List, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
            <Palette className="w-7 h-7 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl font-bold">Art Analyzer</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/upload" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Upload Art</span>
            </Link>
            <Link to="/my-arts" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <Image className="w-5 h-5" />
              <span>My Arts</span>
            </Link>
            <Link to="/my-history" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <History className="w-5 h-5" />
              <span>My History</span>
            </Link>
            <Link to="/arts" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <List className="w-5 h-5" />
              <span>Arts List</span>
            </Link>
            <Link to="/games" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <GamepadIcon className="w-5 h-5" />
              <span>Games</span>
            </Link>
            <Link to="/leaderboard" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
            <Link to="/add-child-artwork" className="flex items-center space-x-2 hover:text-purple-200 transition-colors">
              <User className="w-5 h-5" />
              <span>Add Child Artwork</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/signin" className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors">
              Sign In
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-600 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/upload"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Upload className="w-5 h-5" />
              <span>Upload Art</span>
            </Link>
            <Link
              to="/my-arts"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image className="w-5 h-5" />
              <span>My Arts</span>
            </Link>
            <Link
              to="/my-history"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <History className="w-5 h-5" />
              <span>My History</span>
            </Link>
            <Link
              to="/arts"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <List className="w-5 h-5" />
              <span>Arts List</span>
            </Link>
            <Link
              to="/games"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <GamepadIcon className="w-5 h-5" />
              <span>Games</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Trophy className="w-5 h-5" />
              <span>Leaderboard</span>
            </Link>
             <Link
              to="/add-child-artwork"
              className="flex items-center space-x-2 hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Add Child Artwork</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
