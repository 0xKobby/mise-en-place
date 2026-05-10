// Custom hook — fetches full recipe details by ID using React Query
import { useQuery } from "@tanstack/react-query";
import { getMealById } from "../api/mealdb";

/**
 * Fetch full details for a single recipe by its MealDB ID
 * Results are cached by React Query to prevent redundant API calls
 *
 * @param {string} mealId - MealDB meal ID
 * @returns {Object} React Query result with meal data, isLoading, error
 */
export const useRecipeDetail = (mealId) => {
  return useQuery({
    queryKey: ["recipeDetail", mealId],
    queryFn: () => getMealById(mealId),
    // Only run query if we have a valid meal ID
    enabled: !!mealId,
  });
};
