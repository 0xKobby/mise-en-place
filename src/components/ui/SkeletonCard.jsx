// Loading placeholder component with animated gradient
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      {/* Content placeholder */}
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  )
}