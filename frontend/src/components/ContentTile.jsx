import { Link } from 'react-router-dom';

export default function ContentTile({ content }) {
  const getMediaUrl = (filenameRoot, type) => {
    const ext = type === 'video' ? 'mp4' : 'jpg';
    return `/media/${filenameRoot}.${ext}`;
  };

  return (
    <Link
      to={`/watch/${content.id}`}
      className="group relative aspect-[4/3] overflow-hidden bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
    >
      <img
        src={getMediaUrl(content.filenameRoot, content.type)}
        alt={content.imgAltTxt || content.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3C/svg%3E';
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-1 line-clamp-2">{content.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{content.description}</p>
        </div>
      </div>
    </Link>
  );
}
