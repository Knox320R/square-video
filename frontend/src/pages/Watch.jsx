import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentById, clearCurrentItem } from '../features/content/contentSlice';
import SEO from '../components/SEO';
import VideoPlayer from '../components/VideoPlayer';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItem, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContentById(id));
    return () => dispatch(clearCurrentItem());
  }, [id, dispatch]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentItem?.adjacent?.prev) {
        navigate(`/watch/${currentItem.adjacent.prev.id}`);
      } else if (e.key === 'ArrowRight' && currentItem?.adjacent?.next) {
        navigate(`/watch/${currentItem.adjacent.next.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentItem, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !currentItem?.data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error || 'Content not found'}</div>
      </div>
    );
  }

  const content = currentItem.data;
  const { prev, next } = currentItem.adjacent || {};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SEO title={content.title} description={content.description} />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-block mb-4 text-blue-400 hover:text-blue-300">
          ← Back to Gallery
        </Link>

        <VideoPlayer content={content} />

        <div className="max-w-4xl mx-auto mt-6">
          <h1 className="text-3xl font-bold mb-2">{content.title}</h1>
          <p className="text-gray-300 mb-4">{content.description}</p>

          <div className="flex gap-4 mb-8">
            <div className="text-sm text-gray-400">
              <span className="font-semibold">Type:</span> {content.type}
            </div>
            <div className="text-sm text-gray-400">
              <span className="font-semibold">Ratio:</span> {content.ratio}
            </div>
            <div className="text-sm text-gray-400">
              <span className="font-semibold">Date:</span> {new Date(content.uploadDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-4">
            {prev && (
              <Link
                to={`/watch/${prev.id}`}
                className="flex-1 bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors"
              >
                <div className="text-sm text-gray-400 mb-1">← Previous</div>
                <div className="font-semibold">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link
                to={`/watch/${next.id}`}
                className="flex-1 bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors text-right"
              >
                <div className="text-sm text-gray-400 mb-1">Next →</div>
                <div className="font-semibold">{next.title}</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
