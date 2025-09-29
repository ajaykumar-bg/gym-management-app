import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Button,
  Chip,
  Avatar,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  Star,
  Schedule,
  Group,
} from '@mui/icons-material';
import { useUser } from '../../../context/UserContext';
import {
  getSpecializationsText,
  getTrainerStatusColor,
  calculateCapacityUtilization,
  getCapacityColor,
  filterTrainers,
  sortTrainers,
} from '../trainer.utils';
import {
  TRAINER_SPECIALIZATIONS,
  TRAINER_STATUS,
  EXPERIENCE_LEVELS,
} from '../trainer.constants';

const TrainerList = ({
  trainers,
  onViewTrainer,
  onEditTrainer,
  onDeleteTrainer,
  onAddTrainer,
}) => {
  const { user, permissions } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filters = {
    search: searchTerm,
    status: statusFilter,
    specialization: specializationFilter,
    experience: experienceFilter,
  };

  const filteredTrainers = filterTrainers(trainers, filters);
  const sortedTrainers = sortTrainers(filteredTrainers, sortBy, sortOrder);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (trainer) => {
    if (
      window.confirm(`Are you sure you want to delete trainer ${trainer.name}?`)
    ) {
      onDeleteTrainer(trainer.id);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant='h5' component='h2'>
              Trainers ({sortedTrainers.length})
            </Typography>
            {permissions.canManageTrainers && (
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={onAddTrainer}
              >
                Add Trainer
              </Button>
            )}
          </Box>

          {/* Filters */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                placeholder='Search trainers...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
                size='small'
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label='Status'
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value='all'>All Status</MenuItem>
                  {Object.entries(TRAINER_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={specializationFilter}
                  label='Specialization'
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                >
                  <MenuItem value='all'>All Specializations</MenuItem>
                  {Object.entries(TRAINER_SPECIALIZATIONS).map(
                    ([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Experience</InputLabel>
                <Select
                  value={experienceFilter}
                  label='Experience'
                  onChange={(e) => setExperienceFilter(e.target.value)}
                >
                  <MenuItem value='all'>All Levels</MenuItem>
                  {Object.entries(EXPERIENCE_LEVELS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label='Sort By'
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value='name'>Name</MenuItem>
                  <MenuItem value='experience'>Experience</MenuItem>
                  <MenuItem value='rating'>Rating</MenuItem>
                  <MenuItem value='clients'>Clients</MenuItem>
                  <MenuItem value='capacity'>Capacity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Trainer
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'experience'}
                    direction={sortBy === 'experience' ? sortOrder : 'asc'}
                    onClick={() => handleSort('experience')}
                  >
                    Experience
                  </TableSortLabel>
                </TableCell>
                <TableCell>Specializations</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'rating'}
                    direction={sortBy === 'rating' ? sortOrder : 'asc'}
                    onClick={() => handleSort('rating')}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'clients'}
                    direction={sortBy === 'clients' ? sortOrder : 'asc'}
                    onClick={() => handleSort('clients')}
                  >
                    Clients
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'capacity'}
                    direction={sortBy === 'capacity' ? sortOrder : 'asc'}
                    onClick={() => handleSort('capacity')}
                  >
                    Capacity
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTrainers.map((trainer) => {
                const capacityUtilization = calculateCapacityUtilization(
                  trainer.currentClients,
                  trainer.maxClients
                );

                return (
                  <TableRow key={trainer.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>{trainer.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant='subtitle2' fontWeight='bold'>
                            {trainer.name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {trainer.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>
                        {trainer.yearsAtGym} years at gym
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {EXPERIENCE_LEVELS[trainer.experience]}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2' noWrap>
                        {getSpecializationsText(
                          trainer.specializations.slice(0, 2)
                        )}
                        {trainer.specializations.length > 2 && (
                          <Typography variant='caption' color='text.secondary'>
                            {' '}
                            +{trainer.specializations.length - 2} more
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star
                          sx={{ color: 'warning.main', fontSize: 16, mr: 0.5 }}
                        />
                        <Typography variant='body2'>
                          {trainer.averageRating.toFixed(1)}
                        </Typography>
                      </Box>
                      <Typography variant='caption' color='text.secondary'>
                        {trainer.totalSessions} sessions
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>
                        {trainer.currentClients}/{trainer.maxClients}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={`${capacityUtilization}%`}
                        color={getCapacityColor(capacityUtilization)}
                        size='small'
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={TRAINER_STATUS[trainer.status]}
                        color={getTrainerStatusColor(trainer.status)}
                        size='small'
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title='View Details'>
                          <IconButton
                            size='small'
                            onClick={() => onViewTrainer(trainer)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>

                        {permissions.canManageTrainers && (
                          <>
                            <Tooltip title='Edit'>
                              <IconButton
                                size='small'
                                onClick={() => onEditTrainer(trainer)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>

                            {user.role === 'admin' && (
                              <Tooltip title='Delete'>
                                <IconButton
                                  size='small'
                                  color='error'
                                  onClick={() => handleDelete(trainer)}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        )}

                        <Tooltip title='Schedule'>
                          <IconButton size='small'>
                            <Schedule />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='Clients'>
                          <IconButton size='small'>
                            <Group />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {sortedTrainers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant='h6' color='text.secondary'>
              No trainers found
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Try adjusting your filters or add a new trainer
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainerList;
