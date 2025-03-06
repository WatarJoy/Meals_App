export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  // Додаткові поля (інгредієнти, виміри, тощо)
  [key: string]: any;
}
