// Full recipe detail page route
import { useParams, useNavigate } from 'react-router-dom'
import { useRecipeDetail } from '../hooks/useRecipeDetail'
import RecipeDetail from '../components/recipe/RecipeDetail'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function RecipePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: meal, isLoading, error, refetch } = useRecipeDetail(id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted hover:text-saffron transition-colors mb-6"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      
      {/* Loading State */}
      {isLoading && (
        <div className="max-w-4xl mx-auto">
          <SkeletonCard />
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <ErrorMessage 
          message="Failed to load recipe details. Please try again." 
          onRetry={() => refetch()}
        />
      )}
      
      {/* Recipe Content */}
      {!isLoading && !error && meal && (
        <RecipeDetail meal={meal} />
      )}
      
      {/* Not Found State */}
      {!isLoading && !error && !meal && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-heading font-semibold text-charcoal mb-2">
            Recipe Not Found
          </h2>
          <p className="text-muted mb-6">
            This recipe doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-saffron text-white px-6 py-3 rounded-lg hover:bg-terracotta transition-colors"
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  )
}