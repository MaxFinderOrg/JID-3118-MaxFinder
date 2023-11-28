import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { StringMappingType } from 'typescript';
import { MenuItem } from '@mui/material';

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    onSearch(value);
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
        onClick={() => onSearch(searchText)}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;

