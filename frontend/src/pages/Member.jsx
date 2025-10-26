import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ContentGrid from '../components/ContentGrid';
import LeftMenu from '../components/LeftMenu';
import BottomMenu from '../components/BottomMenu';
import SEO from '../components/SEO';

export default function Member() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SEO title="Member Area - SquarePixel" />
      <LeftMenu />

      <div className="md:ml-16 pb-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Member Area</h1>
          <ContentGrid />
        </div>
      </div>

      <BottomMenu />
    </div>
  );
}
