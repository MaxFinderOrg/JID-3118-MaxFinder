import React, { useEffect, useState } from 'react';
import FilterOptions from '../components/SearchBar/FilterOptions.tsx';
import FilterResults from '../components/SearchBar/FilterResults.tsx';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import Posts, { getAllPosts } from '../pages/Posts.js';
import PropTypes from 'prop-types';

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
  const [allPosts, setAllPosts] = useState<any[]>([]); // State to store all posts

  useEffect(() => {
    const fetchData = async () => {
      const allPostsData = await getAllPosts();
      setAllPosts(allPostsData);
    };

    fetchData();
  }, []); // Fetch all posts when the component mounts


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

        const searchWords = searchQuery.toLowerCase().split(' ');

        // Apply filters
        const filteredPosts = allPosts.filter((post) => {
          // Filter based on search query
          //const matchesSearch = post.name.toLowerCase().includes(searchQuery.toLowerCase());
          //const lowerCaseSearchQuery = searchQuery.toLowerCase();
          //const searchWords = lowerCaseSearchQuery.split(' ');
          return searchWords.some((word) =>
          [post.name, post.breed, post.color, post.size, post.gender]
            .some((field) => field.toLowerCase().includes(word))
        );
      });
          /*
          const matchesSearch = (
            post.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.breed.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.color.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.size.toLowerCase().includes(lowerCaseSearchQuery) ||
            post.gender.toLowerCase().includes(lowerCaseSearchQuery)
          );
          */

          // Filter based on specific filter (e.g., breed)
          //const matchesBreedFilter = filters.breed ? post.breed === filters.breed : true;

          // Add more filter conditions as needed
        
          // Return true if the post passes all filters
          //return matchesSearch;// && matchesBreedFilter;
        //});

        // Update the filteredResults state
        setFilteredResultsState(filteredPosts);
          } else {
            // If search query is empty, show all posts
      setFilteredResultsState(allPosts);
          }
      };

  fetchData();
}, [searchQuery, filters]);


  return (
    <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CssBaseline />
      <Paper elevation={2} sx={{ padding: '10px', marginTop: '30px', marginBottom: '0px', alignItems: 'center', width:'80%', maxWidth: '600px'}}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <SearchBar onSearch={handleSearch} />
          </Grid>
        </Grid>
      </Paper>
      {/* Pass searchQuery to Posts component */}
      <Posts searchQuery={searchQuery} filteredResults={filteredResults} />
    </Container>
  );
};

export default Home;