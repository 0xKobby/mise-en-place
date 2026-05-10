// Custom hook — fetches all meal categories from MealDB
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/mealdb";

/**
 * Fetch the complete list of meal categories
 * Categories include name, thumbnail, and description
 * Results are cached for 10 minutes since they rarely change
 *
 * @returns {Object} React Query result with categories array
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    // Categories are static — cache for 10 minutes
    staleTime: 10 * 60 * 1000,
  });
};
