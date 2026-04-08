import { Play, Pause, Heart } from "lucide-react";

export function SongCard({ song, isPlaying, isCurrentSong, onPlay, index }) {
  return (
    <div
      onClick={onPlay}
      className={`song-card${isCurrentSong ? " active" : ""}`}
    >
      {/* Track Number / Play indicator */}
      <div className="song-card-index">
        {isCurrentSong && isPlaying ? (
          <span className="play-indicator">
            <span className="play-bar" style={{ height: 8 }} />
            <span className="play-bar" style={{ height: 14 }} />
            <span className="play-bar" style={{ height: 6 }} />
          </span>
        ) : (
          <>
            <span className="song-card-index-num">{index + 1}</span>
            <button
              className="song-card-play-btn"
              onClick={(e) => { e.stopPropagation(); onPlay(); }}
              aria-label={isPlaying && isCurrentSong ? "Pause" : "Play"}
            >
              {isPlaying && isCurrentSong
                ? <Pause size={16} fill="currentColor" />
                : <Play  size={16} fill="currentColor" />}
            </button>
          </>
        )}
      </div>

      {/* Album Art */}
      <div className="song-card-art">
        {song.title.charAt(0)}
      </div>

      {/* Song Info */}
      <div className="song-card-info">
        <p className="song-card-name">{song.title}</p>
        <p className="song-card-artist">{song.artist}</p>
      </div>

      {/* Like Button */}
      <button
        className="song-card-like-btn"
        onClick={(e) => e.stopPropagation()}
        aria-label="Like song"
      >
        <Heart size={16} />
      </button>

      {/* Duration */}
      <span className="song-card-duration">
  {Math.floor(song.duration / 60)}:
  {song.duration % 60 < 10 ? "0" : ""}
  {song.duration % 60}
</span>
    </div>
  );
}
