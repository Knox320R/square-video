import { useDispatch, useSelector } from 'react-redux';
import { acceptCookies, declineCookies } from '../features/cookie/cookieSlice';

export default function CookieGate() {
  const dispatch = useDispatch();
  const { showModal, hasConsent } = useSelector((state) => state.cookie);

  if (!showModal) return null;

  return (
    <>
      {!hasConsent && (
        <div className="fixed inset-0 z-[100] backdrop-blur-sm bg-black/50" />
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-w-md w-full p-8 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">Cookie Consent</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This website uses cookies to enhance your browsing experience.
            Do you consent to the use of cookies?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(acceptCookies())}
              className="flex-1 bg-white text-black px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Yes, I Accept
            </button>
            <button
              onClick={() => dispatch(declineCookies())}
              className="flex-1 bg-gray-800 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
            >
              No, Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
