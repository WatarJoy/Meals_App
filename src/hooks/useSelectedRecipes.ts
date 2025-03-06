import { useQueryClient } from "@tanstack/react-query";
import { Recipe } from "../types/Recipe";

export const useSelectedRecipes = () => {
  const queryClient = useQueryClient();

  const getSelectedRecipes = (): Recipe[] => {
    return queryClient.getQueryData<Recipe[]>(["selectedRecipes"]) || [];
  };

  const addRecipe = (recipe: Recipe) => {
    const current = getSelectedRecipes();
    // Запобігаємо дублюванню
    if (!current.find((r) => r.idMeal === recipe.idMeal)) {
      queryClient.setQueryData(["selectedRecipes"], [...current, recipe]);
    }
  };

  const removeRecipe = (id: string) => {
    const current = getSelectedRecipes();
    const updated = current.filter((recipe) => recipe.idMeal !== id);
    queryClient.setQueryData(["selectedRecipes"], updated);
  };

  return { getSelectedRecipes, addRecipe, removeRecipe };
};
