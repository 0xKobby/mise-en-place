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
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-heading font-bold hover:text-saffron transition-colors">
            Mise en Place
          </Link>
          
          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`font-medium transition-colors ${
                isActive('/browse') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              Browse
            </Link>
            <Link
              to="/cookbook"
              className={`font-medium transition-colors ${
                isActive('/cookbook') ? 'text-saffron' : 'hover:text-saffron'
              }`}
            >
              My Cookbook
            </Link>
            <Link
              to="/meal-planner"
              className={`font-medium transition-colors ${
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