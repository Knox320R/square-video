import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  FilmIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: MagnifyingGlassIcon, label: 'Search', path: '/search' },
    { icon: FilmIcon, label: 'Videos', path: '/' },
    { icon: StarIcon, label: 'Featured', path: '/' },
    { icon: ClockIcon, label: 'Recent', path: '/' },
    { icon: HeartIcon, label: 'Favorites', path: '/' },
    { icon: UserIcon, label: 'Profile', path: '/member' },
    { icon: Cog6ToothIcon, label: 'Settings', path: '/' },
    { icon: QuestionMarkCircleIcon, label: 'Help', path: '/' },
    { icon: InformationCircleIcon, label: 'About', path: '/' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-black border-r border-gray-800 flex flex-col py-6 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between px-4 mb-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-sm">SP</span>
          </div>
          {isExpanded && (
            <span className="text-white font-semibold text-lg whitespace-nowrap">SquarePixel</span>
          )}
        </Link>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {isExpanded && (
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
