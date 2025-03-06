import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipes, fetchRecipesByCategory } from "../../api/mealApi";
import RecipeCard from "../../components/RecipeCard";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import { Recipe } from "../../types/Recipe";
import { useSelectedRecipes } from "../../hooks/useSelectedRecipes";

const AllRecipesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  const { addRecipe } = useSelectedRecipes();

  // This ensures we reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery<Recipe[]>({
    queryKey: selectedCategory
      ? ["recipes", "category", selectedCategory]
      : ["recipes", "search", searchTerm],
    queryFn: () => {
      if (selectedCategory) {
        return fetchRecipesByCategory(selectedCategory);
      } else {
        return fetchRecipes(searchTerm);
      }
    },
  });

  // Calculate pagination
  const totalItems = recipes.length;
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = recipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of recipe list for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="all-recipes-page">
      <h1>Meals</h1>
      <SearchBar
        onSearch={(value) => {
          setSearchTerm(value);
          // Page reset is handled by useEffect
        }}
      />
      <CategoryFilter
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          // Page reset is handled by useEffect
        }}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Помилка завантаження рецептів</p>}

      {!isLoading && paginatedRecipes.length === 0 && (
        <p>No recipes found. Try a different search or category.</p>
      )}

      <div className="recipe-grid">
        {paginatedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={addRecipe}
            fallbackCategory={selectedCategory || undefined}
          />
        ))}
      </div>

      {totalItems > recipesPerPage && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={recipesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllRecipesPage;
