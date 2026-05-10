// Custom hook — wraps React Query to search MealDB by meal name with debouncing
import { useQuery } from "@tanstack/react-query";
import { searchMealsByName } from "../api/mealdb";

/**
 * Search for recipes by name using React Query
 * Automatically refetches when searchTerm changes
 *
 * @param {string} searchTerm - User's search query
 * @returns {Object} React Query result with data, isLoading, error
 */
export const useRecipeSearch = (searchTerm) => {
  return useQuery({
    queryKey: ["recipeSearch", searchTerm],
    queryFn: () => searchMealsByName(searchTerm),
    // Only execute query if search term has at least 2 characters
    enabled: searchTerm.length >= 2,
    // Keep previous data while fetching new results for smooth UX
    keepPreviousData: true,
  });
};
