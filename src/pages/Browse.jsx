// Browse page with category, cuisine, and ingredient filtering
import { useState } from 'react'
import { useCategories } from '../hooks/useCategories'
import { useFilteredMeals } from '../hooks/useFilteredMeals'
import { getAreas, getIngredients } from '../api/mealdb'
import { useQuery } from '@tanstack/react-query'
import useBrowseStore from '../store/browseStore'
import RecipeCard from '../components/recipe/RecipeCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorMessage from '../components/ui/ErrorMessage'
import EmptyState from '../components/ui/EmptyState'

export default function Browse() {
  const [activeTab, setActiveTab] = useState('category') // 'category' | 'area' | 'ingredient'
  const [selectedFilter, setSelectedFilter] = useState(null)

  const { categories: cachedCategories, areas: cachedAreas } = useBrowseStore()

  // Fetch categories with cache fallback
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const displayCategories = categories || cachedCategories

  // Fetch areas with cache fallback
  const { data: areas, isLoading: areasLoading } = useQuery({
    queryKey: ['areas'],
    queryFn: getAreas,
    staleTime: 10 * 60 * 1000,
  })
  const displayAreas = areas || cachedAreas

  // Fetch ingredients (not cached)
  const { data: ingredients, isLoading: ingredientsLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 10 * 60 * 1000,
  })

  // Fetch filtered meals based on current selection
  const {
    data: filteredMeals,
    isLoading: mealsLoading,
    error: mealsError,
    refetch: refetchMeals,
  } = useFilteredMeals(activeTab, selectedFilter)

  // Handle filter selection
  const handleFilterClick = (filterValue) => {
    setSelectedFilter(filterValue)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
          Browse Recipes
        </h1>
        <p className="text-lg text-muted">
          Explore recipes by category, cuisine, or main ingredient
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setActiveTab('category')
            setSelectedFilter(null)
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'category'
              ? 'bg-saffron text-white'
              : 'bg-white text-charcoal hover:bg-saffron/10'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => {
            setActiveTab('area')
            setSelectedFilter(null)
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'area'
              ? 'bg-saffron text-white'
              : 'bg-white text-charcoal hover:bg-saffron/10'
          }`}
        >
          Cuisines
        </button>
        <button
          onClick={() => {
            setActiveTab('ingredient')
            setSelectedFilter(null)
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'ingredient'
              ? 'bg-saffron text-white'
              : 'bg-white text-charcoal hover:bg-saffron/10'
          }`}
        >
          Ingredients
        </button>
      </div>

      {/* Filter Options Grid */}
      <div className="mb-8">
        {activeTab === 'category' && (
          <>
            {categoriesLoading && !displayCategories && <p className="text-center text-muted">Loading categories...</p>}
            {displayCategories && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayCategories.map(category => (
                  <button
                    key={category.idCategory}
                    onClick={() => handleFilterClick(category.strCategory)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedFilter === category.strCategory
                        ? 'border-saffron bg-saffron/10'
                        : 'border-gray-200 hover:border-saffron/50'
                    }`}
                  >
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-heading font-semibold text-charcoal">
                      {category.strCategory}
                    </h3>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'area' && (
          <>
            {areasLoading && !displayAreas && <p className="text-center text-muted">Loading cuisines...</p>}
            {displayAreas && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {displayAreas.map(area => (
                  <button
                    key={area.strArea}
                    onClick={() => handleFilterClick(area.strArea)}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedFilter === area.strArea
                        ? 'border-saffron bg-saffron text-white'
                        : 'border-gray-200 hover:border-saffron/50'
                    }`}
                  >
                    {area.strArea}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'ingredient' && (
          <>
            {ingredientsLoading && <p className="text-center text-muted">Loading ingredients...</p>}
            {ingredients && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto">
                {ingredients.slice(0, 50).map(ingredient => (
                  <button
                    key={ingredient.idIngredient}
                    onClick={() => handleFilterClick(ingredient.strIngredient)}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedFilter === ingredient.strIngredient
                        ? 'border-saffron bg-saffron text-white'
                        : 'border-gray-200 hover:border-saffron/50'
                    }`}
                  >
                    {ingredient.strIngredient}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Filtered Results Section */}
      {selectedFilter && (
        <div>
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-6">
            {activeTab === 'category' && `${selectedFilter} Recipes`}
            {activeTab === 'area' && `${selectedFilter} Cuisine`}
            {activeTab === 'ingredient' && `Recipes with ${selectedFilter}`}
          </h2>

          {/* Loading State */}
          {mealsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error State */}
          {mealsError && (
            <ErrorMessage
              message="Failed to load recipes. Please try again."
              onRetry={() => refetchMeals()}
              isOfflineContext={true}
            />
          )}

          {/* Empty State */}
          {!mealsLoading && !mealsError && filteredMeals?.length === 0 && (
            <EmptyState message="No recipes found for this filter." />
          )}

          {/* Results Grid */}
          {!mealsLoading && !mealsError && filteredMeals?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map(meal => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial State Message */}
      {!selectedFilter && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👆</div>
          <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">
            Choose a {activeTab} to get started
          </h3>
          <p className="text-muted">
            Browse thousands of recipes organized by your preferences
          </p>
        </div>
      )}
    </div>
  )
}