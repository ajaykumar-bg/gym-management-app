# Exercise Management Module

A comprehensive, modular exercise library system built with React and Material-UI, designed for gym management applications. This module provides a complete solution for browsing, filtering, and managing exercise data with optimized performance for large datasets.

## 🚀 Features

- **Advanced Filtering**: Multi-criteria filtering with search, muscle group, equipment, category, force, and difficulty filters
- **Pagination**: Optimized pagination system with configurable page sizes (6-96 exercises per page)
- **Responsive Design**: Mobile-first design with responsive grid layouts
- **Performance Optimized**: Handles 1,800+ exercises efficiently with lazy loading and memoization
- **Modular Architecture**: Clean separation of concerns with reusable components, hooks, and utilities
- **Filter Management**: Visual filter chips with individual removal capabilities
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 📁 Project Structure

```
src/features/Exercises/
├── components/
│   ├── Exercise/                 # Exercise card sub-components
│   │   ├── ExerciseImage.jsx     # Image component with loading states
│   │   ├── ExerciseContent.jsx   # Content display component
│   │   ├── ExerciseChips.jsx     # Attribute chips component
│   │   ├── ExerciseActions.jsx   # Action buttons component
│   │   └── index.js              # Component exports
│   ├── ExerciseApp.jsx           # Main application component
│   ├── ExerciseList.jsx          # Exercise list with pagination
│   ├── ExerciseListInfo.js       # Pagination info display
│   ├── ExerciseDetail.jsx        # Detailed exercise view
│   └── SearchFilters.jsx         # Filtering interface
├── hooks/
│   ├── useExerciseFilters.js     # Filter state management hook
│   ├── usePagination.js          # Pagination logic hook
│   └── index.js                  # Hook exports
├── utils/
│   ├── filterUtils.js            # Filtering utility functions
│   ├── paginationUtils.js        # Pagination utility functions
│   ├── exerciseUtils.js          # Exercise data utilities
│   └── index.js                  # Utility exports
├── constants/
│   ├── exercises.constant.js     # Exercise data and filter options
│   ├── ui.constants.js           # UI-related constants
│   ├── exercise.constants.js     # Exercise structure constants
│   └── index.js                  # Constants exports
└── README.md                     # This file
```

## 🔧 Components

### Core Components

#### `ExerciseApp`

Main container component that orchestrates the entire exercise management system.

**Props:**

- None (standalone component)

**Features:**

- State management for filters and pagination
- Exercise data loading and processing
- Modal management for exercise details

#### `ExerciseList`

Displays paginated list of exercises with controls.

**Props:**

```jsx
{
  exercises: Array,           // Array of exercise objects
  openExerciseDetails: Function, // Handler for opening exercise details
  clearFilters: Function,     // Handler for clearing all filters
  totalUnfilteredCount: Number // Total number of unfiltered exercises
}
```

#### `SearchFilters`

Comprehensive filtering interface with active filter management.

**Props:**

```jsx
{
  filters: Object,              // Current filter state
  handleSearch: Function,       // Search query handler
  handleFilterChange: Function, // Filter change handler
  clearFilters: Function,       // Clear all filters handler
  onClearSpecificFilter: Function // Clear specific filter handler (optional)
}
```

### Exercise Card Components

#### `Exercise`

Main exercise card component (refactored into sub-components).

**Props:**

```jsx
{
  exercise: Object,             // Exercise data object
  onOpenDetails: Function,      // Details handler
  onToggleFavorite: Function,   // Favorite toggle handler (optional)
  onShare: Function,            // Share handler (optional)
  isFavorite: Boolean,          // Favorite state (optional)
  showFavorite: Boolean,        // Show favorite button (optional)
  showShare: Boolean,           // Show share button (optional)
  gridProps: Object,            // Additional Grid props (optional)
  cardProps: Object             // Additional Card props (optional)
}
```

#### `ExerciseImage`

Handles exercise image display with loading states and error handling.

**Props:**

```jsx
{
  exercise: Object,    // Exercise object
  alt: String,         // Alt text (optional)
  height: String       // Image height (optional, default: '200px')
}
```

#### `ExerciseContent`

Displays exercise name, description, and attribute chips.

**Props:**

```jsx
{
  exercise: Object,           // Exercise object
  descriptionLength: Number,  // Max description length (optional)
  showChips: Boolean         // Show attribute chips (optional)
}
```

#### `ExerciseChips`

Renders exercise attribute chips with tooltips.

**Props:**

```jsx
{
  exercise: Object,        // Exercise object
  showAll: Boolean,        // Show all chips (optional)
  visibleChips: Array      // Array of chip types to show (optional)
}
```

#### `ExerciseActions`

Action buttons for exercise cards.

**Props:**

```jsx
{
  exercise: Object,             // Exercise object
  onViewDetails: Function,      // View details handler
  onToggleFavorite: Function,   // Favorite toggle handler (optional)
  onShare: Function,            // Share handler (optional)
  isFavorite: Boolean,          // Favorite state (optional)
  showFavorite: Boolean,        // Show favorite button (optional)
  showShare: Boolean,           // Show share button (optional)
  variant: String               // Button variant (optional)
}
```

## 🪝 Custom Hooks

### `useExerciseFilters(exercises)`

Manages exercise filtering state and logic.

**Parameters:**

- `exercises` (Array): Array of all exercises

**Returns:**

```jsx
{
  // State
  filters: Object,              // Current filter state
  filteredExercises: Array,     // Filtered exercise array
  activeFiltersCount: Number,   // Count of active filters
  activeFilterDetails: Array,   // Active filter details for display
  hasActiveFilters: Boolean,    // Whether any filters are active
  isFiltered: Boolean,          // Whether results are filtered

  // Handlers
  handleSearch: Function,       // Search handler
  handleFilterChange: Function, // Filter change handler
  clearAllFilters: Function,    // Clear all filters
  clearSpecificFilter: Function, // Clear specific filter
  updateFilter: Function,       // Update specific filter
  resetFilters: Function,       // Reset to initial state
  setFilters: Function         // Set filters directly
}
```

### `usePagination(items, options)`

Manages pagination state and logic.

**Parameters:**

- `items` (Array): Array of items to paginate
- `options` (Object): Pagination options

**Options:**

```jsx
{
  initialPage: Number,          // Initial page (default: 1)
  initialPageSize: Number,      // Initial page size (default: 12)
  totalUnfilteredCount: Number  // Total unfiltered count (default: 0)
}
```

**Returns:**

```jsx
{
  // Current state
  currentPage: Number,          // Current page number
  pageSize: Number,             // Current page size
  currentPageItems: Array,      // Items for current page

  // Pagination info
  totalPages: Number,           // Total number of pages
  startIndex: Number,           // Start index for current page
  endIndex: Number,             // End index for current page
  hasNextPage: Boolean,         // Whether next page exists
  hasPrevPage: Boolean,         // Whether previous page exists
  isFiltered: Boolean,          // Whether items are filtered
  displayText: String,          // Formatted display text

  // Navigation
  goToPage: Function,           // Go to specific page
  goToNextPage: Function,       // Go to next page
  goToPrevPage: Function,       // Go to previous page
  goToFirstPage: Function,      // Go to first page
  goToLastPage: Function,       // Go to last page
  changePageSize: Function,     // Change page size

  // Utilities
  resetPagination: Function,    // Reset to initial state
  availablePageSizes: Array     // Available page size options
}
```

## 🛠️ Utility Functions

### Filter Utils (`filterUtils.js`)

#### `applyAllFilters(exercises, filters)`

Applies all active filters to exercise array.

#### `countActiveFilters(filters)`

Counts the number of active filters.

#### `getActiveFilterDetails(filters)`

Gets detailed information about active filters for display.

#### `getFilterLabel(filterType, value)`

Gets display label for filter value.

### Pagination Utils (`paginationUtils.js`)

#### `calculatePagination(totalItems, currentPage, pageSize)`

Calculates pagination information.

#### `getPaginatedItems(items, currentPage, pageSize)`

Returns paginated subset of items.

#### `validatePaginationParams(currentPage, pageSize, totalItems)`

Validates and corrects pagination parameters.

#### `getPaginationDisplayText(paginationInfo, isFiltered, totalUnfilteredItems)`

Generates pagination display text.

### Exercise Utils (`exerciseUtils.js`)

#### `validateExercise(exercise)`

Validates exercise object structure.

#### `sanitizeExercise(exercise)`

Sanitizes exercise data for safe display.

#### `formatExerciseName(name)`

Formats exercise name for consistent display.

#### `truncateDescription(description, maxLength)`

Truncates description to specified length.

#### `sortExercises(exercises, sortBy, sortOrder)`

Sorts exercises by various criteria.

## 📊 Constants

### UI Constants (`ui.constants.js`)

- `PAGINATION_CONFIG`: Pagination settings
- `CARD_CONFIG`: Card styling configuration
- `CHIP_COLORS`: Color mapping for attribute chips
- `TOOLTIP_CONFIG`: Tooltip configuration
- `SEARCH_CONFIG`: Search functionality settings

### Exercise Constants (`exercise.constants.js`)

- `REQUIRED_EXERCISE_FIELDS`: Required exercise data fields
- `DIFFICULTY_MAPPING`: Difficulty level mappings
- `EQUIPMENT_CATEGORIES`: Equipment categorization

### Exercise Data Constants (`exercises.constant.js`)

- Filter option arrays (muscles, equipment, categories, etc.)
- Mock exercise data
- Dropdown options for filters

## 🎯 Usage Examples

### Basic Usage

```jsx
import { ExerciseApp } from '../features/Exercises';

function App() {
  return (
    <div>
      <ExerciseApp />
    </div>
  );
}
```

### Using Custom Hooks

```jsx
import { useExerciseFilters, usePagination } from '../features/Exercises/hooks';

function CustomExerciseList({ exercises }) {
  const {
    filters,
    filteredExercises,
    handleSearch,
    handleFilterChange,
    clearAllFilters,
  } = useExerciseFilters(exercises);

  const {
    currentPageItems,
    currentPage,
    totalPages,
    goToPage,
    changePageSize,
  } = usePagination(filteredExercises);

  // Your component logic here
}
```

### Using Individual Components

```jsx
import {
  Exercise,
  SearchFilters,
  ExerciseImage,
  ExerciseChips,
} from '../features/Exercises';

function CustomExercisePage() {
  const handleExerciseDetails = (exercise) => {
    // Handle exercise details
  };

  return (
    <div>
      <SearchFilters
        filters={filters}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        clearFilters={clearAllFilters}
      />

      {exercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          onOpenDetails={handleExerciseDetails}
          showFavorite={true}
          showShare={true}
        />
      ))}
    </div>
  );
}
```

## 🎨 Customization

### Styling

The module uses Material-UI's `sx` prop and theme system. You can customize:

- Card hover effects via `CARD_CONFIG`
- Chip colors via `CHIP_COLORS`
- Pagination sizes via `PAGINATION_CONFIG`

### Adding New Filters

1. Add filter option to appropriate constant file
2. Update `filterUtils.js` with new filter function
3. Add filter to `SearchFilters` component
4. Update filter state in hooks

### Custom Exercise Attributes

1. Update `exercise.constants.js` with new fields
2. Add validation in `exerciseUtils.js`
3. Update `ExerciseChips` component for display
4. Add filtering logic if needed

## 🔄 Performance Optimizations

- **React.memo**: All components are memoized to prevent unnecessary re-renders
- **useMemo**: Expensive calculations are memoized
- **Lazy Loading**: Images load lazily to improve initial page load
- **Pagination**: Large datasets are paginated for optimal performance
- **Debounced Search**: Search is debounced to reduce API calls
- **Efficient Filtering**: Filtering algorithms are optimized for large datasets

## 📱 Responsive Design

The module is designed mobile-first with responsive breakpoints:

- **xs (0-600px)**: 1 column layout
- **sm (600-960px)**: 2 column layout
- **md+ (960px+)**: 3 column layout

Filter controls adapt to screen size:

- Mobile: Stacked filters
- Tablet: 2-column filter grid
- Desktop: Optimized multi-column layout

## 🧪 Testing Considerations

When testing this module, consider:

1. **Filter functionality**: Test all filter combinations
2. **Pagination**: Test page navigation and size changes
3. **Search**: Test search across different exercise attributes
4. **Responsive behavior**: Test on various screen sizes
5. **Performance**: Test with large exercise datasets
6. **Error handling**: Test with missing/invalid exercise data

## 🚀 Future Enhancements

- **Virtual scrolling** for very large datasets
- **Advanced sorting** options
- **Exercise comparison** feature
- **Workout plan integration**
- **Exercise analytics** and statistics
- **Offline support** with service workers
- **Exercise video integration**
- **User exercise ratings** and reviews

## 📄 License

This module is part of the gym management application and follows the same licensing terms.

## 🤝 Contributing

When contributing to this module:

1. Follow the established folder structure
2. Add comprehensive JSDoc comments
3. Include prop validation for components
4. Write unit tests for utility functions
5. Update this README for new features
6. Follow Material-UI design patterns
7. Ensure accessibility compliance

---

**Built with ❤️ for modern gym management**
