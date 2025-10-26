import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Health() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/health');
        setBackendStatus(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Health Check</h1>

        <div className="space-y-4">
          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h2 className="font-semibold text-green-900">Frontend Status</h2>
            <p className="text-green-700">OK - React App Running</p>
          </div>

          <div className={`border-l-4 ${backendStatus ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'} p-4`}>
            <h2 className={`font-semibold ${backendStatus ? 'text-green-900' : 'text-red-900'}`}>
              Backend API Status
            </h2>
            {backendStatus ? (
              <div className="text-green-700">
                <p>Status: {backendStatus.status}</p>
                <p>Service: {backendStatus.service}</p>
                <p>Timestamp: {backendStatus.timestamp}</p>
              </div>
            ) : error ? (
              <p className="text-red-700">Error: {error}</p>
            ) : (
              <p className="text-gray-600">Checking...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
