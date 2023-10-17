import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Chip, Grid, Popover, TextField } from '@mui/material';

type FilterOptionsProps = {
  filters: { [key: string]: boolean };
  onFilterChange: (filterName: string) => void;
};

type FilterOption = {
  name: string;
  label: string;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({ filters, onFilterChange }) => {

  const [popups, setPopups] = useState<{ [key: string]: boolean }>({});
  const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null);
  const [filterCriteria, setFilterCriteria] = useState<{ [key: string]: string[] }>({});

  const filterOptions: { [key: string]: FilterOption } = {
    breed: { name: 'breed', label: 'Breed' },
    color: { name: 'color', label: 'Color' },
    location: { name: 'location', label: 'Location' },
    date: { name: 'date', label: 'Date' },
    time: { name: 'time', label: 'Time' },
  };

  const handleFilterChange = (filterName: string) => {
    if (filters[filterName]) {
      // If the checkbox was checked, close the popup and uncheck the checkbox
      setPopups((prevPopups) => ({
        ...prevPopups,
        [filterName]: false,
      }));
      setSelectedFilter(null);
    } else {
      // If the checkbox was unchecked, open the popup and check the checkbox
      setPopups((prevPopups) => ({
        ...prevPopups,
        [filterName]: true,
      }));
      setSelectedFilter(filterOptions[filterName]);
    }
  };

  const handlePopupConfirm = (event: React.MouseEvent<HTMLButtonElement>, filterName: string) => {
    if (selectedFilter && filterCriteria[selectedFilter.name]) {
      // Combine the selected filter and criteria and store them in your state
      const filterString = `${filterCriteria[selectedFilter.name]}`;
      
      // Push the filter and criteria as an array to the filterCriteria object
      setFilterCriteria((prevFilterCriteria) => ({
        ...prevFilterCriteria,
        [selectedFilter.name]: [filterString],
      }));
    }
  
    // Close the popup
    setPopups((prevPopups) => ({
      ...prevPopups,
      [filterName]: false,
    }));
  
    setSelectedFilter(null);
  };
  

  const handleFilterCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFilterCriteria((prevFilterCriteria) => {
      // Clone the previous state
      const updatedFilterCriteria = { ...prevFilterCriteria };
  
      // Check if the filter name already exists
      if (updatedFilterCriteria[name]) {
        // Update the existing filter name criteria
        updatedFilterCriteria[name] = [value];
      } else {
        // Create a new filter name criteria
        updatedFilterCriteria[name] = [value];
      }
  
      return updatedFilterCriteria;
    });
  };

  const handlePopupClose = (filterName: string) => {
    // Remove the criteria and prevent adding a chip
    setFilterCriteria((prevFilterCriteria) => ({
      ...prevFilterCriteria,
      [filterName]: [], // Set the filter criteria for this filter name as an empty array
    }));
  
    // Close the popup
    setPopups((prevPopups) => ({
      ...prevPopups,
      [filterName]: false,
    }));
  };

  return (
    <Grid container alignItems="center">
      <Typography variant='subtitle1' padding={2}>
        Filter:
      </Typography>
      {Object.keys(filterOptions).map((filterName) => (
        <Grid item key={filterName}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[filterName]}
                onChange={() => handleFilterChange(filterName)}
                color="primary"
                size={'small'}
              />
            }
            label={filterOptions[filterName].label}
            sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
          />
          <Popover
            open={popups[filterName] || false}
            onClose={() => handlePopupClose(filterName)}
            anchorEl={popups[filterName] ? document.getElementById(filterName) : null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box p={2} position="relative">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderRadius: '50%',
                  minWidth: 'auto',
                  width: '20px',
                  height: '20px',
                  padding: '0',
                  margin: '5px'
                }}
                onClick={() => handlePopupClose(filterName)}
              >
                X
              </Button>
              <Typography>{filterOptions[filterName].label}</Typography>
              <TextField
                label={`Enter ${filterOptions[filterName].label} criteria`}
                variant="outlined"
                size="small"
                fullWidth
                name={filterName}
                value={filterCriteria[filterName] || ''}
                onChange={handleFilterCriteriaChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  top: '5px'
                }}
                onClick={(event) => handlePopupConfirm(event, filterName)}
              >
                Confirm
              </Button>
            </Box>
          </Popover>
        </Grid>
      ))}
      <Box mt={2} style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {Object.keys(filterCriteria).map((filterName) => (
            filterCriteria[filterName].map((criteria, index) => (
              <Chip
                key={`${filterName}:${index}`}
                label={`${filterOptions[filterName].label}: ${criteria}`}
                variant="outlined"
                sx={{margin: '3px'}}
              />
            ))
        ))}
      </Box>
    </Grid>
  );
              };  

export default FilterOptions;