// Weekly meal planner with drag-to-assign functionality
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMealById } from '../api/mealdb'
import useCookbookStore from '../store/cookbookStore'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import RecipeCard from '../components/recipe/RecipeCard'
import SkeletonCard from '../components/ui/SkeletonCard'

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function MealPlanner() {
  const {
    savedRecipes,
    mealPlan,
    setMealForDay,
    removeMealFromDay,
    clearMealPlan,
    getCachedRecipe,
  } = useCookbookStore()
  const { isOnline } = useOnlineStatus()
  const [selectedDay, setSelectedDay] = useState(null)

  const uncachedSavedRecipeIds = savedRecipes.filter((id) => !getCachedRecipe(id))

  const { data: fetchedSavedRecipes, isLoading: recipesLoading } = useQuery({
    queryKey: ['savedRecipesForPlanner', uncachedSavedRecipeIds],
    queryFn: async () => {
      if (uncachedSavedRecipeIds.length === 0) return []
      const promises = uncachedSavedRecipeIds.map((id) => getMealById(id))
      const results = await Promise.all(promises)
      return results.filter(Boolean)
    },
    enabled: uncachedSavedRecipeIds.length > 0 && isOnline,
  })

  const savedRecipeDetails = savedRecipes
    .map((id) => getCachedRecipe(id) || fetchedSavedRecipes?.find((meal) => meal.idMeal === id))
    .filter(Boolean)

  const plannedMealIds = Object.values(mealPlan).filter(Boolean)
  const cachedPlannedMeals = plannedMealIds.reduce((acc, id) => {
    const cached = getCachedRecipe(id)
    if (cached) acc[id] = cached
    return acc
  }, {})

  const uncachedPlannedMealIds = plannedMealIds.filter((id) => !cachedPlannedMeals[id])

  const { data: fetchedPlannedMeals } = useQuery({
    queryKey: ['plannedMeals', uncachedPlannedMealIds],
    queryFn: async () => {
      if (uncachedPlannedMealIds.length === 0) return {}
      const promises = uncachedPlannedMealIds.map((id) => getMealById(id))
      const results = await Promise.all(promises)
      return results.reduce((acc, meal) => {
        if (meal) acc[meal.idMeal] = meal
        return acc
      }, {})
    },
    enabled: uncachedPlannedMealIds.length > 0 && isOnline,
  })

  const plannedMeals = {
    ...cachedPlannedMeals,
    ...(fetchedPlannedMeals || {}),
  }
  
  // Handle assigning a recipe to a day
  const handleAssignMeal = (mealId) => {
    if (selectedDay) {
      setMealForDay(selectedDay, mealId)
      setSelectedDay(null) // Close selection modal
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
          Weekly Meal Planner
        </h1>
        <p className="text-lg text-muted mb-4">
          Plan your meals for the week ahead
        </p>
        {Object.values(mealPlan).filter(Boolean).length > 0 && (
          <button
            onClick={clearMealPlan}
            className="text-terracotta hover:text-terracotta/70 text-sm font-medium transition-colors"
          >
            Clear All Meals
          </button>
        )}
      </div>
      
      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {DAYS_OF_WEEK.map(day => {
          const assignedMealId = mealPlan[day]
          const assignedMeal = assignedMealId && plannedMeals?.[assignedMealId]
          
          return (
            <div key={day} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-heading font-semibold text-lg text-charcoal mb-3">
                {day}
              </h3>
              
              {/* Assigned Meal */}
              {assignedMeal ? (
                <div className="relative">
                  <img 
                    src={assignedMeal.strMealThumb} 
                    alt={assignedMeal.strMeal}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium text-sm text-charcoal mb-2">
                    {assignedMeal.strMeal}
                  </p>
                  <button
                    onClick={() => removeMealFromDay(day)}
                    className="w-full bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // Empty Day — Click to Assign
                <button
                  onClick={() => setSelectedDay(day)}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-muted hover:border-saffron hover:text-saffron transition-colors"
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm">Add Meal</p>
                  </div>
                </button>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Recipe Selection Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-parchment rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-semibold text-charcoal">
                Select a recipe for {selectedDay}
              </h2>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-muted hover:text-charcoal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* No Saved Recipes Message */}
            {savedRecipes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted mb-4">
                  You don't have any saved recipes yet. Save some recipes to start planning your meals!
                </p>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="bg-saffron text-white px-6 py-2 rounded-lg hover:bg-terracotta transition-colors"
                >
                  Browse Recipes
                </button>
              </div>
            )}
            
            {/* Loading Recipes */}
            {recipesLoading && savedRecipes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
              </div>
            )}
            
            {/* Saved Recipes Grid */}
            {!recipesLoading && savedRecipeDetails && savedRecipeDetails.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedRecipeDetails.map(meal => (
                  <div 
                    key={meal.idMeal}
                    onClick={() => handleAssignMeal(meal.idMeal)}
                    className="cursor-pointer"
                  >
                    <RecipeCard meal={meal} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}