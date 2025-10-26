import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import ContentTile from '../components/ContentTile';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';
import SEO from '../components/SEO';

/**
 * Search page
 * Shows search results in same grid layout as index page
 */
export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/content/search?q=${encodeURIComponent(query)}`)
        .then((res) => {
          setResults(res.data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title={`Search: ${query}`} />
      <Sidebar />

      <div className="ml-16 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Explore
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>

          <div className="mb-8">
            <SearchBar />
          </div>

          {loading && <div className="text-xl text-gray-400">Searching...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}

          {!loading && results.length > 0 && (
            <>
              <p className="mb-6 text-gray-500">{results.length} results for "{query}"</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((content) => (
                  <ContentTile key={content.id} content={content} />
                ))}
              </div>
            </>
          )}

          {!loading && results.length === 0 && query && (
            <p className="text-gray-500">No results found for "{query}"</p>
          )}
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
