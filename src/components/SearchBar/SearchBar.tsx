import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <>
      <TextField
        label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </>
  );
};

export default SearchBar;