# Equipment Management Module

## Overview

The Equipment Management module provides comprehensive equipment tracking, maintenance scheduling, and inventory management for gym facilities.

## Features

### Equipment Tracking

- **Comprehensive Equipment Database**: Track all gym equipment with detailed information
- **Equipment Categories**: Organize equipment by type (Cardio, Strength, Free Weights, etc.)
- **Status Management**: Monitor equipment status (Operational, Maintenance, Repair, Out of Order)
- **Location Tracking**: Track equipment location within the facility

### Maintenance Management

- **Scheduled Maintenance**: Track maintenance schedules (Weekly, Monthly, Quarterly, etc.)
- **Maintenance History**: Record of all maintenance activities
- **Maintenance Alerts**: Notifications for upcoming and overdue maintenance
- **Maintenance Calendar**: Visual calendar view of scheduled maintenance

### Equipment Information

- **Purchase Details**: Purchase date, price, and warranty information
- **Manufacturer & Model**: Track manufacturer, model, and serial numbers
- **Equipment Age**: Automatic calculation of equipment age
- **Warranty Status**: Track warranty expiry and validity

### Analytics & Reporting

- **Equipment Statistics**: Overview of equipment status distribution
- **Maintenance Analytics**: Track maintenance frequency and costs
- **Equipment Utilization**: Monitor equipment usage patterns
- **Warranty Alerts**: Notifications for expiring warranties

### Equipment Operations

- **Add Equipment**: Register new equipment with complete details
- **Edit Equipment**: Update equipment information and status
- **Equipment Search**: Search by name, manufacturer, model, or location
- **Equipment Filtering**: Filter by category, status, location
- **Equipment Sorting**: Sort by various criteria

## Components

### Main Components

- **EquipmentManagement**: Main component with equipment list and management
- **Equipment Statistics**: Dashboard with equipment overview
- **Equipment Form**: Add/edit equipment dialog
- **Equipment Filters**: Category and status filtering

### Data Management

- **Constants**: Equipment categories, statuses, and mock data
- **Utils**: Helper functions for calculations and data processing

## Equipment Categories

1. **Cardio Equipment**

   - Treadmills, Ellipticals, Bikes, Rowers

2. **Strength Training**

   - Weight machines, Cable systems, Multi-stations

3. **Free Weights**

   - Barbells, Dumbbells, Weight plates

4. **Functional Training**

   - TRX, Kettlebells, Battle ropes, Suspension trainers

5. **Flexibility & Recovery**

   - Massage guns, Foam rollers, Stretching equipment

6. **Aquatic Equipment**
   - Pool equipment, Water weights

## Equipment Status Options

- **Operational**: Equipment is working and available for use
- **Under Maintenance**: Equipment is undergoing scheduled maintenance
- **Under Repair**: Equipment is broken and being repaired
- **Out of Order**: Equipment is not functional and cannot be used
- **Retired**: Equipment has been permanently removed from service

## Key Features Implementation

### Equipment Statistics Dashboard

- Total equipment count
- Status distribution (Operational, Maintenance, Repair, Out of Order)
- Visual overview with color-coded metrics

### Advanced Filtering & Search

- Filter by equipment category
- Filter by equipment status
- Search by name, manufacturer, model, or location
- Real-time filtering updates

### Maintenance Tracking

- Maintenance schedule tracking
- Last maintenance date recording
- Next maintenance date calculation
- Maintenance alert system

### Equipment Form Management

- Comprehensive equipment registration
- Equipment information editing
- Input validation and error handling
- Automatic data calculation (age, next maintenance, etc.)

## Integration Points

### User Permissions

- **Admin**: Full equipment management access
- **Trainer**: View equipment status and report issues
- **Member**: View equipment availability

### Navigation Integration

- Added to main navigation sidebar
- Role-based access control
- Route configuration for equipment management

### Data Structure

```javascript
Equipment Object:
{
  id: 'EQ001',
  name: 'Life Fitness Treadmill X9i',
  category: 'cardio',
  manufacturer: 'Life Fitness',
  model: 'X9i',
  serialNumber: 'LF2024001',
  purchaseDate: '2024-01-15',
  purchasePrice: 8500,
  warrantyExpiry: '2027-01-15',
  status: 'operational',
  maintenanceSchedule: 'monthly',
  location: 'Cardio Zone A',
  lastMaintenance: '2024-01-20',
  nextMaintenance: '2024-02-20',
  notes: 'Additional notes'
}
```

## Future Enhancements

1. **QR Code Integration**: QR codes for easy equipment identification
2. **Mobile App**: Mobile equipment management for trainers
3. **IoT Integration**: Connect with smart equipment for automatic monitoring
4. **Maintenance Scheduling**: Advanced scheduling with technician assignment
5. **Cost Tracking**: Track maintenance and repair costs
6. **Equipment History**: Detailed usage and incident history
7. **Predictive Maintenance**: AI-powered maintenance prediction
8. **Equipment Booking**: Allow members to reserve equipment

## Usage Guidelines

### Adding New Equipment

1. Click "Add Equipment" button
2. Fill in basic equipment information
3. Set category and initial status
4. Configure maintenance schedule
5. Add location and notes
6. Save equipment record

### Managing Equipment Status

1. Locate equipment in the table
2. Click edit button for the equipment
3. Update status as needed
4. Add notes about status change
5. Update maintenance information if needed

### Maintenance Scheduling

- Set appropriate maintenance schedule based on equipment type
- Monitor maintenance alerts in the dashboard
- Update maintenance dates after completion
- Use notes field for maintenance details

## Technical Implementation

### Dependencies

- React 19.1.1
- Material-UI 7.3.2
- React Router for navigation
- Date handling utilities

### File Structure

```
EquipmentManagement/
├── EquipmentManagement.js    # Main component
├── constants.js              # Equipment data and constants
├── utils.js                  # Helper functions
├── index.js                  # Module export
└── README.md                 # This documentation
```

### State Management

- Local state management with React hooks
- Equipment data stored in component state
- Form data management with controlled components
- Filter and search state management

### Error Handling

- Form validation for required fields
- Error handling for data operations
- User feedback for successful operations
- Graceful handling of missing data

This Equipment Management module provides a solid foundation for gym equipment tracking and maintenance, with room for future enhancements based on specific gym needs and requirements.
