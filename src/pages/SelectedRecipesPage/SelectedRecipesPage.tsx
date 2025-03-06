import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Recipe } from "../../types/Recipe";
import RecipeCard from "../../components/RecipeCard";
import { fetchRecipeById } from "../../api/mealApi";
import { Link } from "react-router-dom";
import "./SelectedRecipesPage.css";

interface Ingredient {
  name: string;
  measure: string;
}

const SelectedRecipesPage: React.FC = () => {
  const [selectedRecipeIds, setSelectedRecipeIds] = useLocalStorage<string[]>(
    "selectedRecipes",
    []
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [combinedIngredients, setCombinedIngredients] = useState<Ingredient[]>(
    []
  );
  const [instructions, setInstructions] = useState<
    { title: string; text: string }[]
  >([]);

  useEffect(() => {
    const fetchSelectedRecipes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (selectedRecipeIds.length === 0) {
          setRecipes([]);
          setIsLoading(false);
          return;
        }

        const recipePromises = selectedRecipeIds.map((id) =>
          fetchRecipeById(id)
        );
        const fetchedRecipes = await Promise.all(recipePromises);

        const validRecipes = fetchedRecipes.filter(
          (recipe): recipe is Recipe => recipe !== null
        );

        setRecipes(validRecipes);
      } catch (err) {
        console.error("Error fetching selected recipes:", err);
        setError("Failed to load selected recipes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedRecipes();
  }, [selectedRecipeIds]);

  useEffect(() => {
    if (recipes.length === 0) return;

    const ingredientMap = new Map<string, string>();

    recipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Recipe;
        const measureKey = `strMeasure${i}` as keyof Recipe;

        const ingredient = recipe[ingredientKey] as string;
        const measure = recipe[measureKey] as string;

        if (ingredient && ingredient.trim() !== "") {
          const normalizedIngredient = ingredient.toLowerCase().trim();

          ingredientMap.set(
            `${normalizedIngredient}-${recipe.idMeal}`,
            `${measure || ""} ${ingredient}`
          );
        }
      }
    });

    const ingredientsList: Ingredient[] = Array.from(
      ingredientMap.values()
    ).map((combined) => {
      const parts = combined.trim().split(" ");
      const measure = parts[0];
      const name = parts.slice(1).join(" ");
      return { name, measure };
    });

    setCombinedIngredients(ingredientsList);

    const instructionsList = recipes.map((recipe) => ({
      title: recipe.strMeal,
      text: recipe.strInstructions || "No instructions available",
    }));

    setInstructions(instructionsList);
  }, [recipes]);

  const removeRecipe = (recipeId: string) => {
    setSelectedRecipeIds(selectedRecipeIds.filter((id) => id !== recipeId));
  };

  const clearAllRecipes = () => {
    setSelectedRecipeIds([]);
  };

  return (
    <div className="choosen-recipes-page">
      <h1>Selected Recipes</h1>

      {isLoading && <p>Loading your selected recipes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!isLoading && recipes.length === 0 && (
        <div className="empty-selection">
          <p>You haven't selected any recipes yet.</p>
          <Link to="/" className="browse-recipes-button">
            Browse Recipes
          </Link>
        </div>
      )}

      {recipes.length > 0 && (
        <>
          <div className="action-buttons">
            <Link to="/" className="browse-recipes-button">
              Browse Recipes
            </Link>
            <button onClick={clearAllRecipes} className="clear-all-button">
              Clear All Recipes
            </button>
          </div>

          <h2>Your Selected Recipes</h2>
          <div className="choosen-recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="choosen-recipe-card">
                <RecipeCard recipe={recipe} />
                <button
                  className="remove-recipe-button"
                  onClick={() => removeRecipe(recipe.idMeal)}
                >
                  Remove Recipe
                </button>
              </div>
            ))}
          </div>

          <div className="combined-ingredients-section">
            <h2>Combined Ingredients List</h2>
            {combinedIngredients.length > 0 ? (
              <ul className="ingredients-list">
                {combinedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-measure">
                      {ingredient.measure}
                    </span>{" "}
                    <span className="ingredient-name">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients found</p>
            )}
          </div>

          <div className="instructions-section">
            <h2>Cooking Instructions</h2>
            {instructions.map((instruction, index) => (
              <div key={index} className="recipe-instructions">
                <h3>{instruction.title}</h3>
                <p>{instruction.text}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedRecipesPage;
