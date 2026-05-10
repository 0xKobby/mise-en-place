// Zustand store for managing saved recipes and weekly meal plan with localStorage persistence
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Cookbook store manages:
 * - savedRecipes: Array of meal IDs the user has saved
 * - mealPlan: Object mapping day names to meal IDs
 *
 * All state is persisted to localStorage for offline access
 */
const useCookbookStore = create(
  persist(
    (set, get) => ({
      // Array of saved meal IDs (e.g., ["52772", "52940"])
      savedRecipes: [],

      // Weekly meal plan: { Monday: "52772", Tuesday: null, ... }
      mealPlan: {
        Monday: null,
        Tuesday: null,
        Wednesday: null,
        Thursday: null,
        Friday: null,
        Saturday: null,
        Sunday: null,
      },

      /**
       * Toggle a recipe in the saved collection
       * @param {string} mealId - MealDB meal ID
       */
      toggleSavedRecipe: (mealId) => {
        set((state) => {
          const isSaved = state.savedRecipes.includes(mealId);
          return {
            savedRecipes: isSaved
              ? state.savedRecipes.filter((id) => id !== mealId)
              : [...state.savedRecipes, mealId],
          };
        });
      },

      /**
       * Check if a recipe is currently saved
       * @param {string} mealId - MealDB meal ID
       * @returns {boolean}
       */
      isRecipeSaved: (mealId) => {
        return get().savedRecipes.includes(mealId);
      },

      /**
       * Assign a meal to a specific day in the weekly plan
       * @param {string} day - Day name (e.g., "Monday")
       * @param {string} mealId - MealDB meal ID or null to clear
       */
      setMealForDay: (day, mealId) => {
        set((state) => ({
          mealPlan: {
            ...state.mealPlan,
            [day]: mealId,
          },
        }));
      },

      /**
       * Remove a meal from a specific day
       * @param {string} day - Day name
       */
      removeMealFromDay: (day) => {
        set((state) => ({
          mealPlan: {
            ...state.mealPlan,
            [day]: null,
          },
        }));
      },

      /**
       * Clear the entire meal plan
       */
      clearMealPlan: () => {
        set({
          mealPlan: {
            Monday: null,
            Tuesday: null,
            Wednesday: null,
            Thursday: null,
            Friday: null,
            Saturday: null,
            Sunday: null,
          },
        });
      },
    }),
    {
      name: "mise-en-place-storage", // localStorage key
    },
  ),
);

export default useCookbookStore;
