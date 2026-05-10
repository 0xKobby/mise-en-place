// Home page with search bar and random recipe suggestion
import { useState, useEffect } from 'react'
import { useRecipeSearch } from '../hooks/useRecipeSearch'
import { getRandomMeal } from '../api/mealdb'
import RecipeCard from '../components/recipe/RecipeCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorMessage from '../components/ui/ErrorMessage'
import EmptyState from '../components/ui/EmptyState'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [randomMeal, setRandomMeal] = useState(null)
  const [randomLoading, setRandomLoading] = useState(false)
  
  // Debounce search input by 400ms to avoid hammering the API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 400)
    
    return () => clearTimeout(timer)
  }, [searchTerm])
  
  // Fetch search results based on debounced search term
  const { data: searchResults, isLoading, error, refetch } = useRecipeSearch(debouncedSearch)
  
  // Fetch a random meal on component mount
  useEffect(() => {
    fetchRandomMeal()
  }, [])
  
  const fetchRandomMeal = async () => {
    setRandomLoading(true)
    try {
      const meal = await getRandomMeal()
      setRandomMeal(meal)
    } catch (err) {
      console.error('Failed to fetch random meal:', err)
    } finally {
      setRandomLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-heading font-bold text-charcoal mb-4">
          Welcome to Mise en Place
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Your personal recipe companion. Search thousands of recipes, save your favorites, and plan your weekly meals.
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for recipes (e.g., 'chicken pasta', 'vegan curry')..."
            className="w-full px-6 py-4 text-lg rounded-lg border-2 border-gray-200 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 transition-colors"
          />
          <svg 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Search Results Section */}
      {debouncedSearch.length >= 2 && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-6">
            Search Results for "{debouncedSearch}"
          </h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <ErrorMessage 
              message="Failed to search recipes. Please try again." 
              onRetry={() => refetch()}
            />
          )}
          
          {/* Empty State */}
          {!isLoading && !error && searchResults?.length === 0 && (
            <EmptyState message={`No recipes found for "${debouncedSearch}". Try a different search term.`} />
          )}
          
          {/* Results Grid */}
          {!isLoading && !error && searchResults?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Random Recipe Suggestion */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-semibold text-charcoal">
            {debouncedSearch.length < 2 ? 'Recipe of the Day' : 'Need Inspiration?'}
          </h2>
          <button
            onClick={fetchRandomMeal}
            disabled={randomLoading}
            className="flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg hover:bg-terracotta transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {randomLoading ? 'Loading...' : 'Get Another'}
          </button>
        </div>
        
        {randomLoading && <SkeletonCard />}
        
        {!randomLoading && randomMeal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecipeCard meal={randomMeal} />
          </div>
        )}
      </div>
    </div>
  )
}