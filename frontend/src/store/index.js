import { configureStore } from '@reduxjs/toolkit';
import cookieReducer from '../features/cookie/cookieSlice';
import contentReducer from '../features/content/contentSlice';
import seoReducer from '../features/seo/seoSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    cookie: cookieReducer,
    content: contentReducer,
    seo: seoReducer,
    auth: authReducer,
  },
});
