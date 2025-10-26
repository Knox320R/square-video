import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ContentGrid from '../components/ContentGrid';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

export default function Member() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title="Member Area" />
      <Sidebar />

      <div className="ml-16 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Member Area</h1>
            <SearchBar />
          </div>
          <ContentGrid />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
