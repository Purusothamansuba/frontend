import { Play, Pause, Heart } from "lucide-react";

export function SongCard({
  song,
  isPlaying,
  isCurrentSong,
  onPlay,
  index,
}) {
  return (
    <div
      onClick={onPlay}
      className={`
        group flex items-center gap-3 sm:gap-4
        px-3 py-2 sm:p-3
        rounded-lg cursor-pointer
        transition-all duration-200
        ${
          isCurrentSong
            ? "bg-gray-800 border border-gray-700"
            : "hover:bg-gray-800"
        }
      `}
      style={{ animationDelay: `${index * 25}ms` }}
    >
      
      {/* ▶️ Play / Pause */}
      <div className="w-6 sm:w-8 flex justify-center">
        <button className="text-gray-400 group-hover:text-white transition">
          {isCurrentSong && isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 🎵 Album */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center bg-gray-700">
        <span className="text-sm sm:text-lg font-bold text-white">
          {song.title?.charAt(0)}
        </span>
      </div>

      {/* 🎶 Info */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <p
          className={`font-medium whitespace-nowrap ${
            isCurrentSong ? "text-green-400" : "text-white"
          }`}
        >
          {song.title}
        </p>

        <p className="text-xs sm:text-sm text-gray-400 truncate">
          {song.artist}
        </p>
      </div>

      {/* ❤️ Like */}
      <button
        onClick={(e) => e.stopPropagation()}
        className="hidden sm:block opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition"
      >
        <Heart className="w-4 h-4" />
      </button>
    </div>
  );
}