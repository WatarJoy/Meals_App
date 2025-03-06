import axios from "axios";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipes = async (searchTerm: string = "") => {
  // Якщо пошуковий запит порожній, API повертає набір рецептів
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
