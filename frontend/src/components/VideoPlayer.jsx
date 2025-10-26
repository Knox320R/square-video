import { useMemo } from 'react';

export default function VideoPlayer({ content }) {
  const getAspectClass = (ratio) => {
    const map = {
      '16:9': 'aspect-video',
      '9:16': 'aspect-[9/16]',
      '4:3': 'aspect-[4/3]',
      '3:4': 'aspect-[3/4]',
      '3:2': 'aspect-[3/2]',
      '2:3': 'aspect-[2/3]',
      '1:1': 'aspect-square',
    };
    return map[ratio] || 'aspect-video';
  };

  const mediaUrl = useMemo(() => {
    const ext = content.type === 'video' ? 'mp4' : 'jpg';
    return `/media/${content.filenameRoot}.${ext}`;
  }, [content]);

  const aspectClass = getAspectClass(content.ratio);

  return (
    <div className={`w-full max-w-4xl mx-auto bg-black ${aspectClass}`}>
      {content.type === 'video' ? (
        <video
          controls
          autoPlay
          className="w-full h-full"
          poster={`/media/${content.filenameRoot}.jpg`}
          onError={(e) => console.error('Video error:', e)}
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <img
          src={mediaUrl}
          alt={content.imgAltTxt || content.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23111" width="800" height="600"/%3E%3C/svg%3E';
          }}
        />
      )}
    </div>
  );
}
