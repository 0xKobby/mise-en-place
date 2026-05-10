// Full recipe detail view with ingredients, instructions, and video
import { parseIngredients } from '../../utils/parseIngredients'
import IngredientList from './IngredientList'
import useCookbookStore from '../../store/cookbookStore'

export default function RecipeDetail({ meal }) {
  const { toggleSavedRecipe, isRecipeSaved } = useCookbookStore()
  const isSaved = isRecipeSaved(meal.idMeal)
  
  // Parse ingredients from flat MealDB structure
  const ingredients = parseIngredients(meal)
  
  // Extract YouTube video ID if available
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    const videoId = url.split('v=')[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }
  
  const videoUrl = getYouTubeEmbedUrl(meal.strYoutube)
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section with Image and Title */}
      <div className="relative mb-8">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        
        {/* Save Button Overlay */}
        <button
          onClick={() => toggleSavedRecipe(meal.idMeal)}
          className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors ${
            isSaved 
              ? 'bg-saffron text-white' 
              : 'bg-white text-charcoal hover:bg-saffron hover:text-white'
          }`}
          aria-label={isSaved ? 'Remove from cookbook' : 'Save to cookbook'}
        >
          <svg className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {/* Recipe Meta Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
          {meal.strMeal}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {meal.strCategory && (
            <span className="flex items-center gap-1 bg-terracotta/10 text-terracotta px-3 py-1 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {meal.strCategory}
            </span>
          )}
          
          {meal.strArea && (
            <span className="flex items-center gap-1 bg-olive/10 text-olive px-3 py-1 rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {meal.strArea} Cuisine
            </span>
          )}
        </div>
      </div>
      
      {/* Two-Column Layout: Ingredients | Instructions */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Ingredients Section (1/3 width) */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-4">
            Ingredients
          </h2>
          <IngredientList ingredients={ingredients} />
        </div>
        
        {/* Instructions Section (2/3 width) */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-4">
            Instructions
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-charcoal leading-relaxed whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>
        </div>
      </div>
      
      {/* Video Section (if available) */}
      {videoUrl && (
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-4">
            Video Tutorial
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title={meal.strMeal}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
      
      {/* Source Link (if available) */}
      {meal.strSource && (
        <div className="text-center">
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-saffron hover:text-terracotta transition-colors"
          >
            View Original Recipe
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}