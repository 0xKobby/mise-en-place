// Error state component with retry option
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function ErrorMessage({ message, onRetry, isOfflineContext = false }) {
  const { isOnline } = useOnlineStatus();

  const offlineMessage = isOfflineContext
    ? 'This feature requires an internet connection'
    : 'Connection lost. Check your internet and try again.';

  const displayMessage = !isOnline
    ? offlineMessage
    : message || 'Unable to load data. Please try again.';

  return (
    <div className={`border rounded-lg p-6 text-center ${
      !isOnline ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'
    }`}>
      <svg
        className={`w-12 h-12 mx-auto mb-4 ${
          !isOnline ? 'text-orange-400' : 'text-red-400'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {!isOnline ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.5a5 5 0 017.778 0M12 20h.01m-7.08-7.071l3.537-3.536a1 1 0 011.414 0L12 9.172l3.146-3.147a1 1 0 011.414 0l3.537 3.536m-9.414 7.778l3.537 3.536a1 1 0 001.414-1.414L12 14.828l-3.146 3.147a1 1 0 01-1.414-1.414z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        )}
      </svg>
      <h3 className={`text-lg font-heading font-semibold mb-2 ${
        !isOnline ? 'text-orange-800' : 'text-red-800'
      }`}>
        {!isOnline ? 'You\'re Offline' : 'Something went wrong'}
      </h3>
      <p className={!isOnline ? 'text-orange-600 mb-4' : 'text-red-600 mb-4'}>
        {displayMessage}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`text-white px-6 py-2 rounded-lg transition-colors ${
            !isOnline
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Try Again
        </button>
      )}
    </div>
  );
}