import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeftMenu() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/links')
      .then((res) => {
        const leftLinks = res.data.data.filter((link) => link.position > 0);
        setLinks(leftLinks.slice(0, 10));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-900/95 backdrop-blur-sm z-40 hidden md:flex flex-col items-center py-4 space-y-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white text-xs text-center p-1 transition-colors"
          title={link.text}
        >
          {link.text.substring(0, 2).toUpperCase()}
        </a>
      ))}
    </div>
  );
}
