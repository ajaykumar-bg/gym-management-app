import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
  Fab,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add, Search, FilterList } from '@mui/icons-material';
import {
  PackageCard,
  PackageForm,
  SubscriptionCard,
  MembershipStats,
} from './components';
import {
  MOCK_MEMBERSHIP_PACKAGES,
  MOCK_MEMBER_SUBSCRIPTIONS,
  MEMBERSHIP_TYPES,
  SUBSCRIPTION_STATUS,
  PACKAGE_STATUS,
} from './membershipPackage.constants';
import {
  filterPackagesByType,
  filterPackagesByStatus,
  filterSubscriptionsByStatus,
  searchPackages,
  searchSubscriptions,
  sortPackages,
} from './membershipPackage.utils';

const MembershipPackageManagement = ({
  userRole = { canManagePackages: true },
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [currentTab, setCurrentTab] = useState(0);
  const [packages, setPackages] = useState(MOCK_MEMBERSHIP_PACKAGES);
  const [subscriptions, setSubscriptions] = useState(MOCK_MEMBER_SUBSCRIPTIONS);

  // Form state
  const [packageFormOpen, setPackageFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [subscriptionStatusFilter, setSubscriptionStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // UI state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    type: null,
  });

  // Computed values
  const filteredPackages = useMemo(() => {
    let filtered = packages;

    if (searchTerm) {
      filtered = searchPackages(filtered, searchTerm);
    }

    if (typeFilter) {
      filtered = filterPackagesByType(filtered, typeFilter);
    }

    if (statusFilter) {
      filtered = filterPackagesByStatus(filtered, statusFilter);
    }

    return sortPackages(filtered, sortBy);
  }, [packages, searchTerm, typeFilter, statusFilter, sortBy]);

  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions;

    if (searchTerm) {
      filtered = searchSubscriptions(filtered, searchTerm);
    }

    if (subscriptionStatusFilter) {
      filtered = filterSubscriptionsByStatus(
        filtered,
        subscriptionStatusFilter
      );
    }

    return filtered;
  }, [subscriptions, searchTerm, subscriptionStatusFilter]);

  // Package management functions
  const handleCreatePackage = () => {
    setEditingPackage(null);
    setPackageFormOpen(true);
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setPackageFormOpen(true);
  };

  const handlePackageSubmit = (packageData) => {
    if (editingPackage) {
      // Update existing package
      setPackages((prev) =>
        prev.map((pkg) => (pkg.id === packageData.id ? packageData : pkg))
      );
      showSnackbar('Package updated successfully!');
    } else {
      // Create new package
      setPackages((prev) => [...prev, packageData]);
      showSnackbar('Package created successfully!');
    }
    setPackageFormOpen(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = (packageId) => {
    setDeleteDialog({ open: true, id: packageId, type: 'package' });
  };

  const confirmDelete = () => {
    if (deleteDialog.type === 'package') {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== deleteDialog.id));
      showSnackbar('Package deleted successfully!');
    } else if (deleteDialog.type === 'subscription') {
      setSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== deleteDialog.id)
      );
      showSnackbar('Subscription deleted successfully!');
    }
    setDeleteDialog({ open: false, id: null, type: null });
  };

  // Subscription management functions
  const handleDeleteSubscription = (subscriptionId) => {
    setDeleteDialog({ open: true, id: subscriptionId, type: 'subscription' });
  };

  const handleUpdateSubscriptionStatus = (subscriptionId, statusUpdate) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId ? { ...sub, ...statusUpdate } : sub
      )
    );
    showSnackbar('Subscription status updated successfully!');
  };

  // Utility functions
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getMemberName = (memberId) => {
    // In a real app, this would fetch from member data
    return `Member ${memberId}`;
  };

  const getSubscriptionCount = (packageId) => {
    return subscriptions.filter((sub) => sub.packageId === packageId).length;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setStatusFilter('');
    setSubscriptionStatusFilter('');
    setSortBy('name');
  };

  const tabLabels = ['Packages', 'Subscriptions', 'Statistics'];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' fontWeight='bold'>
          Membership & Package Management
        </Typography>
        {!isMobile && userRole.canManagePackages && currentTab === 0 && (
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleCreatePackage}
            size='large'
          >
            Create Package
          </Button>
        )}
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons='auto'
        >
          {tabLabels.map((label, index) => (
            <Tab key={index} label={label} />
          ))}
        </Tabs>
      </Card>

      {/* Filters and Search */}
      {currentTab !== 2 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems='center'>
              {/* Search */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label='Search'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={
                    currentTab === 0
                      ? 'Search packages...'
                      : 'Search subscriptions...'
                  }
                />
              </Grid>

              {/* Package-specific filters */}
              {currentTab === 0 && (
                <>
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        label='Type'
                      >
                        <MenuItem value=''>All Types</MenuItem>
                        {Object.entries(MEMBERSHIP_TYPES).map(
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
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label='Status'
                      >
                        <MenuItem value=''>All Status</MenuItem>
                        {Object.entries(PACKAGE_STATUS).map(([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Sort By</InputLabel>
                      <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        label='Sort By'
                      >
                        <MenuItem value='name'>Name</MenuItem>
                        <MenuItem value='price'>Price</MenuItem>
                        <MenuItem value='createdDate'>Date Created</MenuItem>
                        <MenuItem value='popularity'>Popularity</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              {/* Subscription-specific filters */}
              {currentTab === 1 && (
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={subscriptionStatusFilter}
                      onChange={(e) =>
                        setSubscriptionStatusFilter(e.target.value)
                      }
                      label='Status'
                    >
                      <MenuItem value=''>All Status</MenuItem>
                      {Object.entries(SUBSCRIPTION_STATUS).map(
                        ([key, value]) => (
                          <MenuItem key={key} value={key}>
                            {value}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<FilterList />}
                  onClick={resetFilters}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>

            {/* Active Filters Display */}
            {(typeFilter ||
              statusFilter ||
              subscriptionStatusFilter ||
              searchTerm) && (
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {searchTerm && (
                  <Chip
                    label={`Search: ${searchTerm}`}
                    onDelete={() => setSearchTerm('')}
                    size='small'
                  />
                )}
                {typeFilter && (
                  <Chip
                    label={`Type: ${MEMBERSHIP_TYPES[typeFilter]}`}
                    onDelete={() => setTypeFilter('')}
                    size='small'
                  />
                )}
                {statusFilter && (
                  <Chip
                    label={`Status: ${PACKAGE_STATUS[statusFilter]}`}
                    onDelete={() => setStatusFilter('')}
                    size='small'
                  />
                )}
                {subscriptionStatusFilter && (
                  <Chip
                    label={`Status: ${SUBSCRIPTION_STATUS[subscriptionStatusFilter]}`}
                    onDelete={() => setSubscriptionStatusFilter('')}
                    size='small'
                  />
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Content based on selected tab */}
      {currentTab === 0 && (
        <>
          {/* Packages Grid */}
          <Grid container spacing={3}>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={pkg.id}>
                  <PackageCard
                    package={pkg}
                    onEdit={
                      userRole.canManagePackages ? handleEditPackage : undefined
                    }
                    onDelete={
                      userRole.canManagePackages
                        ? handleDeletePackage
                        : undefined
                    }
                    canManage={userRole.canManagePackages}
                    subscriptionCount={getSubscriptionCount(pkg.id)}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Typography
                      variant='h6'
                      color='text.secondary'
                      gutterBottom
                    >
                      No packages found
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {searchTerm || typeFilter || statusFilter
                        ? 'Try adjusting your search or filters'
                        : 'Create your first membership package to get started'}
                    </Typography>
                    {userRole.canManagePackages &&
                      !searchTerm &&
                      !typeFilter &&
                      !statusFilter && (
                        <Button
                          variant='contained'
                          startIcon={<Add />}
                          onClick={handleCreatePackage}
                          sx={{ mt: 2 }}
                        >
                          Create Package
                        </Button>
                      )}
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {currentTab === 1 && (
        <>
          {/* Subscriptions Grid */}
          <Grid container spacing={3}>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={subscription.id}>
                  <SubscriptionCard
                    subscription={subscription}
                    memberName={getMemberName(subscription.memberId)}
                    onDelete={
                      userRole.canManagePackages
                        ? handleDeleteSubscription
                        : undefined
                    }
                    onUpdateStatus={
                      userRole.canManagePackages
                        ? handleUpdateSubscriptionStatus
                        : undefined
                    }
                    canManage={userRole.canManagePackages}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Typography
                      variant='h6'
                      color='text.secondary'
                      gutterBottom
                    >
                      No subscriptions found
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {searchTerm || subscriptionStatusFilter
                        ? 'Try adjusting your search or filters'
                        : 'No member subscriptions available'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {currentTab === 2 && (
        <MembershipStats
          packages={packages}
          subscriptions={subscriptions}
          onRefresh={() => {
            // In a real app, this would refresh data from the server
            showSnackbar('Statistics refreshed!');
          }}
        />
      )}

      {/* Mobile FAB for creating packages */}
      {isMobile && userRole.canManagePackages && currentTab === 0 && (
        <Fab
          color='primary'
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleCreatePackage}
        >
          <Add />
        </Fab>
      )}

      {/* Package Form Dialog */}
      <PackageForm
        open={packageFormOpen}
        onClose={() => {
          setPackageFormOpen(false);
          setEditingPackage(null);
        }}
        package={editingPackage}
        onSubmit={handlePackageSubmit}
        mode={editingPackage ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: null, type: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {deleteDialog.type}? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({ open: false, id: null, type: null })
            }
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant='filled'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MembershipPackageManagement;
