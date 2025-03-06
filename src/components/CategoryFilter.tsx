import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/mealApi";

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onSelectCategory,
}) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Помилка завантаження категорій</p>;

  return (
    <div className="category-filter">
      <select onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">All categories</option>
        {categories.map((cat: any) => (
          <option key={cat.idCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
