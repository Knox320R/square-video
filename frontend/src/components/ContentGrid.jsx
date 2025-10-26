import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../features/content/contentSlice';
import ContentTile from './ContentTile';

export default function ContentGrid() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent({ limit: 50, offset: 0 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((content) => (
        <ContentTile key={content.id} content={content} />
      ))}
    </div>
  );
}
