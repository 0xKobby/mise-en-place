// Utility function to transform MealDB's flat ingredient fields into a clean array
/**
 * Parses the parallel ingredient and measure fields from a MealDB meal object
 * into a structured array of { ingredient, measure } objects.
 *
 * MealDB stores ingredients as strIngredient1-20 and strMeasure1-20.
 * This function zips them together and filters out empty entries.
 *
 * @param {Object} meal - MealDB meal object
 * @returns {Array<{ingredient: string, measure: string}>} Clean ingredients array
 *
 * Example input:
 *   { strIngredient1: "Chicken", strMeasure1: "500g", strIngredient2: "", ... }
 *
 * Example output:
 *   [{ ingredient: "Chicken", measure: "500g" }]
 */
export const parseIngredients = (meal) => {
  if (!meal) return [];

  const ingredients = [];

  // MealDB has up to 20 ingredient/measure pairs
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // Only include if ingredient exists and is not empty/whitespace
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
};
