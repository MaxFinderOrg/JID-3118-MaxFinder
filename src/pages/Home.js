import React, { useState } from 'react';
import FilterOptions from '../components/SearchBar/FilterOptions.tsx';
import FilterResults from '../components/SearchBar/FilterResults.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { AlignHorizontalCenter, WidthFull } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';

type Filters = {
  [key: string]: boolean;
};

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<Filters>({
    breed: false,
    color: false,
    location: false,
    date: false,
    time: false,
  });
  const [results, setResults] = useState<any[]>([]); // Store your filtered results here

  const handleSearch = (/*text*/) => {
    // Implement your filtering logic here based on searchText and filters
    // Update the results state
  };

  const handleFilterChange = (filterName: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={2} sx={{ padding: '10px', marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection:'row', alignItems: 'center'}}>
        <Grid container spacing={2} >
          <Grid item marginLeft={2} marginTop={1} sx={{ width: '53%'}}>
            <SearchBar onSearch={handleSearch} />
          </Grid>
          <Grid item sx={{ width: '45%' }} >
            <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
          </Grid>
        </Grid>
        <FilterResults results={results} />
      </Paper>
    </Container>
  );
};

export default Home;