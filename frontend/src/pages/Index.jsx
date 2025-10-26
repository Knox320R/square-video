import ContentGrid from '../components/ContentGrid';
import LeftMenu from '../components/LeftMenu';
import BottomMenu from '../components/BottomMenu';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SEO />
      <LeftMenu />

      <div className="md:ml-16 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold">SquarePixel</h1>
            <SearchBar />
          </div>
          <ContentGrid />
        </div>
      </div>

      <BottomMenu />
    </div>
  );
}
