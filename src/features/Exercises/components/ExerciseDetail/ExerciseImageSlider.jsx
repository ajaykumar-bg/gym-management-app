/**
 * Exercise Image Slider Component
 * Handles image display with navigation, loading states, and error handling
 */

import React, { useState } from 'react';
import { Box, Button, MobileStepper, Skeleton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  validateImageArray,
  getImageSrc,
} from '../../utils/exerciseDetailUtils';

/**
 * Individual image component with loading and error states
 */
const ExerciseImage = ({ src, alt, height = 300 }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  if (imageError || !src) {
    return (
      <Skeleton
        variant='rectangular'
        width='100%'
        height={height}
        sx={{
          borderRadius: 1,
        }}
      />
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {imageLoading && (
        <Skeleton
          variant='rectangular'
          width='100%'
          height={height}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bgcolor: 'grey.50',
            zIndex: 1,
          }}
        />
      )}
      <Box
        component='img'
        loading='lazy'
        sx={{
          height,
          display: 'block',
          width: '100%',
          objectFit: 'cover',
          opacity: imageLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </Box>
  );
};

/**
 * ExerciseImageSlider component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object containing images
 * @param {number} props.activeStep - Current active image index
 * @param {Function} props.onNext - Handler for next button
 * @param {Function} props.onBack - Handler for back button
 * @param {number} props.imageHeight - Height of images (optional, default: 300)
 * @param {boolean} props.showNavigation - Whether to show navigation controls
 * @param {boolean} props.showImageCounter - Whether to show image counter
 * @returns {JSX.Element} ExerciseImageSlider component
 */
const ExerciseImageSlider = ({
  exercise,
  activeStep: propActiveStep,
  onNext: propOnNext,
  onBack: propOnBack,
  imageHeight = 300,
  showNavigation = true,
  showImageCounter = true,
}) => {
  // Internal state for navigation if not controlled externally
  const [internalActiveStep, setInternalActiveStep] = useState(0);

  // Use prop values if provided, otherwise use internal state
  const activeStep =
    propActiveStep !== undefined ? propActiveStep : internalActiveStep;
  const onNext =
    propOnNext ||
    (() => {
      const images = validateImageArray(exercise?.images);
      if (activeStep < images.length - 1) {
        setInternalActiveStep(activeStep + 1);
      }
    });
  const onBack =
    propOnBack ||
    (() => {
      if (activeStep > 0) {
        setInternalActiveStep(activeStep - 1);
      }
    });
  if (!exercise) {
    return (
      <Skeleton
        variant='rectangular'
        width='100%'
        height={imageHeight}
        sx={{ bgcolor: 'grey.100' }}
      />
    );
  }

  const images = validateImageArray(exercise.images);
  const totalImages = images.length;
  const currentImage = images[activeStep] || '';

  // If the image already has PUBLIC_URL (from sanitizeExercise), use it directly
  // Otherwise, use getImageSrc to add PUBLIC_URL
  const currentImageSrc =
    currentImage && currentImage.includes(process.env.PUBLIC_URL || '')
      ? currentImage
      : getImageSrc(currentImage, exercise.name);

  // If no valid images, show skeleton
  if (totalImages === 0) {
    return (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Skeleton
          variant='rectangular'
          width='100%'
          height={imageHeight}
          sx={{ bgcolor: 'grey.100' }}
        />
      </Box>
    );
  }

  const isFirstImage = activeStep === 0;
  const isLastImage = activeStep === totalImages - 1;
  const canNavigate = totalImages > 1;

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
        <ExerciseImage
          src={currentImageSrc}
          alt={`${exercise.name} - image ${activeStep + 1}`}
          height={imageHeight}
        />

        {/* Navigation Stepper */}
        {canNavigate && showNavigation && (
          <MobileStepper
            variant='dots'
            steps={totalImages}
            position='static'
            activeStep={activeStep}
            sx={{
              flexGrow: 1,
              backgroundColor: 'background.paper',
              borderTop: 1,
              borderColor: 'divider',
            }}
            nextButton={
              <Button
                size='small'
                onClick={onNext}
                disabled={isLastImage}
                sx={{
                  minWidth: '64px',
                  textTransform: 'none',
                }}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size='small'
                onClick={onBack}
                disabled={isFirstImage}
                sx={{
                  minWidth: '64px',
                  textTransform: 'none',
                }}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        )}
      </Box>

      {/* Image Counter */}
      {totalImages > 1 && showImageCounter && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {activeStep + 1} of {totalImages}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ExerciseImageSlider);
