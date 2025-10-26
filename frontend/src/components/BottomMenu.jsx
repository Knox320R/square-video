import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BottomMenu() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/links')
      .then((res) => {
        const bottomLinks = res.data.data.filter((link) => link.position === 0);
        setLinks(bottomLinks);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-40 p-2">
      <div className="flex flex-wrap gap-2 justify-center text-xs">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url || '#'}
            target={link.url ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors px-2 py-1"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
}
