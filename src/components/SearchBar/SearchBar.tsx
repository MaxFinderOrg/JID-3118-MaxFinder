import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { StringMappingType } from 'typescript';

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchText);
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
