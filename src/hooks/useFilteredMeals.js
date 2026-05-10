// Custom hook — filters meals by category, area, or ingredient
import { useQuery } from "@tanstack/react-query";
import {
  filterByCategory,
  filterByArea,
  filterByIngredient,
} from "../api/mealdb";

/**
 * Filter meals by a given criterion (category, area, or ingredient)
 * Returns summary objects only — use useRecipeDetail to fetch full recipe
 *
 * @param {string} filterType - One of 'category', 'area', 'ingredient'
 * @param {string} filterValue - The value to filter by (e.g., "Seafood", "Italian")
 * @returns {Object} React Query result with filtered meals array
 */
export const useFilteredMeals = (filterType, filterValue) => {
  return useQuery({
    queryKey: ["filteredMeals", filterType, filterValue],
    queryFn: async () => {
      // Route to the appropriate API function based on filter type
      switch (filterType) {
        case "category":
          return filterByCategory(filterValue);
        case "area":
          return filterByArea(filterValue);
        case "ingredient":
          return filterByIngredient(filterValue);
        default:
          return [];
      }
    },
    // Only run if we have both filter type and value
    enabled: !!filterType && !!filterValue,
  });
};
