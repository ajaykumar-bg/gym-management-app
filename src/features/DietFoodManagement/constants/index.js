/**
 * Diet Food Management Constants
 * Categories, labels, colors, and other constants for food management
 */

// Food Categories
export const FOOD_CATEGORIES = {
  PROTEIN: 'protein',
  CARBS: 'carbs',
  FATS: 'fats',
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  DAIRY: 'dairy',
  GRAINS: 'grains',
  NUTS_SEEDS: 'nuts-seeds',
  BEVERAGES: 'beverages',
  SUPPLEMENTS: 'supplements',
};

export const FOOD_CATEGORY_LABELS = {
  [FOOD_CATEGORIES.PROTEIN]: 'Proteins',
  [FOOD_CATEGORIES.CARBS]: 'Carbohydrates',
  [FOOD_CATEGORIES.FATS]: 'Healthy Fats',
  [FOOD_CATEGORIES.VEGETABLES]: 'Vegetables',
  [FOOD_CATEGORIES.FRUITS]: 'Fruits',
  [FOOD_CATEGORIES.DAIRY]: 'Dairy',
  [FOOD_CATEGORIES.GRAINS]: 'Grains',
  [FOOD_CATEGORIES.NUTS_SEEDS]: 'Nuts & Seeds',
  [FOOD_CATEGORIES.BEVERAGES]: 'Beverages',
  [FOOD_CATEGORIES.SUPPLEMENTS]: 'Supplements',
};

export const FOOD_CATEGORY_COLORS = {
  [FOOD_CATEGORIES.PROTEIN]: 'error',
  [FOOD_CATEGORIES.CARBS]: 'warning',
  [FOOD_CATEGORIES.FATS]: 'info',
  [FOOD_CATEGORIES.VEGETABLES]: 'success',
  [FOOD_CATEGORIES.FRUITS]: 'secondary',
  [FOOD_CATEGORIES.DAIRY]: 'primary',
  [FOOD_CATEGORIES.GRAINS]: 'warning',
  [FOOD_CATEGORIES.NUTS_SEEDS]: 'info',
  [FOOD_CATEGORIES.BEVERAGES]: 'info',
  [FOOD_CATEGORIES.SUPPLEMENTS]: 'secondary',
};

// Food Subcategories
export const FOOD_SUBCATEGORIES = {
  // Protein subcategories
  POULTRY: 'poultry',
  FISH: 'fish',
  MEAT: 'meat',
  ORGAN_MEAT: 'organ-meat',
  DAIRY: 'dairy',
  PLANT_PROTEIN: 'plant-protein',
  LEGUMES: 'legumes',
  SUPPLEMENTS: 'supplements',

  // Carb subcategories
  GRAINS: 'grains',
  VEGETABLES: 'vegetables',
  FRUITS: 'fruits',
  SWEETENERS: 'sweeteners',
  CRACKERS: 'crackers',
  CEREALS: 'cereals',

  // Fat subcategories
  OILS: 'oils',
  NUTS: 'nuts',
  SEEDS: 'seeds',
  AVOCADO: 'avocado',
  CHOCOLATE: 'chocolate',
  DAIRY_FATS: 'dairy-fats',

  // Dairy subcategories
  CHEESE: 'cheese',
  MILK: 'milk',
  PLANT_MILK: 'plant-milk',
  YOGURT: 'yogurt',

  // Vegetable subcategories
  LEAFY_GREENS: 'leafy-greens',
  CRUCIFEROUS: 'cruciferous',
  ROOT_VEGETABLES: 'root-vegetables',
  NIGHTSHADES: 'nightshades',
  GREEN_VEGETABLES: 'green-vegetables',
  SQUASH: 'squash',
  FUNGI: 'fungi',
  MIXED: 'mixed',

  // Fruit subcategories
  BERRIES: 'berries',
  CITRUS: 'citrus',
  TROPICAL: 'tropical',
  STONE_FRUITS: 'stone-fruits',
  FRESH: 'fresh',

  // Grains subcategories
  OATS: 'oats',
  PSEUDOCEREAL: 'pseudocereal',
  RICE: 'rice',
  RICE_PRODUCTS: 'rice-products',
  BREAD: 'bread',

  // Nuts & Seeds subcategories
  TREE_NUTS: 'tree-nuts',
  NUT_BUTTER: 'nut-butter',
};

export const FOOD_SUBCATEGORY_LABELS = {
  [FOOD_SUBCATEGORIES.POULTRY]: 'Poultry',
  [FOOD_SUBCATEGORIES.FISH]: 'Fish & Seafood',
  [FOOD_SUBCATEGORIES.MEAT]: 'Meat',
  [FOOD_SUBCATEGORIES.ORGAN_MEAT]: 'Organ Meats',
  [FOOD_SUBCATEGORIES.DAIRY]: 'Dairy Products',
  [FOOD_SUBCATEGORIES.PLANT_PROTEIN]: 'Plant Proteins',
  [FOOD_SUBCATEGORIES.GRAINS]: 'Grains & Cereals',
  [FOOD_SUBCATEGORIES.VEGETABLES]: 'Vegetables',
  [FOOD_SUBCATEGORIES.FRUITS]: 'Fruits',
  [FOOD_SUBCATEGORIES.LEGUMES]: 'Legumes',
  [FOOD_SUBCATEGORIES.OILS]: 'Oils',
  [FOOD_SUBCATEGORIES.NUTS]: 'Nuts',
  [FOOD_SUBCATEGORIES.SEEDS]: 'Seeds',
  [FOOD_SUBCATEGORIES.AVOCADO]: 'Avocado',
  [FOOD_SUBCATEGORIES.LEAFY_GREENS]: 'Leafy Greens',
  [FOOD_SUBCATEGORIES.CRUCIFEROUS]: 'Cruciferous',
  [FOOD_SUBCATEGORIES.ROOT_VEGETABLES]: 'Root Vegetables',
  [FOOD_SUBCATEGORIES.NIGHTSHADES]: 'Nightshades',
  [FOOD_SUBCATEGORIES.GREEN_VEGETABLES]: 'Green Vegetables',
  [FOOD_SUBCATEGORIES.SQUASH]: 'Squash',
  [FOOD_SUBCATEGORIES.FUNGI]: 'Mushrooms',
  [FOOD_SUBCATEGORIES.MIXED]: 'Mixed Vegetables',
  [FOOD_SUBCATEGORIES.BERRIES]: 'Berries',
  [FOOD_SUBCATEGORIES.CITRUS]: 'Citrus',
  [FOOD_SUBCATEGORIES.TROPICAL]: 'Tropical',
  [FOOD_SUBCATEGORIES.STONE_FRUITS]: 'Stone Fruits',
  [FOOD_SUBCATEGORIES.FRESH]: 'Fresh Fruits',
  [FOOD_SUBCATEGORIES.OATS]: 'Oats',
  [FOOD_SUBCATEGORIES.PSEUDOCEREAL]: 'Pseudocereals',
  [FOOD_SUBCATEGORIES.TREE_NUTS]: 'Tree Nuts',
  [FOOD_SUBCATEGORIES.NUT_BUTTER]: 'Nut Butters',
  [FOOD_SUBCATEGORIES.YOGURT]: 'Yogurt',
  [FOOD_SUBCATEGORIES.CHEESE]: 'Cheese',
  [FOOD_SUBCATEGORIES.MILK]: 'Milk',
  [FOOD_SUBCATEGORIES.PLANT_MILK]: 'Plant Milk',
  [FOOD_SUBCATEGORIES.SWEETENERS]: 'Sweeteners',
  [FOOD_SUBCATEGORIES.CHOCOLATE]: 'Chocolate',
  [FOOD_SUBCATEGORIES.DAIRY_FATS]: 'Dairy Fats',
  [FOOD_SUBCATEGORIES.CRACKERS]: 'Crackers',
  [FOOD_SUBCATEGORIES.CEREALS]: 'Cereals',
  [FOOD_SUBCATEGORIES.SEEDS]: 'Seeds',
  [FOOD_SUBCATEGORIES.SUPPLEMENTS]: 'Supplements',
};

// Dietary Tags
export const DIETARY_TAGS = {
  HIGH_PROTEIN: 'high-protein',
  LOW_CARB: 'low-carb',
  KETO_FRIENDLY: 'keto-friendly',
  PALEO: 'paleo',
  VEGAN: 'vegan',
  VEGETARIAN: 'vegetarian',
  GLUTEN_FREE: 'gluten-free',
  DAIRY_FREE: 'dairy-free',
  LOW_CALORIE: 'low-calorie',
  HIGH_FIBER: 'high-fiber',
  ANTIOXIDANT_RICH: 'antioxidant-rich',
  OMEGA_3: 'omega-3',
  HEART_HEALTHY: 'heart-healthy',
  PROBIOTIC: 'probiotic',
  WHOLE_GRAIN: 'whole-grain',
  ORGANIC: 'organic',
};

export const DIETARY_TAG_LABELS = {
  [DIETARY_TAGS.HIGH_PROTEIN]: 'High Protein',
  [DIETARY_TAGS.LOW_CARB]: 'Low Carb',
  [DIETARY_TAGS.KETO_FRIENDLY]: 'Keto Friendly',
  [DIETARY_TAGS.PALEO]: 'Paleo',
  [DIETARY_TAGS.VEGAN]: 'Vegan',
  [DIETARY_TAGS.VEGETARIAN]: 'Vegetarian',
  [DIETARY_TAGS.GLUTEN_FREE]: 'Gluten Free',
  [DIETARY_TAGS.DAIRY_FREE]: 'Dairy Free',
  [DIETARY_TAGS.LOW_CALORIE]: 'Low Calorie',
  [DIETARY_TAGS.HIGH_FIBER]: 'High Fiber',
  [DIETARY_TAGS.ANTIOXIDANT_RICH]: 'Antioxidant Rich',
  [DIETARY_TAGS.OMEGA_3]: 'Omega-3',
  [DIETARY_TAGS.HEART_HEALTHY]: 'Heart Healthy',
  [DIETARY_TAGS.PROBIOTIC]: 'Probiotic',
  [DIETARY_TAGS.WHOLE_GRAIN]: 'Whole Grain',
  [DIETARY_TAGS.ORGANIC]: 'Organic',
};

export const DIETARY_TAG_COLORS = {
  [DIETARY_TAGS.HIGH_PROTEIN]: 'error',
  [DIETARY_TAGS.LOW_CARB]: 'success',
  [DIETARY_TAGS.KETO_FRIENDLY]: 'info',
  [DIETARY_TAGS.PALEO]: 'warning',
  [DIETARY_TAGS.VEGAN]: 'success',
  [DIETARY_TAGS.VEGETARIAN]: 'success',
  [DIETARY_TAGS.GLUTEN_FREE]: 'primary',
  [DIETARY_TAGS.DAIRY_FREE]: 'primary',
  [DIETARY_TAGS.LOW_CALORIE]: 'success',
  [DIETARY_TAGS.HIGH_FIBER]: 'secondary',
  [DIETARY_TAGS.ANTIOXIDANT_RICH]: 'secondary',
  [DIETARY_TAGS.OMEGA_3]: 'info',
  [DIETARY_TAGS.HEART_HEALTHY]: 'error',
  [DIETARY_TAGS.PROBIOTIC]: 'primary',
  [DIETARY_TAGS.WHOLE_GRAIN]: 'warning',
  [DIETARY_TAGS.ORGANIC]: 'success',
};

// Common Allergens
export const ALLERGENS = {
  DAIRY: 'dairy',
  EGGS: 'eggs',
  FISH: 'fish',
  SHELLFISH: 'shellfish',
  TREE_NUTS: 'tree-nuts',
  PEANUTS: 'peanuts',
  WHEAT: 'wheat',
  SOY: 'soy',
  SESAME: 'sesame',
  GLUTEN: 'gluten',
};

export const ALLERGEN_LABELS = {
  [ALLERGENS.DAIRY]: 'Dairy',
  [ALLERGENS.EGGS]: 'Eggs',
  [ALLERGENS.FISH]: 'Fish',
  [ALLERGENS.SHELLFISH]: 'Shellfish',
  [ALLERGENS.TREE_NUTS]: 'Tree Nuts',
  [ALLERGENS.PEANUTS]: 'Peanuts',
  [ALLERGENS.WHEAT]: 'Wheat',
  [ALLERGENS.SOY]: 'Soy',
  [ALLERGENS.SESAME]: 'Sesame',
  [ALLERGENS.GLUTEN]: 'Gluten',
};

// Preparation Methods
export const PREPARATION_METHODS = {
  RAW: 'raw',
  BOILED: 'boiled',
  STEAMED: 'steamed',
  GRILLED: 'grilled',
  BAKED: 'baked',
  ROASTED: 'roasted',
  FRIED: 'fried',
  SAUTEED: 'sauteed',
  POACHED: 'poached',
  SCRAMBLED: 'scrambled',
};

export const PREPARATION_METHOD_LABELS = {
  [PREPARATION_METHODS.RAW]: 'Raw',
  [PREPARATION_METHODS.BOILED]: 'Boiled',
  [PREPARATION_METHODS.STEAMED]: 'Steamed',
  [PREPARATION_METHODS.GRILLED]: 'Grilled',
  [PREPARATION_METHODS.BAKED]: 'Baked',
  [PREPARATION_METHODS.ROASTED]: 'Roasted',
  [PREPARATION_METHODS.FRIED]: 'Fried',
  [PREPARATION_METHODS.SAUTEED]: 'Sautéed',
  [PREPARATION_METHODS.POACHED]: 'Poached',
  [PREPARATION_METHODS.SCRAMBLED]: 'Scrambled',
};

// Sort Options
export const SORT_OPTIONS = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  CALORIES_ASC: 'calories-asc',
  CALORIES_DESC: 'calories-desc',
  PROTEIN_ASC: 'protein-asc',
  PROTEIN_DESC: 'protein-desc',
  CREATED_ASC: 'created-asc',
  CREATED_DESC: 'created-desc',
};

export const SORT_OPTION_LABELS = {
  [SORT_OPTIONS.NAME_ASC]: 'Name A-Z',
  [SORT_OPTIONS.NAME_DESC]: 'Name Z-A',
  [SORT_OPTIONS.CALORIES_ASC]: 'Calories Low-High',
  [SORT_OPTIONS.CALORIES_DESC]: 'Calories High-Low',
  [SORT_OPTIONS.PROTEIN_ASC]: 'Protein Low-High',
  [SORT_OPTIONS.PROTEIN_DESC]: 'Protein High-Low',
  [SORT_OPTIONS.CREATED_ASC]: 'Oldest First',
  [SORT_OPTIONS.CREATED_DESC]: 'Newest First',
};

// Macro thresholds for categorization
export const MACRO_THRESHOLDS = {
  HIGH_PROTEIN: 15, // grams per 100g
  LOW_CARB: 10, // grams per 100g
  HIGH_FIBER: 5, // grams per 100g
  LOW_CALORIE: 50, // calories per 100g
};

const constants = {
  FOOD_CATEGORIES,
  FOOD_CATEGORY_LABELS,
  FOOD_CATEGORY_COLORS,
  FOOD_SUBCATEGORIES,
  FOOD_SUBCATEGORY_LABELS,
  DIETARY_TAGS,
  DIETARY_TAG_LABELS,
  DIETARY_TAG_COLORS,
  ALLERGENS,
  ALLERGEN_LABELS,
  PREPARATION_METHODS,
  PREPARATION_METHOD_LABELS,
  SORT_OPTIONS,
  SORT_OPTION_LABELS,
  MACRO_THRESHOLDS,
};

export default constants;
