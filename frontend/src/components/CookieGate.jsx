import { useDispatch, useSelector } from 'react-redux';
import { acceptCookies, declineCookies } from '../features/cookie/cookieSlice';

export default function CookieGate() {
  const dispatch = useDispatch();
  const { showModal, hasConsent } = useSelector((state) => state.cookie);

  if (!showModal) return null;

  return (
    <>
      {!hasConsent && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/30" />
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Cookie Consent</h2>
          <p className="text-gray-700 mb-6">
            This website uses cookies to enhance your browsing experience.
            Do you consent to the use of cookies?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(acceptCookies())}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Yes, I Accept
            </button>
            <button
              onClick={() => dispatch(declineCookies())}
              className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              No, Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
