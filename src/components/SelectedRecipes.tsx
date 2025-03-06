import React from "react";
import { Recipe } from "../types/Recipe";
import RecipeCard from "./RecipeCard";

interface SelectedRecipesProps {
  selectedRecipes: Recipe[];
  onRemove: (id: string) => void;
}

const SelectedRecipes: React.FC<SelectedRecipesProps> = ({
  selectedRecipes,
  onRemove,
}) => {
  // Агрегування інгредієнтів з усіх вибраних рецептів
  const aggregateIngredients = () => {
    const ingredientMap: Record<string, number> = {};

    selectedRecipes.forEach((recipe) => {
      Object.keys(recipe).forEach((key) => {
        if (key.startsWith("strIngredient") && recipe[key]) {
          const ingredient = recipe[key];
          if (ingredientMap[ingredient]) {
            ingredientMap[ingredient] += 1;
          } else {
            ingredientMap[ingredient] = 1;
          }
        }
      });
    });

    return ingredientMap;
  };

  const aggregatedIngredients = aggregateIngredients();

  return (
    <div className="selected-recipes">
      <h1>Choosen recepies</h1>
      <div className="selected-recipes-list">
        {selectedRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="selected-recipe-card">
            <RecipeCard recipe={recipe} />
            <button onClick={() => onRemove(recipe.idMeal)}>Delete</button>
          </div>
        ))}
      </div>
      <h2>Список покупок</h2>
      <ul>
        {Object.entries(aggregatedIngredients).map(([ingredient, count]) => (
          <li key={ingredient}>
            {ingredient} {count > 1 ? `x${count}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedRecipes;
