// Error state component with retry option
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <svg 
        className="w-12 h-12 text-red-400 mx-auto mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 className="text-lg font-heading font-semibold text-red-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-red-600 mb-4">
        {message || 'Unable to load data. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}