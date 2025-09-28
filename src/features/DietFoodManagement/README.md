# Diet Food Management Module

A comprehensive food database management system for gym and diet management applications. This module provides tools to manage a complete database of foods with accurate nutritional information, images, and dietary classifications.

## Features

### 🍎 Food Database

- **Comprehensive Food Library**: 15+ foods with accurate macro data
- **High-Quality Images**: Publicly sourced images from Unsplash
- **Detailed Nutrition**: Per 100g nutrition facts including calories, protein, carbs, fats, fiber, sugar, and sodium
- **Multiple Portion Sizes**: Common portion sizes with calculated macros
- **Dietary Classifications**: Extensive tagging system for dietary preferences

### 📊 Dashboard & Analytics

- **Overview Statistics**: Total foods, active foods, categories, and averages
- **Category Breakdown**: Visual distribution of foods by category
- **Dietary Tag Analysis**: Popular dietary preferences and restrictions
- **Quick Stats**: High-protein foods, low-calorie options, vegan choices

### 🔍 Advanced Search & Filtering

- **Text Search**: Search by name, description, or category
- **Category Filtering**: Filter by protein, carbs, fats, vegetables, etc.
- **Subcategory Filtering**: Refined filtering within categories
- **Dietary Tag Filtering**: Filter by keto-friendly, vegan, gluten-free, etc.
- **Nutrition Filtering**: Filter by protein content, calorie range
- **Sorting Options**: Multiple sorting criteria (name, calories, protein, date)

### 🏷️ Categorization System

- **Primary Categories**: Protein, Carbs, Fats, Vegetables, Fruits, Dairy, etc.
- **Subcategories**: Poultry, Fish, Grains, Leafy Greens, Berries, etc.
- **Dietary Tags**: 16+ tags including high-protein, keto-friendly, paleo, vegan
- **Allergen Tracking**: Common allergens identification
- **Preparation Methods**: Multiple cooking/preparation options

## Technical Architecture

### Context Management

```javascript
// Global state management with React Context
const { foods, searchTerm, selectedCategory } = useDietFood();
```

### Components Structure

```
DietFoodManagement/
├── components/
│   ├── DietFoodApp.jsx          // Main app with navigation
│   ├── DietFoodDashboard.jsx    // Statistics and overview
│   └── DietFoodList.jsx         // Food grid with filters
├── context/
│   └── DietFoodContext.jsx      // Global state management
├── constants/
│   ├── index.js                 // Categories, tags, constants
│   └── foodDatabase.json        // Complete food database
└── utils/
    └── nutritionUtils.js        // Calculation utilities
```

### Data Model

```javascript
// Food Object Structure
{
  id: "food001",
  name: "Chicken Breast",
  category: "protein",
  subcategory: "poultry",
  description: "Lean, boneless, skinless chicken breast",
  image: "https://images.unsplash.com/photo-...",
  servingSize: "100g",
  nutritionPer100g: {
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74
  },
  commonPortions: [
    {
      name: "Medium breast",
      weight: "150g",
      calories: 248,
      protein: 46.5,
      carbs: 0,
      fats: 5.4
    }
  ],
  benefits: ["High protein", "Low fat", "Zero carbs"],
  allergens: [],
  dietaryTags: ["high-protein", "low-carb", "keto-friendly"],
  preparationMethods: ["grilled", "baked", "steamed"]
}
```

## Usage

### Basic Setup

```javascript
import { DietFoodApp } from '../features/DietFoodManagement';

// Use the complete app
<DietFoodApp />;

// Or use individual components
import {
  DietFoodProvider,
  DietFoodDashboard,
} from '../features/DietFoodManagement';

<DietFoodProvider>
  <DietFoodDashboard />
</DietFoodProvider>;
```

### Context API Usage

```javascript
import { useDietFood } from '../features/DietFoodManagement';

const MyComponent = () => {
  const {
    foods, // Filtered foods
    allFoods, // All foods
    searchTerm, // Current search
    setSearchTerm, // Update search
    selectedCategory, // Current category filter
    createFood, // Add new food
    updateFood, // Update existing food
    deleteFood, // Delete food
  } = useDietFood();

  // Use the data and functions
};
```

### Utility Functions

```javascript
import {
  calculateNutritionForQuantity,
  calculateTotalNutrition,
  searchFoods,
  generateFoodSuggestions,
} from '../features/DietFoodManagement/utils/nutritionUtils';

// Calculate nutrition for specific quantity
const nutrition = calculateNutritionForQuantity(food, 150); // 150g

// Search foods with criteria
const results = searchFoods(foods, {
  term: 'chicken',
  category: 'protein',
  minProtein: 20,
  dietaryTags: ['high-protein'],
});

// Get food suggestions for goals
const suggestions = generateFoodSuggestions(foods, {
  targetProtein: 30,
  targetCarbs: 20,
  dietaryRestrictions: ['keto-friendly'],
});
```

## Food Database

### Categories Included

- **Proteins**: Chicken, Salmon, Turkey, Eggs, Greek Yogurt
- **Carbohydrates**: Brown Rice, Sweet Potato, Oatmeal, Quinoa, Blueberries
- **Healthy Fats**: Avocado, Almonds, Olive Oil
- **Vegetables**: Broccoli, Spinach
- **Complete Nutrition Data**: All foods include accurate per-100g nutrition

### Image Sources

- All images are from Unsplash (royalty-free)
- High-quality food photography
- Fallback placeholders for missing images
- Consistent 400x160 aspect ratio for cards

### Accuracy

- Nutrition data sourced from USDA food database
- Accurate macro calculations
- Realistic portion sizes
- Professional dietary classifications

## Integration Points

### Diet Plan Integration

This module can be integrated with diet plan systems:

```javascript
// Select foods for meal planning
const selectedFoods = foods.filter(
  (food) => food.category === 'protein' && food.nutritionPer100g.protein >= 25
);

// Calculate meal totals
const mealNutrition = calculateTotalNutrition(mealFoods);
```

### Recipe Integration

Foods can be used as ingredients in recipes:

```javascript
// Recipe with quantities
const recipe = {
  ingredients: [
    { food: chickenBreast, quantity: 200 },
    { food: broccoli, quantity: 150 },
    { food: oliveoil, quantity: 10 },
  ],
};

const recipeNutrition = calculateTotalNutrition(recipe.ingredients);
```

## Material-UI Components Used

- **Grid v2**: Modern responsive layout
- **Cards**: Food display with images and details
- **Chips**: Category and dietary tags
- **Filtering**: Advanced search and filter controls
- **Navigation**: Drawer-based navigation
- **Icons**: Consistent iconography throughout

## Future Enhancements

- [ ] Food creation/editing modals
- [ ] Image upload functionality
- [ ] Barcode scanning integration
- [ ] Nutritional analysis charts
- [ ] Import/export functionality
- [ ] Recipe builder integration
- [ ] Meal planning integration
- [ ] Shopping list generation

## Dependencies

- React 19.1.1+
- Material-UI 7.3.2+
- Context API for state management
- Unsplash for food images

## License

This module is part of the gym management application and uses publicly available food images from Unsplash.
