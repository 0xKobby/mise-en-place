// Zustand store for caching browse data (categories, areas, ingredients)
import { create } from "zustand";
import { persist } from "zustand/middleware";

const CACHE_TTL_DAYS = 7;

const useBrowseStore = create(
  persist(
    (set, get) => ({
      categories: [],
      areas: [],
      ingredients: [],
      lastUpdated: null,
      isInitialized: false,

      setCategoriesData: (data) => {
        set({
          categories: data,
          lastUpdated: Date.now(),
          isInitialized: true,
        });
      },

      setAreasData: (data) => {
        set({ areas: data });
      },

      setIngredientsData: (data) => {
        set({ ingredients: data });
      },

      isCacheValid: () => {
        const { lastUpdated } = get();
        if (!lastUpdated) return false;
        const ageInDays = (Date.now() - lastUpdated) / (1000 * 60 * 60 * 24);
        return ageInDays < CACHE_TTL_DAYS;
      },

      clearCache: () => {
        set({
          categories: [],
          areas: [],
          ingredients: [],
          lastUpdated: null,
          isInitialized: false,
        });
      },
    }),
    {
      name: "browse-cache-storage",
    },
  ),
);

export default useBrowseStore;
