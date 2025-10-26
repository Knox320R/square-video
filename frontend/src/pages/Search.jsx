import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ContentTile from '../components/ContentTile';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <SEO title={`Search: ${query} - SquarePixel`} />

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-block mb-4 text-blue-400 hover:text-blue-300">
          ← Back to Gallery
        </Link>

        <h1 className="text-4xl font-bold mb-8">Search Results</h1>

        <div className="mb-8">
          <SearchBar />
        </div>

        {loading && <div className="text-xl">Searching...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}

        {!loading && results.length > 0 && (
          <>
            <p className="mb-4 text-gray-400">{results.length} results for "{query}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((content) => (
                <ContentTile key={content.id} content={content} />
              ))}
            </div>
          </>
        )}

        {!loading && results.length === 0 && query && (
          <p className="text-gray-400">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
