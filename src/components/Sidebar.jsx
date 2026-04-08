import { Home, Music2, Heart, Clock, Library, Search } from "lucide-react";

const menuItems = [
  { id: "home",    label: "Home",         icon: Home },
  { id: "search",  label: "Search",       icon: Search },
  { id: "library", label: "Your Library", icon: Library },
];

const libraryItems = [
  { id: "liked",  label: "Liked Songs",      icon: Heart },
  { id: "recent", label: "Recently Played",  icon: Clock },
  { id: "albums", label: "Albums",           icon: Music2 },
];

export function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">S</div>
        <h1>Songify</h1>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`sidebar-nav-btn${activeTab === item.id ? " active" : ""}`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Library Section */}
      <div className="sidebar-library">
        <p className="sidebar-library-title">Your Library</p>
        <ul>
          {libraryItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`sidebar-nav-btn${activeTab === item.id ? " active" : ""}`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Playlist Hint */}
      <div className="sidebar-playlist-hint">
        <p>Create your first playlist</p>
        <p>It's easy, we'll help you</p>
        <button className="btn-create-playlist">Create playlist</button>
      </div>
    </aside>
  );
}
