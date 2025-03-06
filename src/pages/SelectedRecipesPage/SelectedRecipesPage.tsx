import React from "react";
import SelectedRecipes from "../../components/SelectedRecipes";
import { useSelectedRecipes } from "../../hooks/useSelectedRecipes";
import "./SelectedRecipesPage.css";

const SelectedRecipesPage: React.FC = () => {
  const { getSelectedRecipes, removeRecipe } = useSelectedRecipes();
  const selectedRecipes = getSelectedRecipes();

  return (
    <div className="selected-recipes-page">
      <SelectedRecipes
        selectedRecipes={selectedRecipes}
        onRemove={(id: string) => removeRecipe(id)}
      />
    </div>
  );
};

export default SelectedRecipesPage;
