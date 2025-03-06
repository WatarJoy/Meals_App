import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../api/mealApi";
import RecipeDetail from "../../components/RecipeDetail";
import { Recipe } from "../../types/Recipe";
import "./RecipePage.css";

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery<Recipe | null>({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id || ""),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !recipe) return <p>Помилка завантаження рецепту</p>;

  return (
    <div className="recipe-page">
      <RecipeDetail recipe={recipe} />
    </div>
  );
};

export default RecipePage;
