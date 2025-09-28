/**
 * Diet Food Management Context
 * Global state management for food database and operations
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import foodDatabase from '../constants/foodDatabase.json';

const DietFoodContext = createContext();

export const DietFoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedDietaryTags, setSelectedDietaryTags] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');

  // Initialize foods data
  useEffect(() => {
    const initializeFoods = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFoods(foodDatabase);
        setError(null);
      } catch (err) {
        setError('Failed to load food database');
        console.error('Error loading foods:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeFoods();
  }, []);

  // Filtered and sorted foods
  const filteredFoods = useMemo(() => {
    let filtered = foods.filter((food) => {
      // Search term filter
      const matchesSearch =
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || food.category === selectedCategory;

      // Subcategory filter
      const matchesSubcategory =
        selectedSubcategory === 'all' ||
        food.subcategory === selectedSubcategory;

      // Dietary tags filter
      const matchesDietaryTags =
        selectedDietaryTags.length === 0 ||
        selectedDietaryTags.some((tag) => food.dietaryTags.includes(tag));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesDietaryTags
      );
    });

    // Apply sorting
    filtered.sort((a, b) => {
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

    return filtered;
  }, [
    foods,
    searchTerm,
    selectedCategory,
    selectedSubcategory,
    selectedDietaryTags,
    sortBy,
  ]);

  // Get unique subcategories for selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') {
      return [...new Set(foods.map((food) => food.subcategory))];
    }
    return [
      ...new Set(
        foods
          .filter((food) => food.category === selectedCategory)
          .map((food) => food.subcategory)
      ),
    ];
  }, [foods, selectedCategory]);

  // CRUD Operations
  const createFood = async (foodData) => {
    try {
      const newFood = {
        ...foodData,
        id: `food${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };

      setFoods((prev) => [...prev, newFood]);
      setIsCreateModalOpen(false);
      return { success: true, food: newFood };
    } catch (error) {
      console.error('Error creating food:', error);
      return { success: false, error: error.message };
    }
  };

  const updateFood = async (foodId, foodData) => {
    try {
      const updatedFood = {
        ...foodData,
        id: foodId,
        updatedAt: new Date().toISOString(),
      };

      setFoods((prev) =>
        prev.map((food) => (food.id === foodId ? updatedFood : food))
      );
      setIsEditModalOpen(false);
      setSelectedFood(null);
      return { success: true, food: updatedFood };
    } catch (error) {
      console.error('Error updating food:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteFood = async (foodId) => {
    try {
      setFoods((prev) => prev.filter((food) => food.id !== foodId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting food:', error);
      return { success: false, error: error.message };
    }
  };

  const toggleFoodStatus = async (foodId) => {
    try {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === foodId
            ? {
                ...food,
                isActive: !food.isActive,
                updatedAt: new Date().toISOString(),
              }
            : food
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Error toggling food status:', error);
      return { success: false, error: error.message };
    }
  };

  // Modal operations
  const openCreateModal = () => {
    setSelectedFood(null);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedFood(null);
  };

  const openEditModal = (food) => {
    setSelectedFood(food);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFood(null);
  };

  // Utility functions
  const getFoodById = (foodId) => {
    return foods.find((food) => food.id === foodId);
  };

  const getFoodsByCategory = (category) => {
    return foods.filter((food) => food.category === category);
  };

  const searchFoodsByName = (name) => {
    return foods.filter((food) =>
      food.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const calculateNutritionForQuantity = (food, quantity) => {
    const multiplier = quantity / 100; // Assuming quantity in grams
    return {
      calories: Math.round(food.nutritionPer100g.calories * multiplier),
      protein: Math.round(food.nutritionPer100g.protein * multiplier * 10) / 10,
      carbs: Math.round(food.nutritionPer100g.carbs * multiplier * 10) / 10,
      fats: Math.round(food.nutritionPer100g.fats * multiplier * 10) / 10,
      fiber: Math.round(food.nutritionPer100g.fiber * multiplier * 10) / 10,
      sugar: Math.round(food.nutritionPer100g.sugar * multiplier * 10) / 10,
      sodium: Math.round(food.nutritionPer100g.sodium * multiplier),
    };
  };

  // Filter operations
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedDietaryTags([]);
    setSortBy('name-asc');
  };

  const contextValue = {
    // Data
    foods: filteredFoods,
    allFoods: foods,
    loading,
    error,
    availableSubcategories,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    selectedFood,

    // Filter states
    searchTerm,
    selectedCategory,
    selectedSubcategory,
    selectedDietaryTags,
    sortBy,

    // CRUD operations
    createFood,
    updateFood,
    deleteFood,
    toggleFoodStatus,

    // Modal operations
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,

    // Filter operations
    setSearchTerm,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedDietaryTags,
    setSortBy,
    clearFilters,

    // Utility functions
    getFoodById,
    getFoodsByCategory,
    searchFoodsByName,
    calculateNutritionForQuantity,
  };

  return (
    <DietFoodContext.Provider value={contextValue}>
      {children}
    </DietFoodContext.Provider>
  );
};

export const useDietFood = () => {
  const context = useContext(DietFoodContext);
  if (!context) {
    throw new Error('useDietFood must be used within a DietFoodProvider');
  }
  return context;
};

export default DietFoodContext;
