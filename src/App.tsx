import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipesPage/AllRecipesPage";
import RecipePage from "./pages/RecipePage/RecipePage";
import SelectedRecipesPage from "./pages/SelectedRecipesPage/SelectedRecipesPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllRecipesPage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/selected" element={<SelectedRecipesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
