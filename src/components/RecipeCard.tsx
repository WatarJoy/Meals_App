import React from "react";
import { Link } from "react-router-dom";
import { Recipe } from "../types/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (recipe: Recipe) => void;
  fallbackCategory?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  fallbackCategory,
}) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <p>
        Categorie: {recipe.strCategory ? recipe.strCategory : fallbackCategory}
      </p>
      <p>Country: {recipe.strArea}</p>
      <Link to={`/recipes/${recipe.idMeal}`}>See recipe</Link>
      {onSelect && (
        <button onClick={() => onSelect(recipe)}>Choose recipe</button>
      )}
    </div>
  );
};

export default RecipeCard;
