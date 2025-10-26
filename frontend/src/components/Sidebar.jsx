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

/**
 * Vertical sidebar component similar to Sora explore page
 * Fixed position on the left with logo and menu icons
 */
function Sidebar() {
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
    <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-black border-r border-gray-800 flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-xl">SP</span>
        </div>
      </Link>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 flex-1 w-full">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center justify-center py-3 px-2 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors group"
            title={item.label}
          >
            <item.icon className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-xs mt-1 hidden md:block">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
