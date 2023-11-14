import React, { useEffect, useState } from 'react';
import FilterOptions from '../components/SearchBar/FilterOptions.tsx';
import FilterResults from '../components/SearchBar/FilterResults.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import Posts, { getAllPosts } from '../pages/Posts.js';

import { Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import { AlignHorizontalCenter, WidthFull } from '@mui/icons-material';
import { alignProperty } from '@mui/material/styles/cssUtils';

type Filters = {
  [key: string]: boolean;
};

type HomeProps = {
  // Add the setFilteredResults prop to the type definition
  setFilteredResults: React.Dispatch<React.SetStateAction<any[]>>;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    breed: false,
    color: false,
    location: false,
    date: false,
    time: false,
  });

  const [filteredResults, setFilteredResultsState] = useState<any[]>([]); // Add filteredResults state

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterName: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() !== '') {
          // Fetch all posts
        const allPosts = await getAllPosts();

        // Apply filters
        const filteredPosts = allPosts.filter((post) => {
          // Filter based on search query
          //const matchesSearch = post.name.toLowerCase().includes(searchQuery.toLowerCase());
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          const matchesSearch = (
            post.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.breed.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.color.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.size.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.gender.toLowerCase().includes(lowerCaseSearchQuery)
          );

          // Filter based on specific filter (e.g., breed)
          const matchesBreedFilter = filters.breed ? post.breed === filters.breed : true;

          // Add more filter conditions as needed
        
          // Return true if the post passes all filters
          return matchesSearch && matchesBreedFilter;
        });

        // Update the filteredResults state
        setFilteredResultsState(filteredPosts);
          }
      };

  fetchData();
}, [searchQuery, filters]);


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
        {filteredResults.length > 0 && (
          <FilterResults results={filteredResults} />
        )}
      </Paper>
      {/* Pass searchQuery to Posts component */}
    </Container>
  );
};

export default Home;