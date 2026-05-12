// Hook to initialize browse cache on app startup
import { useEffect } from "react";
import { getCategories, getAreas } from "../api/mealdb";
import useBrowseStore from "../store/browseStore";

export function useInitializeBrowseCache() {
  const { isCacheValid, isInitialized, setCategoriesData, setAreasData } =
    useBrowseStore();

  useEffect(() => {
    const initializeCache = async () => {
      // If cache is valid and initialized, skip
      if (isInitialized && isCacheValid()) {
        return;
      }

      try {
        // Fetch categories and areas in parallel
        const [categories, areas] = await Promise.all([
          getCategories(),
          getAreas(),
        ]);

        // Store in cache
        if (categories.length > 0) {
          setCategoriesData(categories);
        }
        if (areas.length > 0) {
          setAreasData(areas);
        }
      } catch (error) {
        // Silent fail - cache initialization is non-critical
        console.debug("Browse cache initialization failed (offline?):", error);
      }
    };

    initializeCache();
  }, [isInitialized, isCacheValid, setCategoriesData, setAreasData]);
}
