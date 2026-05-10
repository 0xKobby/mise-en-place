// Top navigation bar with logo and primary nav links
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-olive text-parchment shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand - clickable home button */}
          <Link to="/" className="flex-shrink-0 p-1 md:p-2 bg-parchment rounded-lg hover:shadow-lg transition-shadow" title="Go to Home">
            <img src="/logo.svg" alt="Mise en Place" className="h-16 md:h-24 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-4 md:gap-6">
            <Link
              to="/browse"
              className={`font-medium transition-colors text-sm md:text-base ${
                isActive('/browse') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              Browse
            </Link>
            <Link
              to="/cookbook"
              className={`font-medium transition-colors text-sm md:text-base ${
                isActive('/cookbook') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              My Cookbook
            </Link>
            <Link
              to="/meal-planner"
              className={`font-medium transition-colors text-sm md:text-base ${
                isActive('/meal-planner') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              Meal Planner
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}