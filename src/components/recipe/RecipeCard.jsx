// Recipe summary card for grid displays with save button
import { Link } from 'react-router-dom'
import useCookbookStore from '../../store/cookbookStore'

export default function RecipeCard({ meal }) {
  const { toggleSavedRecipe, isRecipeSaved } = useCookbookStore()
  const isSaved = isRecipeSaved(meal.idMeal)
  
  // Handle save/unsave click without navigating
  const handleSaveClick = (e) => {
    e.preventDefault() // Prevent Link navigation
    toggleSavedRecipe(meal.idMeal)
  }
  
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Recipe Image with Save Button Overlay */}
        <div className="relative">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Category Badge */}
          {meal.strCategory && (
            <span className="absolute top-2 left-2 bg-terracotta text-white text-xs font-medium px-3 py-1 rounded-full">
              {meal.strCategory}
            </span>
          )}
          
          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isSaved 
                ? 'bg-saffron text-white' 
                : 'bg-white/90 text-charcoal hover:bg-saffron hover:text-white'
            }`}
            aria-label={isSaved ? 'Remove from cookbook' : 'Save to cookbook'}
          >
            <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Recipe Info */}
        <div className="p-4">
          <h3 className="font-heading font-semibold text-lg text-charcoal mb-2 group-hover:text-saffron transition-colors">
            {meal.strMeal}
          </h3>
          
          {/* Area/Cuisine */}
          {meal.strArea && (
            <p className="text-sm text-muted flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {meal.strArea}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}