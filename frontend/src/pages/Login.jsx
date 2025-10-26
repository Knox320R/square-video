import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { login } from '../features/auth/authSlice';
import Sidebar from '../components/Sidebar';
import BottomBar from '../components/BottomBar';

/**
 * Login page for member area
 * Stub authentication - accepts any credentials
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Stub auth - accept any credentials
    if (username && password) {
      dispatch(login({ username }));
      navigate('/member');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="ml-16 pb-16 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Explore
          </Link>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-white mb-6">Member Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 py-2.5 rounded-lg font-medium transition-colors mt-6"
              >
                Login
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Demo mode: Any credentials will work
              </p>
            </form>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
