import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeaders } from '../features/seo/seoSlice';

export default function SEO({ title, description, keywords }) {
  const dispatch = useDispatch();
  const headers = useSelector((state) => state.seo.headers);

  useEffect(() => {
    if (!headers.title) {
      dispatch(fetchHeaders());
    }
  }, [dispatch, headers]);

  useEffect(() => {
    document.title = title || headers.title || 'SquarePixel';

    const updateMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content || '';
    };

    updateMeta('description', description || headers.description);
    updateMeta('keywords', keywords || headers.keywords);
  }, [title, description, keywords, headers]);

  return null;
}
