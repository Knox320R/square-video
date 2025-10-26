import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchContentById, clearCurrentItem } from '../features/content/contentSlice';
import SEO from '../components/SEO';
import VideoPlayer from '../components/VideoPlayer';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';

/**
 * Watch page - Video viewing page
 * Layout:
 * - Fixed left sidebar (same as index)
 * - Video player with proper aspect ratio (16:9, 9:16, 4:3, 3:4, 3:2, 2:3, 1:1)
 * - Video details below player
 * - Prev/Next navigation (keyboard arrows supported)
 * - Fixed bottom menu bar
 * - Black and white color scheme
 */
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Sidebar />
        <div className="text-white text-xl ml-16">Loading...</div>
      </div>
    );
  }

  if (error || !currentItem?.data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Sidebar />
        <div className="text-red-500 text-xl ml-16">Error: {error || 'Content not found'}</div>
      </div>
    );
  }

  const content = currentItem.data;
  const { prev, next } = currentItem.adjacent || {};

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title={content.title} description={content.description} />
      <Sidebar />

      {/* Main content with left margin for sidebar */}
      <div className="ml-16 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Explore
          </Link>

          {/* Video player */}
          <VideoPlayer content={content} />

          {/* Video details */}
          <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{content.title}</h1>
            <p className="text-gray-400 mb-6 leading-relaxed">{content.description}</p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              <div className="text-gray-500">
                <span className="text-gray-600">Type:</span> <span className="text-white">{content.type}</span>
              </div>
              <div className="text-gray-500">
                <span className="text-gray-600">Ratio:</span> <span className="text-white">{content.ratio}</span>
              </div>
              <div className="text-gray-500">
                <span className="text-gray-600">Date:</span> <span className="text-white">{new Date(content.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prev && (
                <Link
                  to={`/watch/${prev.id}`}
                  className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 p-4 rounded-lg border border-gray-800 transition-all group"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Previous</div>
                    <div className="font-medium text-white">{prev.title}</div>
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  to={`/watch/${next.id}`}
                  className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 p-4 rounded-lg border border-gray-800 transition-all group"
                >
                  <div className="flex-1 text-right">
                    <div className="text-xs text-gray-500 mb-1">Next</div>
                    <div className="font-medium text-white">{next.title}</div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
