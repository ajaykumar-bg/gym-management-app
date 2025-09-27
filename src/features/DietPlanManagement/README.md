# Diet Plan Management Module

A comprehensive diet plan management system for gym trainers to create, assign, and track member diet plans with detailed progress monitoring and analytics.

## 🌟 Features

### Core Functionality

- **Diet Plan Creation**: Create customized diet plans with multiple meals and detailed nutrition information
- **Member Assignment**: Assign diet plans to gym members with flexible scheduling
- **Progress Tracking**: Monitor adherence, weight changes, and overall progress
- **Analytics & Reporting**: Comprehensive insights and performance metrics
- **Real-time Dashboard**: Overview of all diet plan activities and key metrics

### Key Components

#### 1. **DietPlanDashboard**

- Key performance metrics (active plans, assignments, adherence rates)
- Interactive charts showing plan type distribution and trends
- Recent assignments overview with quick actions
- Visual progress indicators and status summaries

#### 2. **DietPlanList**

- Grid view of all diet plans with filtering and search
- Plan cards showing nutrition summary, meal count, and duration
- Quick actions: Edit, Delete, Assign to Member
- Filter by plan type, status, and search functionality

#### 3. **AssignmentList**

- Comprehensive table view of all diet plan assignments
- Status tracking: Active, Completed, Paused
- Progress bars showing time completion and adherence rates
- Member information with contact details
- Bulk operations and filtering options

#### 4. **AnalyticsView**

- Advanced analytics with multiple chart types
- Plan type and goal distribution analysis
- Adherence rate distribution and trends
- Monthly progress tracking
- Top performers leaderboard
- Comprehensive metrics and KPIs

#### 5. **CreatePlanModal**

- Step-by-step diet plan creation wizard
- Multiple meal configuration with detailed macros
- Nutrition calculator and daily summary
- Goal selection and plan categorization
- Form validation and error handling

#### 6. **AssignPlanModal**

- Member and plan selection interface
- Assignment duration and scheduling
- Notes and special instructions
- Assignment summary and confirmation
- Search and filter capabilities

#### 7. **ProgressModal**

- Detailed progress tracking interface
- Multiple tabs: Overview, Nutrition, Charts, Notes
- Interactive progress charts and trends
- Meal-by-meal adherence tracking
- Editable progress updates
- Member health metrics integration

## 🏗️ Architecture

### Directory Structure

```
src/features/DietPlanManagement/
├── components/           # React components
├── context/             # State management
├── constants/           # Application constants
├── utils/              # Utility functions
├── data/               # Mock data files
└── index.js            # Main exports
```

### State Management

- **React Context API**: Centralized state management
- **Custom Hooks**: `useDietPlan` for accessing context
- **CRUD Operations**: Create, Read, Update, Delete functionality
- **Real-time Updates**: Optimistic updates with error handling

### Data Models

#### Diet Plan

```javascript
{
  id: string,
  name: string,
  description: string,
  type: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'athletic',
  goals: string[],
  duration: number,
  meals: Meal[],
  isActive: boolean,
  createdBy: string,
  createdDate: string
}
```

#### Assignment

```javascript
{
  id: string,
  memberId: string,
  memberName: string,
  dietPlanId: string,
  startDate: string,
  endDate: string,
  status: 'active' | 'completed' | 'paused',
  progress: Progress,
  notes: string,
  assignedDate: string
}
```

#### Progress Tracking

```javascript
{
  adherence: number,
  currentWeight: number,
  weightChange: number,
  lastUpdated: string,
  notes: string,
  mealTracking: object
}
```

## 🛠️ Technical Requirements

### Dependencies

- **React 19.1.1**: Modern React with hooks and context
- **Material-UI 7.3.2**: Component library with new Grid syntax
- **@mui/x-charts 8.11.1**: Data visualization components
- **@mui/icons-material**: Icon library

### Key Features Used

- **New MUI Grid Syntax**: Uses `size` prop instead of deprecated item prop
- **Responsive Design**: Mobile-first approach with breakpoint system
- **TypeScript-like PropTypes**: Comprehensive prop validation
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Memoized calculations and optimized re-renders

## 📊 Analytics & Charts

### Chart Types

- **Pie Charts**: Plan type and status distribution
- **Bar Charts**: Adherence rate distribution
- **Line Charts**: Progress trends and monthly analytics
- **Progress Bars**: Time completion and adherence tracking

### Metrics Tracked

- **Adherence Rates**: Individual and average adherence percentages
- **Completion Rates**: Plan completion statistics
- **Weight Progress**: Member weight change tracking
- **Plan Effectiveness**: Success rate analysis
- **Trainer Performance**: Assignment and completion metrics

## 🎯 Usage

### Integration

```javascript
import { DietPlanApp, DietPlanProvider } from './features/DietPlanManagement';

// Wrap your app with the provider
<DietPlanProvider>
  <DietPlanApp />
</DietPlanProvider>;
```

### Context Usage

```javascript
import { useDietPlan } from './features/DietPlanManagement';

const MyComponent = () => {
  const {
    dietPlans,
    assignments,
    createDietPlan,
    assignDietPlan,
    updateProgress,
  } = useDietPlan();

  // Your component logic
};
```

### Utility Functions

```javascript
import {
  calculateBMR,
  calculateTDEE,
  formatPercentage,
  getAdherenceColor,
} from './features/DietPlanManagement';
```

## 🔧 Customization

### Theme Integration

The module uses Material-UI theming and can be customized through:

- Color palette modifications
- Typography adjustments
- Component style overrides
- Breakpoint customization

### Constants Configuration

All application constants are centralized in `/constants/index.js`:

- Diet plan types and labels
- Status colors and labels
- Validation rules
- Chart configurations

### Mock Data

Development uses comprehensive mock data:

- Realistic diet plans with varied nutrition profiles
- Member profiles with health metrics
- Assignment history with progress tracking
- Sample analytics data for charts

## 📱 Mobile Responsiveness

### Breakpoint Strategy

- **xs (0-600px)**: Single column layout, compressed cards
- **sm (600-960px)**: Two column layout, condensed tables
- **md (960-1280px)**: Three column layout, full tables
- **lg (1280px+)**: Four column layout, expanded views

### Mobile Optimizations

- Touch-friendly interfaces
- Swipe gestures for cards
- Collapsible sections
- Optimized chart rendering
- Responsive typography scaling

## 🚀 Future Enhancements

### Planned Features

- **Real-time Notifications**: Push notifications for progress updates
- **Mobile App Integration**: Native mobile app support
- **Advanced Analytics**: Machine learning insights
- **Social Features**: Member community and sharing
- **Integration APIs**: Third-party fitness app connections
- **Meal Planning AI**: Automated meal recommendations
- **Photo Progress Tracking**: Visual progress monitoring
- **Nutrition Database**: Comprehensive food database integration

### Technical Improvements

- **Performance Optimization**: Virtual scrolling for large datasets
- **Offline Support**: Progressive Web App capabilities
- **Advanced Caching**: Optimistic UI updates
- **Data Export**: PDF and Excel report generation
- **Multi-language Support**: Internationalization
- **Accessibility Enhancements**: Screen reader optimization

## 🤝 Contributing

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Navigate to the Diet Plan Management module

### Code Standards

- Follow React best practices
- Use Material-UI components consistently
- Implement responsive design patterns
- Add comprehensive error handling
- Write descriptive component documentation

### Testing Strategy

- Unit tests for utility functions
- Integration tests for context operations
- Component testing with React Testing Library
- End-to-end testing for user workflows
- Performance testing for large datasets

---

**Built with modern React patterns and Material-UI for a seamless user experience** 💪
