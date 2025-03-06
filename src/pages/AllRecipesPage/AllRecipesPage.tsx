import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllRecipes,
  fetchRecipeById,
  fetchRecipes,
  fetchRecipesByCategory,
} from "../../api/mealApi";
import RecipeCard from "../../components/RecipeCard";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import { Recipe } from "../../types/Recipe";
import { Link } from "react-router-dom";
import "./AllRecipesPage.css";
import Snackbar from "../../components/snackbar/snackbar";

const AllRecipesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  const [fullRecipes, setFullRecipes] = useState<Recipe[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error",
  });

  const addRecipe = (recipe: Recipe) => {
    const currentSelectedRecipes = JSON.parse(
      localStorage.getItem("selectedRecipes") || "[]"
    );

    if (!currentSelectedRecipes.includes(recipe.idMeal)) {
      const updatedSelectedRecipes = [...currentSelectedRecipes, recipe.idMeal];

      localStorage.setItem(
        "selectedRecipes",
        JSON.stringify(updatedSelectedRecipes)
      );

      setSnackbar({
        open: true,
        message: `${recipe.strMeal} added to your selected recipes!`,
        type: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: `${recipe.strMeal} is already in your selected recipes!`,
        type: "error",
      });
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes", { searchTerm, selectedCategory }],
    queryFn: async () => {
      if (selectedCategory) {
        const recipesByCategory = await fetchRecipesByCategory(
          selectedCategory
        );
        if (searchTerm) {
          return recipesByCategory.filter((recipe: { strMeal: string }) =>
            recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return recipesByCategory;
      } else if (searchTerm) {
        return fetchRecipes(searchTerm);
      } else {
        return fetchAllRecipes();
      }
    },
    retry: false,
  });
  const totalItems = recipes.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const currentPaginatedRecipes = recipes.slice(
      startIndex,
      startIndex + recipesPerPage
    );

    if (currentPaginatedRecipes.length === 0) {
      setFullRecipes([]);
      return;
    }

    let isCancelled = false;

    Promise.all(
      currentPaginatedRecipes.map((recipe) =>
        fetchRecipeById(recipe.idMeal).then(
          (fullRecipe) => fullRecipe || recipe
        )
      )
    )
      .then((fullRecipesData) => {
        if (!isCancelled) {
          setFullRecipes(fullRecipesData);
        }
      })
      .catch((err) => {
        console.error("Error fetching full recipes:", err);
        if (!isCancelled) {
          setFullRecipes(currentPaginatedRecipes);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [recipes, currentPage, recipesPerPage]);

  useEffect(() => {
    const updateSelectedCount = () => {
      const selectedRecipes = JSON.parse(
        localStorage.getItem("selectedRecipes") || "[]"
      );
      setSelectedCount(selectedRecipes.length);
    };

    updateSelectedCount();

    window.addEventListener("storage", updateSelectedCount);

    const handleStorageChange = () => {
      updateSelectedCount();
    };

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "selectedRecipes") {
        handleStorageChange();
      }
    };

    return () => {
      window.removeEventListener("storage", updateSelectedCount);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  return (
    <div className="all-recipes-page">
      <div className="page-header">
        <h1>Meals</h1>
        <Link to="/selected" className="selected-recipes-button">
          Selected Recipes
          {selectedCount > 0 && <span className="badge">{selectedCount}</span>}
        </Link>
      </div>
      <SearchBar
        onSearch={(value) => {
          setSearchTerm(value);
        }}
      />
      <CategoryFilter
        onSelectCategory={(category) => {
          setSelectedCategory(category);
        }}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Loading error</p>}

      <div className="recipe-grid">
        {fullRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onSelect={addRecipe}
            fallbackArea={recipe.strArea}
            fallbackCategory={selectedCategory}
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
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default AllRecipesPage;
