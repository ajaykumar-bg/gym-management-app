import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Description as ExcelIcon,
  Code as JsonIcon,
} from '@mui/icons-material';
import { useReporting } from '../context/ReportingContext';
import { EXPORT_FORMATS } from '../constants/reportingConstants';
import { exportToCSV, exportToJSON } from '../utils/reportingUtils';

const ReportExport = () => {
  const {
    dialogs,
    closeDialog,
    exportSettings,
    setExportSettings,
    reportData,
    currentReport,
    reportTemplates,
  } = useReporting();

  const [selectedColumns, setSelectedColumns] = useState([]);

  React.useEffect(() => {
    if (currentReport && reportTemplates[currentReport.type]) {
      const availableFields = reportTemplates[currentReport.type].fields || [];
      setSelectedColumns(availableFields);
      setExportSettings({ columns: availableFields });
    }
  }, [currentReport, reportTemplates, setExportSettings]);

  const handleClose = () => {
    closeDialog('export');
  };

  const handleFormatChange = (event) => {
    setExportSettings({ format: event.target.value });
  };

  const handleIncludeChartsChange = (event) => {
    setExportSettings({ includeCharts: event.target.checked });
  };

  const handleColumnToggle = (column) => {
    const updatedColumns = selectedColumns.includes(column)
      ? selectedColumns.filter((col) => col !== column)
      : [...selectedColumns, column];

    setSelectedColumns(updatedColumns);
    setExportSettings({ columns: updatedColumns });
  };

  const handleExport = async () => {
    if (!reportData.length || !currentReport) {
      return;
    }

    const filename = `${currentReport.title.replace(/\s+/g, '_')}_${
      new Date().toISOString().split('T')[0]
    }`;

    try {
      switch (exportSettings.format) {
        case EXPORT_FORMATS.CSV:
          const csvColumns = selectedColumns.map((field) => ({
            field,
            label:
              field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, ' $1'),
          }));
          exportToCSV(reportData, csvColumns, `${filename}.csv`);
          break;

        case EXPORT_FORMATS.JSON:
          const filteredData = reportData.map((row) =>
            selectedColumns.reduce((obj, col) => {
              obj[col] = row[col];
              return obj;
            }, {})
          );
          exportToJSON(filteredData, `${filename}.json`);
          break;

        case EXPORT_FORMATS.PDF:
          // PDF export would require a library like jsPDF
          alert('PDF export coming soon!');
          break;

        case EXPORT_FORMATS.EXCEL:
          // Excel export would require a library like xlsx
          alert('Excel export coming soon!');
          break;

        default:
          break;
      }

      handleClose();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const formatOptions = [
    {
      value: EXPORT_FORMATS.CSV,
      label: 'CSV (Comma Separated Values)',
      icon: <CsvIcon />,
      description: 'Compatible with Excel and other spreadsheet applications',
    },
    {
      value: EXPORT_FORMATS.JSON,
      label: 'JSON (JavaScript Object Notation)',
      icon: <JsonIcon />,
      description: 'Machine-readable format for data interchange',
    },
    {
      value: EXPORT_FORMATS.PDF,
      label: 'PDF (Portable Document Format)',
      icon: <PdfIcon />,
      description: 'Professional document format with charts and formatting',
    },
    {
      value: EXPORT_FORMATS.EXCEL,
      label: 'Excel (.xlsx)',
      icon: <ExcelIcon />,
      description: 'Microsoft Excel format with advanced formatting',
    },
  ];

  const availableColumns =
    currentReport && reportTemplates[currentReport.type]
      ? reportTemplates[currentReport.type].fields || []
      : [];

  return (
    <Dialog open={dialogs.export} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>Export Report</DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Report Info */}
          {currentReport && (
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant='h6' gutterBottom>
                {currentReport.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {reportData.length} records • Generated on{' '}
                {new Date(currentReport.generatedAt).toLocaleDateString()}
              </Typography>
            </Box>
          )}

          {/* Format Selection */}
          <Typography variant='h6' gutterBottom>
            Export Format
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Format</InputLabel>
            <Select
              value={exportSettings.format}
              label='Select Format'
              onChange={handleFormatChange}
            >
              {formatOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Format Description */}
          {(() => {
            const selectedFormat = formatOptions.find(
              (opt) => opt.value === exportSettings.format
            );
            return selectedFormat ? (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: 'info.light',
                  borderRadius: 1,
                  color: 'info.dark',
                }}
              >
                <Typography variant='body2'>
                  {selectedFormat.description}
                </Typography>
              </Box>
            ) : null;
          })()}

          <Divider sx={{ my: 3 }} />

          {/* Column Selection */}
          <Typography variant='h6' gutterBottom>
            Select Columns to Export
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant='outlined'
              size='small'
              onClick={() => setSelectedColumns(availableColumns)}
              sx={{ mr: 1 }}
            >
              Select All
            </Button>
            <Button
              variant='outlined'
              size='small'
              onClick={() => setSelectedColumns([])}
            >
              Clear All
            </Button>
          </Box>

          <List dense>
            {availableColumns.map((column) => (
              <ListItem
                key={column}
                button
                onClick={() => handleColumnToggle(column)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={selectedColumns.includes(column)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    column.charAt(0).toUpperCase() +
                    column.slice(1).replace(/([A-Z])/g, ' $1')
                  }
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Additional Options */}
          <Typography variant='h6' gutterBottom>
            Additional Options
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={exportSettings.includeCharts}
                onChange={handleIncludeChartsChange}
                disabled={
                  exportSettings.format === EXPORT_FORMATS.CSV ||
                  exportSettings.format === EXPORT_FORMATS.JSON
                }
              />
            }
            label='Include charts and visualizations'
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant='contained'
          onClick={handleExport}
          disabled={!reportData.length || selectedColumns.length === 0}
        >
          Export ({selectedColumns.length} columns)
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportExport;
