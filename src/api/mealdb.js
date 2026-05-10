// All MealDB API interaction functions using Axios
import axios from "axios";

const API_KEY = import.meta.env.VITE_MEALDB_API_KEY;
const BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

// Create configured axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * Search for meals by name
 * @param {string} query - Search term (e.g., "chicken", "pasta")
 * @returns {Promise<Array>} Array of meal objects or empty array if none found
 */
export const searchMealsByName = async (query) => {
  const response = await api.get(`/search.php?s=${query}`);
  return response.data.meals || [];
};

/**
 * Search for meals by first letter
 * @param {string} letter - Single letter A-Z
 * @returns {Promise<Array>} Array of meal objects
 */
export const searchMealsByLetter = async (letter) => {
  const response = await api.get(`/search.php?f=${letter}`);
  return response.data.meals || [];
};

/**
 * Get full recipe details by meal ID
 * @param {string} id - MealDB meal ID
 * @returns {Promise<Object|null>} Full meal object or null if not found
 */
export const getMealById = async (id) => {
  const response = await api.get(`/lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

/**
 * Get a single random meal
 * @returns {Promise<Object>} Random meal object
 */
export const getRandomMeal = async () => {
  const response = await api.get("/random.php");
  return response.data.meals[0];
};

/**
 * List all meal categories with descriptions and thumbnails
 * @returns {Promise<Array>} Array of category objects
 */
export const getCategories = async () => {
  const response = await api.get("/categories.php");
  return response.data.categories || [];
};

/**
 * List all cuisines/areas (e.g., "Italian", "Mexican", "British")
 * @returns {Promise<Array>} Array of area name strings
 */
export const getAreas = async () => {
  const response = await api.get("/list.php?a=list");
  return response.data.meals || [];
};

/**
 * List all available ingredients
 * @returns {Promise<Array>} Array of ingredient objects
 */
export const getIngredients = async () => {
  const response = await api.get("/list.php?i=list");
  return response.data.meals || [];
};

/**
 * Filter meals by category (returns summary only — requires lookup for full details)
 * @param {string} category - Category name (e.g., "Seafood", "Vegetarian")
 * @returns {Promise<Array>} Array of meal summary objects (id, name, thumbnail)
 */
export const filterByCategory = async (category) => {
  const response = await api.get(`/filter.php?c=${category}`);
  return response.data.meals || [];
};

/**
 * Filter meals by cuisine/area (returns summary only)
 * @param {string} area - Area name (e.g., "Italian", "Mexican")
 * @returns {Promise<Array>} Array of meal summary objects
 */
export const filterByArea = async (area) => {
  const response = await api.get(`/filter.php?a=${area}`);
  return response.data.meals || [];
};

/**
 * Filter meals by main ingredient (returns summary only)
 * @param {string} ingredient - Ingredient name (e.g., "chicken", "beef")
 * @returns {Promise<Array>} Array of meal summary objects
 */
export const filterByIngredient = async (ingredient) => {
  const response = await api.get(`/filter.php?i=${ingredient}`);
  return response.data.meals || [];
};
