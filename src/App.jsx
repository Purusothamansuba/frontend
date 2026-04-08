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
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

 /* useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE + "/songs/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Songs:", data);
        setSongs(data);
      })
      .catch((err) => console.error("Error fetching songs:", err));
  }, []); */

  useEffect(() => {
  setSongs([
    {
      id: 1,
      title: "Demo Song",
      artist: "Test Artist",
      duration: 180,
      file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Another Track",
      artist: "Sample Artist",
      duration: 210,
      file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Chill Beat",
      artist: "LoFi Artist",
      duration: 240,
      file_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
  ]);
}, []);

  const handlePlay = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    const next = songs[(idx + 1) % songs.length];
    setCurrentSong(next);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;
    const idx = songs.findIndex((s) => s.id === currentSong.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setIsPlaying(true);
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-layout">
      <div className="sidebar-area">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="content-area">
        <div className="content-header">
          <h2 className="section-title">
            {activeTab === "home" && "Good evening"}
            {activeTab === "search" && "Search"}
            {activeTab === "library" && "Your Library"}
            {activeTab === "liked" && "Liked Songs"}
            {activeTab === "recent" && "Recently Played"}
            {activeTab === "albums" && "Albums"}
          </h2>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="songs-list">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <SongCard
                key={song.id}
                song={song}
                index={index}
                isCurrentSong={currentSong?.id === song.id}
                isPlaying={isPlaying && currentSong?.id === song.id}
                onPlay={() => handlePlay(song)}
              />
            ))
          ) : (
            <p className="empty-state">
              {songs.length === 0 ? "Loading songs..." : "No songs found"}
            </p>
          )}
        </div>
      </div>

      <div className="player-area">
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
}

export default App;
