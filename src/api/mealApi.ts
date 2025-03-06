import axios from "axios";
import { Recipe } from "../types/Recipe";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipes = async (searchTerm: string = "") => {
  const response = await axios.get(`${API_BASE}/search.php?s=${searchTerm}`);
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE}/categories.php`);
  return response.data.categories;
};

export const fetchRecipesByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE}/filter.php?c=${category}`);
  return response.data.meals || [];
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const categories = await fetchCategories();

  const allRecipesPromises = categories.map((category: { strCategory: string; }) =>
    fetchRecipesByCategory(category.strCategory)
  );

  const allRecipesArrays = await Promise.all(allRecipesPromises);
  const allRecipes = allRecipesArrays.flat();

  const uniqueRecipesMap = new Map<string, Recipe>();
  allRecipes.forEach((recipe) => {
    uniqueRecipesMap.set(recipe.idMeal, recipe);
  });

  const shuffledRecipes = Array.from(uniqueRecipesMap.values());
  for (let i = shuffledRecipes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledRecipes[i], shuffledRecipes[j]] = [
      shuffledRecipes[j],
      shuffledRecipes[i],
    ];
  }

  return shuffledRecipes;
};
