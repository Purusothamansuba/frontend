import './App.css';
import { useEffect, useState } from "react";

import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { SearchBar } from './components/SearchBar';
import { SongCard } from './components/SongCard';

function App() {

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE + "/songs/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Songs:", data);
        setSongs(data); 
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);


  const handlePlay = (song) => {

    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="content">
        <SearchBar />

        {/* Songs List */}
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={() => handlePlay(song)}
            />
          ))
        ) : (
          <p style={{ color: "white" }}>Loading songs...</p>
        )}
      </div>

      {/* Player */}
      <div className="player">
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>

    </div>
  );
}

export default App;