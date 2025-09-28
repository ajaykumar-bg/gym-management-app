/**
 * Diet Food Management Utilities
 * Helper functions for food and nutrition calculations
 */

/**
 * Calculate nutrition values for a specific quantity of food
 * @param {Object} food - Food object with nutritionPer100g
 * @param {number} quantity - Quantity in grams
 * @returns {Object} Calculated nutrition values
 */
export const calculateNutritionForQuantity = (food, quantity) => {
  if (!food || !food.nutritionPer100g || typeof quantity !== 'number') {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    };
  }

  const multiplier = quantity / 100;
  const nutrition = food.nutritionPer100g;

  return {
    calories: Math.round(nutrition.calories * multiplier),
    protein: Math.round(nutrition.protein * multiplier * 10) / 10,
    carbs: Math.round(nutrition.carbs * multiplier * 10) / 10,
    fats: Math.round(nutrition.fats * multiplier * 10) / 10,
    fiber: Math.round((nutrition.fiber || 0) * multiplier * 10) / 10,
    sugar: Math.round((nutrition.sugar || 0) * multiplier * 10) / 10,
    sodium: Math.round((nutrition.sodium || 0) * multiplier),
  };
};

/**
 * Get nutrition totals for multiple foods
 * @param {Array} foods - Array of food objects with quantity
 * @returns {Object} Total nutrition values
 */
export const calculateTotalNutrition = (foods) => {
  if (!Array.isArray(foods) || foods.length === 0) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    };
  }

  return foods.reduce(
    (totals, foodItem) => {
      const nutrition = calculateNutritionForQuantity(
        foodItem.food,
        foodItem.quantity
      );

      return {
        calories: totals.calories + nutrition.calories,
        protein: Math.round((totals.protein + nutrition.protein) * 10) / 10,
        carbs: Math.round((totals.carbs + nutrition.carbs) * 10) / 10,
        fats: Math.round((totals.fats + nutrition.fats) * 10) / 10,
        fiber: Math.round((totals.fiber + nutrition.fiber) * 10) / 10,
        sugar: Math.round((totals.sugar + nutrition.sugar) * 10) / 10,
        sodium: totals.sodium + nutrition.sodium,
      };
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    }
  );
};

/**
 * Calculate macronutrient percentages
 * @param {Object} nutrition - Nutrition object with calories, protein, carbs, fats
 * @returns {Object} Macro percentages
 */
export const calculateMacroPercentages = (nutrition) => {
  if (!nutrition || nutrition.calories === 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }

  const proteinCals = nutrition.protein * 4;
  const carbsCals = nutrition.carbs * 4;
  const fatsCals = nutrition.fats * 9;
  const totalCals = proteinCals + carbsCals + fatsCals;

  if (totalCals === 0) {
    return { protein: 0, carbs: 0, fats: 0 };
  }

  return {
    protein: Math.round((proteinCals / totalCals) * 100),
    carbs: Math.round((carbsCals / totalCals) * 100),
    fats: Math.round((fatsCals / totalCals) * 100),
  };
};

/**
 * Check if a food meets specific dietary criteria
 * @param {Object} food - Food object
 * @param {Object} criteria - Criteria object with thresholds
 * @returns {Object} Boolean flags for each criteria
 */
export const checkDietaryCriteria = (food, criteria = {}) => {
  if (!food || !food.nutritionPer100g) {
    return {};
  }

  const nutrition = food.nutritionPer100g;
  const {
    highProteinThreshold = 15,
    lowCarbThreshold = 10,
    lowCalorieThreshold = 50,
    highFiberThreshold = 5,
  } = criteria;

  return {
    isHighProtein: nutrition.protein >= highProteinThreshold,
    isLowCarb: nutrition.carbs <= lowCarbThreshold,
    isLowCalorie: nutrition.calories <= lowCalorieThreshold,
    isHighFiber: (nutrition.fiber || 0) >= highFiberThreshold,
    isKeto: nutrition.carbs <= 5 && nutrition.fats > nutrition.protein,
    isLowFat: nutrition.fats <= 3,
  };
};

/**
 * Format nutrition value for display
 * @param {number} value - Nutrition value
 * @param {string} unit - Unit (g, mg, cal)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted string
 */
export const formatNutritionValue = (value, unit = '', decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return `0${unit}`;
  }

  if (unit === 'cal' || unit === 'mg') {
    return `${Math.round(value)}${unit}`;
  }

  return `${parseFloat(value.toFixed(decimals))}${unit}`;
};

/**
 * Get food image URL with fallback
 * @param {Object} food - Food object
 * @returns {string|null} Image URL or null for skeleton fallback
 */
export const getFoodImageUrl = (food) => {
  if (!food || !food.image) {
    return null; // Return null to trigger skeleton component
  }

  return food.image;
};

/**
 * Search foods by multiple criteria
 * @param {Array} foods - Array of food objects
 * @param {Object} searchCriteria - Search criteria
 * @returns {Array} Filtered foods
 */
export const searchFoods = (foods, searchCriteria) => {
  if (!Array.isArray(foods)) {
    return [];
  }

  const {
    term = '',
    category = 'all',
    subcategory = 'all',
    dietaryTags = [],
    minProtein = 0,
    maxCalories = Infinity,
    allergenFree = [],
  } = searchCriteria;

  return foods.filter((food) => {
    // Text search
    const matchesText =
      !term ||
      food.name.toLowerCase().includes(term.toLowerCase()) ||
      food.description.toLowerCase().includes(term.toLowerCase()) ||
      food.category.toLowerCase().includes(term.toLowerCase());

    // Category filter
    const matchesCategory = category === 'all' || food.category === category;

    // Subcategory filter
    const matchesSubcategory =
      subcategory === 'all' || food.subcategory === subcategory;

    // Dietary tags filter
    const matchesDietaryTags =
      dietaryTags.length === 0 ||
      dietaryTags.some((tag) => food.dietaryTags.includes(tag));

    // Nutrition filters
    const matchesProtein = food.nutritionPer100g.protein >= minProtein;
    const matchesCalories = food.nutritionPer100g.calories <= maxCalories;

    // Allergen filter
    const matchesAllergens =
      allergenFree.length === 0 ||
      !allergenFree.some((allergen) => food.allergens.includes(allergen));

    return (
      matchesText &&
      matchesCategory &&
      matchesSubcategory &&
      matchesDietaryTags &&
      matchesProtein &&
      matchesCalories &&
      matchesAllergens
    );
  });
};

/**
 * Sort foods by specified criteria
 * @param {Array} foods - Array of food objects
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted foods
 */
export const sortFoods = (foods, sortBy) => {
  if (!Array.isArray(foods)) {
    return [];
  }

  const sortedFoods = [...foods];

  sortedFoods.sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'calories-asc':
        return a.nutritionPer100g.calories - b.nutritionPer100g.calories;
      case 'calories-desc':
        return b.nutritionPer100g.calories - a.nutritionPer100g.calories;
      case 'protein-asc':
        return a.nutritionPer100g.protein - b.nutritionPer100g.protein;
      case 'protein-desc':
        return b.nutritionPer100g.protein - a.nutritionPer100g.protein;
      case 'created-asc':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'created-desc':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  return sortedFoods;
};

/**
 * Generate food suggestions based on nutritional goals
 * @param {Array} foods - Available foods
 * @param {Object} goals - Nutritional goals
 * @returns {Array} Suggested foods
 */
export const generateFoodSuggestions = (foods, goals) => {
  if (!Array.isArray(foods) || !goals) {
    return [];
  }

  const {
    targetProtein = 0,
    targetCarbs = 0,
    targetFats = 0,
    maxCalories = Infinity,
    dietaryRestrictions = [],
  } = goals;

  return foods
    .filter((food) => {
      // Check dietary restrictions
      const meetsRestrictions =
        dietaryRestrictions.length === 0 ||
        dietaryRestrictions.every((restriction) =>
          food.dietaryTags.includes(restriction)
        );

      // Check calorie limit
      const withinCalorieLimit = food.nutritionPer100g.calories <= maxCalories;

      return meetsRestrictions && withinCalorieLimit && food.isActive;
    })
    .map((food) => {
      // Score based on how well it matches goals
      let score = 0;
      const nutrition = food.nutritionPer100g;

      if (targetProtein > 0 && nutrition.protein > 0) {
        score += Math.min(nutrition.protein / targetProtein, 1) * 30;
      }

      if (targetCarbs > 0 && nutrition.carbs > 0) {
        score += Math.min(nutrition.carbs / targetCarbs, 1) * 20;
      }

      if (targetFats > 0 && nutrition.fats > 0) {
        score += Math.min(nutrition.fats / targetFats, 1) * 20;
      }

      // Bonus for being nutrient-dense (high nutrition per calorie)
      const nutrientDensity =
        ((nutrition.protein + nutrition.fiber) / nutrition.calories) * 100;
      score += Math.min(nutrientDensity, 30);

      return { ...food, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

const nutritionUtils = {
  calculateNutritionForQuantity,
  calculateTotalNutrition,
  calculateMacroPercentages,
  checkDietaryCriteria,
  formatNutritionValue,
  getFoodImageUrl,
  searchFoods,
  sortFoods,
  generateFoodSuggestions,
};

export default nutritionUtils;
