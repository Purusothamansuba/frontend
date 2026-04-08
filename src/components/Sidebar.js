import {
  Home,
  Music2,
  Heart,
  Clock,
  Library,
  Search,
} from "lucide-react";

import logoIcon from "../asserts/favicon.svg";

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "library", label: "Your Library", icon: Library },
];

const libraryItems = [
  { id: "liked", label: "Liked Songs", icon: Heart },
  { id: "recent", label: "Recently Played", icon: Clock },
  { id: "albums", label: "Albums", icon: Music2 },
];

export function Sidebar({ activeTab, onTabChange }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex w-64 flex-col h-full border-r border-gray-800 bg-black">
        
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <img src={logoIcon} alt="Songify" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-red-500">
            Songify
          </h1>
        </div>

        {/* Main Navigation */}
        <nav className="px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Library Section */}
        <div className="mt-8 px-3 flex-1">
          <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Your Library
          </h2>

          <ul className="space-y-1">
            {libraryItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Playlist Box */}
        <div className="p-4 m-3 rounded-lg bg-gray-800 border border-gray-700">
          <p className="text-sm font-semibold mb-1 text-white">
            Create your first playlist
          </p>
          <p className="text-xs text-gray-400 mb-3">
            It's easy, we'll help you
          </p>
          <button className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-full hover:scale-105 transition">
            Create playlist
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-gray-800">
        <ul className="flex items-center justify-between h-14 px-2">
          {menuItems.map((item) => (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex flex-col items-center justify-center ${
                  activeTab === item.id
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] truncate">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}