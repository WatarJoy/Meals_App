# Meal Recipes App

A recipe application built with React and TypeScript that uses [TheMealDB API](https://www.themealdb.com/api.php?ref=apilist.fun) to fetch and display meal recipes. This project demonstrates various features such as recipe listing, detailed recipe view, category filtering, pagination, debounced search, and a selection (or “shopping cart”) mechanism to combine ingredients from multiple recipes.

---

## Features

- **Display Recipes:**  
  Show all available recipes in a card format including a photo, title, category, and origin.

- **Single Recipe Detail:**  
  View detailed information for a specific recipe including ingredients, instructions, and additional data provided by the API.

- **Category Filtering:**  
  Filter recipes by category on the front-end. The filtering is performed without additional API calls.

- **Pagination:**  
  Implement front-end pagination with the following behavior:
  - Navigation arrows reset the current page to `1`.
  - If the total number of pages is more than 10, display pages 1 to 7, then an ellipsis (`…`), followed by the last page.
- **Debounced Search:**  
  Implement search functionality with debounce to minimize unnecessary API calls.

- **Recipe Selection & Ingredient Aggregation:**  
  Allow users to select multiple recipes. Display selected recipe cards along with a combined list of ingredients required to prepare all selected recipes and their corresponding instructions.

- **API-based Search:**  
  The search functionality is implemented through API calls, while category filtering and pagination are handled on the front-end.

---

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static type checking and improved developer experience.
- **Tanstack Query (React Query)**: For data fetching, caching, and state management, eliminating the need for a separate state manager.
- **Axios**

---

## Application Structure

The application consists of three main pages:

1. **All Recipes Page:**  
   Displays a list of recipes in card format (photo, title, category, origin).

2. **Single Recipe Page:**  
   Displays all details of a selected recipe fetched from the API.

3. **Selected Recipes Page:**  
   Acts like a shopping cart for recipes:
   - Shows cards for all selected recipes.
   - Displays a combined list of ingredients required for all selected recipes.
   - Provides consolidated preparation instructions.

---

## Data Management & API Integration

- **Data Fetching:**  
  All data fetching is handled using Tanstack Query. This includes both the initial recipe data and the API-based search functionality.
- **Caching:**  
  Instead of a traditional state manager, cached data from Tanstack Query is used to manage application state across different pages.

- **TheMealDB API:**  
  Utilized as the primary data source for recipes and related information.

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm

### Installation

```bash
git clone https://github.com/yourusername/meal-recipes-app.git
cd meals_app
npm install
npm run dev
```

or use [Demo Link](https://github.com/WatarJoy/Meals_App)
