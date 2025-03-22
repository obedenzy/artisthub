import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Analyzer } from './pages/Analyzer';
import { RecentArtworks } from './components/analyzed/RecentArtworks';
import { FeaturedArtworks } from './components/FeaturedArtworks';
import { ArtworkDetails } from './pages/ArtworkDetails';
import { AddArtwork } from './pages/AddArtwork';
import { MyArts } from './pages/MyArts';
import { MyHistory } from './pages/MyHistory';
import { GamesMenu } from './pages/games/GamesMenu';
import { CreateGame } from './pages/games/CreateGame';
import { GameDetails } from './pages/games/GameDetails';
import { ArtsList } from './pages/ArtsList';
import { AddChildArtwork } from './pages/AddChildArtwork';

function HomePage() {
  return (
    <>
      <RecentArtworks />
      <FeaturedArtworks />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<Analyzer />} />
            <Route path="/my-arts" element={<MyArts />} />
            <Route path="/my-history" element={<MyHistory />} />
            <Route path="/artwork/add" element={<AddArtwork />} />
            <Route path="/artwork/:id" element={<ArtworkDetails />} />
            <Route path="/games" element={<GamesMenu />} />
            <Route path="/games/create" element={<CreateGame />} />
            <Route path="/games/create/:type" element={<CreateGame />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/arts" element={<ArtsList />} />
            <Route path="/add-child-artwork" element={<AddChildArtwork />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
