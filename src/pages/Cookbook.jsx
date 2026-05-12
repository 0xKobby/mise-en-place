// My Cookbook page — displays all saved recipes
import { useQuery } from '@tanstack/react-query'
import { getMealById } from '../api/mealdb'
import useCookbookStore from '../store/cookbookStore'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import RecipeCard from '../components/recipe/RecipeCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import EmptyState from '../components/ui/EmptyState'

export default function Cookbook() {
  const { savedRecipes, getCachedRecipe } = useCookbookStore()
  const { isOnline } = useOnlineStatus()

  // Fetch recipes not in cache
  const uncachedIds = savedRecipes.filter(id => !getCachedRecipe(id))
  const cachedCount = savedRecipes.length - uncachedIds.length

  const { data: fetchedRecipes, isLoading } = useQuery({
    queryKey: ['savedRecipes', uncachedIds],
    queryFn: async () => {
      if (uncachedIds.length === 0) return []
      const promises = uncachedIds.map(id => getMealById(id))
      const results = await Promise.all(promises)
      return results.filter(Boolean)
    },
    enabled: uncachedIds.length > 0,
  })

  // Combine cached recipes with fetched ones
  const allRecipes = savedRecipes
    .map(id => getCachedRecipe(id) || fetchedRecipes?.find(r => r.idMeal === id))
    .filter(Boolean)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
          My Cookbook
        </h1>
        <p className="text-lg text-muted">
          {savedRecipes.length === 0
            ? 'Your saved recipes will appear here'
            : `You have ${savedRecipes.length} saved ${savedRecipes.length === 1 ? 'recipe' : 'recipes'}`
          }
        </p>
        {!isOnline && cachedCount > 0 && (
          <p className="text-sm text-orange-600 mt-2 flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c4.976-4.976 13.036-4.976 14.768 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 00 1.414 1.414 5 5 0 017.072 0 1 1 0 001.414-1.414zM12 14a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
            </svg>
            {cachedCount} recipe{cachedCount !== 1 ? 's' : ''} available offline
          </p>
        )}
      </div>

      {/* Empty State — No Saved Recipes */}
      {savedRecipes.length === 0 && (
        <EmptyState
          icon="📖"
          message="Start building your personal cookbook by saving recipes you love. Click the heart icon on any recipe card to add it here."
        />
      )}

      {/* Loading State */}
      {isLoading && savedRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((_, index) => <SkeletonCard key={index} />)}
        </div>
      )}

      {/* Saved Recipes Grid */}
      {!isLoading && allRecipes && allRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRecipes.map(meal => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  )
}