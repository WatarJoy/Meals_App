import React from "react";
import { Recipe } from "../types/Recipe";

interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  // Отримання списку інгредієнтів (ключі, що починаються на "strIngredient" і мають значення)
  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith("strIngredient") && recipe[key])
    .map((key) => recipe[key]);

  return (
    <div className="recipe-detail">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>Category: {recipe.strCategory}</p>
      <p>Country: {recipe.strArea}</p>
      <h2>Ingridients</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.strInstructions}</p>
      {recipe.strYoutube && (
        <div>
          <h2>Video</h2>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch video
          </a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
