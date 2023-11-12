import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type SearchBarProps = {
  onSearch: (searchText: string, searchField: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchField, setSearchField] = useState<string>('name'); // Default search field

  const handleSearch = () => {
    onSearch(searchText, searchField);
  };

  return (
    <Box display="flex" gap={1}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
        <option value="name">Name</option>
        <option value="breed">Breed</option>
        <option value="color">Color</option>
        {/* Add other searchable fields here */}
      </select>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
