// Top navigation bar with logo and primary nav links
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path

  const navButtonClasses = (active) =>
    `group inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm md:text-base font-medium transition-all duration-200 shadow-sm ${
      active
        ? 'border-saffron bg-saffron text-olive shadow-lg'
        : 'border-parchment/70 bg-parchment/90 text-charcoal hover:border-saffron hover:bg-parchment hover:text-saffron'
    } focus:outline-none focus:ring-2 focus:ring-saffron/40 active:scale-95 active:animate-pulse`

  return (
    <nav className="bg-olive text-parchment shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Brand - clickable home button */}
          <Link to="/" className="flex-shrink-0 p-1 md:p-2 bg-parchment rounded-lg hover:shadow-lg transition-shadow" title="Go to Home">
            <img src="/logo.svg" alt="Mise en Place" className="h-16 md:h-24 w-auto" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="sm:hidden inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-parchment/60 bg-parchment/90 text-saffron shadow-sm transition hover:bg-parchment focus:outline-none focus:ring-2 focus:ring-saffron/40 active:scale-95"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="hidden sm:flex gap-4 md:gap-6">
            <Link to="/browse" className={navButtonClasses(isActive('/browse'))}>
              <span className="transition-transform duration-200 group-active:scale-90">🍴</span>
              Browse
            </Link>
            <Link to="/cookbook" className={navButtonClasses(isActive('/cookbook'))}>
              <span className="transition-transform duration-200 group-active:scale-90">🥗</span>
              My Cookbook
            </Link>
            <Link to="/meal-planner" className={navButtonClasses(isActive('/meal-planner'))}>
              <span className="transition-transform duration-200 group-active:scale-90">📅</span>
              Meal Planner
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="mt-4 grid gap-3 rounded-3xl border border-parchment/60 bg-parchment/95 p-3 shadow-lg sm:hidden">
            <Link to="/browse" onClick={() => setMenuOpen(false)} className={navButtonClasses(isActive('/browse'))}>
              <span className="text-xl">🍴</span>
              Browse
            </Link>
            <Link to="/cookbook" onClick={() => setMenuOpen(false)} className={navButtonClasses(isActive('/cookbook'))}>
              <span className="text-xl">🥗</span>
              My Cookbook
            </Link>
            <Link to="/meal-planner" onClick={() => setMenuOpen(false)} className={navButtonClasses(isActive('/meal-planner'))}>
              <span className="text-xl">📅</span>
              Meal Planner
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}