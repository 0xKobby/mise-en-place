// Banner to show when user is offline
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export default function OfflineBanner() {
  const { isOnline } = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white px-4 py-3 shadow-lg z-40">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.364 6.364l1.414-1.414a2 2 0 00-2.828 0l-1.414 1.414a1 1 0 101.414 1.414l.414-.414.414.414a1 1 0 101.414-1.414zM10 7a1 1 0 00-1 1v.5a1 1 0 002 0V8a1 1 0 00-1-1zm0 4a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">
            You're offline. Your cookbook is available, but search & browse need internet.
          </span>
        </div>
      </div>
    </div>
  );
}
