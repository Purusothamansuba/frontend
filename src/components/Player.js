import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, SkipBack, SkipForward,
  Repeat, Shuffle, Heart, Volume2, VolumeX,
} from "lucide-react";
import "./Player.css";

export function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) {
  const audioRef    = useRef(null);
  const seekRef     = useRef(null);
  const volRef      = useRef(null);
  const [progress,    setProgress]    = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [isLiked,     setIsLiked]     = useState(false);
  const [isShuffle,   setIsShuffle]   = useState(false);
  const [isRepeat,    setIsRepeat]    = useState(false);
  const [volume,      setVolume]      = useState(70);
  const [isMuted,     setIsMuted]     = useState(false);

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* sync CSS fill vars */
  useEffect(() => {
    if (seekRef.current) seekRef.current.style.setProperty("--pct", `${progress}%`);
  }, [progress]);

  useEffect(() => {
    const v = isMuted ? 0 : volume;
    if (volRef.current) volRef.current.style.setProperty("--pct", `${v}%`);
  }, [volume, isMuted]);

  /* play / pause */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
  }, [isPlaying, currentSong]);

  /* volume */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  /* progress + ended */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onMeta  = () => setDuration(audio.duration);
    const onEnded = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play(); }
      else onNext();
    };
    audio.addEventListener("timeupdate",      onTime);
    audio.addEventListener("loadedmetadata",  onMeta);
    audio.addEventListener("ended",           onEnded);
    return () => {
      audio.removeEventListener("timeupdate",     onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended",          onEnded);
    };
  }, [onNext, isRepeat]);

  return (
    <div className="player-root">
      <div className="player-bar">
        <div className="player-inner">

          {/* ── Song Info ── */}
          <div className="player-song-info">
            {currentSong ? (
              <>
                <div className="player-avatar">
                  {currentSong.title?.charAt(0)}
                </div>
                <div className="player-meta">
                  <p className="player-title">{currentSong.title}</p>
                  <p className="player-artist">{currentSong.artist || "Unknown"}</p>
                </div>
                <button
                  className={`player-like-btn ${isLiked ? "liked" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart size={16} />
                </button>
              </>
            ) : (
              <p className="player-artist">No song selected</p>
            )}
          </div>

          {/* ── Controls ── */}
          <div className="player-controls">
            <div className="player-buttons">
              <button
                className={`player-btn ${isShuffle ? "active" : ""}`}
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle size={16} />
              </button>

              <button className="player-btn" onClick={onPrevious}>
                <SkipBack size={20} />
              </button>

              <button className="player-play-btn" onClick={onPlayPause}>
                {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
              </button>

              <button className="player-btn" onClick={onNext}>
                <SkipForward size={20} />
              </button>

              <button
                className={`player-btn ${isRepeat ? "active" : ""}`}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <Repeat size={16} />
              </button>
            </div>

            {/* Progress */}
            <div className="player-progress-row">
              <span className="player-time">{formatTime(currentTime)}</span>
              <input
                ref={seekRef}
                type="range"
                min="0" max="100"
                value={progress}
                className="player-seek"
                onChange={(e) => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.currentTime = (Number(e.target.value) / 100) * audio.duration;
                }}
              />
              <span className="player-time">{formatTime(duration)}</span>
            </div>
          </div>

          {/* ── Volume ── */}
          <div className="player-volume">
            <button className="player-volume-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              ref={volRef}
              type="range"
              min="0" max="100"
              value={isMuted ? 0 : volume}
              className="player-volume-slider"
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
            />
          </div>

        </div>
      </div>

      <audio ref={audioRef} src={currentSong?.file_url} preload="metadata" />
    </div>
  );
}