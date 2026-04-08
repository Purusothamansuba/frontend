import { useState, useEffect, useRef } from "react";
import {
  Play, Pause,
  SkipBack, SkipForward,
  Volume2, VolumeX,
  Repeat, Shuffle,
  Heart,
} from "lucide-react";

export function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume]     = useState(70);
  const [isMuted, setIsMuted]   = useState(false);
  const [isLiked, setIsLiked]   = useState(false);
  const audioRef                = useRef(null);

  // Play / pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Load new song when it changes
  useEffect(() => {
    if (!audioRef.current || !currentSong?.file_url) return;
    audioRef.current.src = currentSong.file_url;
    audioRef.current.load();
    setProgress(0);
    setIsLiked(false);
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentSong?.id]);

  // Sync volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  // Update progress from real audio time
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  // Seek when user drags the bar
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const val = Number(e.target.value);
    setProgress(val);
    if (audio && audio.duration) {
      audio.currentTime = (val / 100) * audio.duration;
    }
  };

  // duration is seconds (number) from API
  const formatTime = (percent, durationSeconds) => {
    if (!durationSeconds) return "0:00";
    const totalSeconds = Math.floor((percent / 100) * durationSeconds);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const formatDuration = (durationSeconds) => {
    if (!durationSeconds) return "0:00";
    const m = Math.floor(durationSeconds / 60);
    const s = durationSeconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />

      <div className="player-inner">

        {/* Left: current song info */}
        <div className="player-song-info">
          {currentSong ? (
            <>
              <div className="player-art">
                {currentSong.title.charAt(0)}
              </div>
              <div className="player-meta">
                <p className="player-song-name">{currentSong.title}</p>
                <p className="player-artist">{currentSong.artist}</p>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`player-like-btn${isLiked ? " liked" : ""}`}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              </button>
            </>
          ) : (
            <p className="player-empty">Select a song to play</p>
          )}
        </div>

        {/* Center: controls + progress */}
        <div className="player-controls">
          <div className="player-buttons">
            <button className="player-ctrl-btn" aria-label="Shuffle">
              <Shuffle size={16} />
            </button>
            <button className="player-ctrl-btn" onClick={onPrevious} aria-label="Previous">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button
              className="player-play-btn"
              onClick={onPlayPause}
              disabled={!currentSong}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying
                ? <Pause size={20} fill="currentColor" />
                : <Play  size={20} fill="currentColor" style={{ marginLeft: 2 }} />}
            </button>
            <button className="player-ctrl-btn" onClick={onNext} aria-label="Next">
              <SkipForward size={20} fill="currentColor" />
            </button>
            <button className="player-ctrl-btn" aria-label="Repeat">
              <Repeat size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="player-progress">
            <span className="player-time">
              {formatTime(progress, currentSong?.duration)}
            </span>
            <input
              type="range"
              className="player-seek"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
            />
            <span className="player-time end">
              {formatDuration(currentSong?.duration)}
            </span>
          </div>
        </div>

        {/* Right: volume */}
        <div className="player-volume">
          <button
            className="player-vol-btn"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0
              ? <VolumeX size={20} />
              : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            className="player-vol-slider"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
          />
        </div>

      </div>
    </div>
  );
}