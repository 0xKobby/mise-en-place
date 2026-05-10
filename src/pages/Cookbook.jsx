// My Cookbook page — displays all saved recipes
import { useQuery } from '@tanstack/react-query'
import { getMealById } from '../api/mealdb'
import useCookbookStore from '../store/cookbookStore'
import RecipeCard from '../components/recipe/RecipeCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import EmptyState from '../components/ui/EmptyState'

export default function Cookbook() {
  const { savedRecipes } = useCookbookStore()
  
  // Fetch all saved recipe details
  // This creates parallel queries for each saved recipe ID
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['savedRecipes', savedRecipes],
    queryFn: async () => {
      // Fetch all saved recipes in parallel
      const promises = savedRecipes.map(id => getMealById(id))
      const results = await Promise.all(promises)
      // Filter out any null results (deleted recipes)
      return results.filter(Boolean)
    },
    // Only run if we have saved recipes
    enabled: savedRecipes.length > 0,
  })
  
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
      {!isLoading && recipes && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(meal => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  )
}