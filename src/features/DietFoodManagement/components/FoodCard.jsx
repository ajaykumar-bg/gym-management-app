/**
 * Food Card Component
 * Displays individual food item with nutrition info and actions
 */

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
  Avatar,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  VisibilityOff as VisibilityOffIcon,
  LocalFireDepartment as CalorieIcon,
  FitnessCenter as ProteinIcon,
  Grain as CarbIcon,
  Opacity as FatIcon,
} from '@mui/icons-material';
import {
  FOOD_CATEGORY_LABELS,
  FOOD_CATEGORY_COLORS,
  FOOD_SUBCATEGORY_LABELS,
  DIETARY_TAG_LABELS,
  DIETARY_TAG_COLORS,
} from '../constants';

const FoodCard = ({ food, onEdit, onDelete, onToggleStatus }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(food);
  };

  const handleDelete = () => {
    handleMenuClose();
    if (window.confirm(`Are you sure you want to delete "${food.name}"?`)) {
      onDelete(food.id);
    }
  };

  const handleToggleStatus = () => {
    handleMenuClose();
    onToggleStatus(food.id);
  };

  const nutrition = food.nutritionPer100g;

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        opacity: food.isActive ? 1 : 0.6,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Food Image */}
      <CardMedia
        component='img'
        height='160'
        image={food.image}
        alt={food.name}
        sx={{
          objectFit: 'cover',
          backgroundColor: 'grey.100',
        }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x160?text=Food+Image';
        }}
      />

      <CardContent>
        {/* Header with menu */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='h6' component='h3' gutterBottom noWrap>
              {food.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
              <Chip
                label={FOOD_CATEGORY_LABELS[food.category] || food.category}
                color={FOOD_CATEGORY_COLORS[food.category] || 'default'}
                size='small'
              />
              {food.subcategory && (
                <Chip
                  label={
                    FOOD_SUBCATEGORY_LABELS[food.subcategory] ||
                    food.subcategory
                  }
                  variant='outlined'
                  size='small'
                />
              )}
            </Box>
          </Box>

          <IconButton onClick={handleMenuClick} size='small' sx={{ ml: 1 }}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItemComponent onClick={handleEdit}>
              <EditIcon fontSize='small' sx={{ mr: 1 }} />
              Edit Food
            </MenuItemComponent>
            <MenuItemComponent onClick={handleToggleStatus}>
              {food.isActive ? (
                <VisibilityOffIcon fontSize='small' sx={{ mr: 1 }} />
              ) : (
                <ViewIcon fontSize='small' sx={{ mr: 1 }} />
              )}
              {food.isActive ? 'Deactivate' : 'Activate'}
            </MenuItemComponent>
            <MenuItemComponent
              onClick={handleDelete}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon fontSize='small' sx={{ mr: 1 }} />
              Delete Food
            </MenuItemComponent>
          </Menu>
        </Box>

        {/* Description */}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {food.description}
        </Typography>

        {/* Nutrition Summary */}
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={1}>
            <Grid size={3}>
              <Box sx={{ textAlign: 'center' }}>
                <CalorieIcon fontSize='small' color='primary' />
                <Typography variant='caption' display='block' fontWeight='bold'>
                  {nutrition.calories}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  cal
                </Typography>
              </Box>
            </Grid>
            <Grid size={3}>
              <Box sx={{ textAlign: 'center' }}>
                <ProteinIcon fontSize='small' color='error' />
                <Typography variant='caption' display='block' fontWeight='bold'>
                  {nutrition.protein}g
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  protein
                </Typography>
              </Box>
            </Grid>
            <Grid size={3}>
              <Box sx={{ textAlign: 'center' }}>
                <CarbIcon fontSize='small' color='warning' />
                <Typography variant='caption' display='block' fontWeight='bold'>
                  {nutrition.carbs}g
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  carbs
                </Typography>
              </Box>
            </Grid>
            <Grid size={3}>
              <Box sx={{ textAlign: 'center' }}>
                <FatIcon fontSize='small' color='info' />
                <Typography variant='caption' display='block' fontWeight='bold'>
                  {nutrition.fats}g
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  fats
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Dietary Tags */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {food.dietaryTags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={DIETARY_TAG_LABELS[tag] || tag}
                size='small'
                variant='outlined'
                color={DIETARY_TAG_COLORS[tag] || 'default'}
              />
            ))}
            {food.dietaryTags.length > 3 && (
              <Chip
                label={`+${food.dietaryTags.length - 3} more`}
                size='small'
                variant='outlined'
                color='default'
              />
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='caption' color='text.secondary'>
            Per {food.servingSize}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {food.allergens.length > 0 && (
              <Tooltip title={`Allergens: ${food.allergens.join(', ')}`}>
                <Chip
                  label='⚠️'
                  size='small'
                  color='warning'
                  variant='outlined'
                />
              </Tooltip>
            )}
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {food.category.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(FoodCard);
