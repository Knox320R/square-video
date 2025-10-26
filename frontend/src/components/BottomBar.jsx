import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinks } from '../features/content/contentSlice';

/**
 * Bottom horizontal menu bar
 * Shows links loaded from database
 */
function BottomBar() {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.content);
  const [menuLinks, setMenuLinks] = useState([]);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  useEffect(() => {
    if (links && links.length > 0) {
      setMenuLinks(links);
    } else {
      // Placeholder links until DB is ready
      setMenuLinks([
        { label: 'Home', url: '/', external: false },
        { label: 'About', url: '/about', external: false },
        { label: 'Contact', url: '/contact', external: false },
        { label: 'Terms', url: '/terms', external: false },
        { label: 'Privacy', url: '/privacy', external: false },
      ]);
    }
  }, [links]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-gray-800 flex items-center justify-center gap-6 px-4 z-40 ml-16">
      {menuLinks.map((link, index) => (
        link.external ? (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={index}
            to={link.url}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {link.label}
          </Link>
        )
      ))}
    </footer>
  );
}

export default BottomBar;
