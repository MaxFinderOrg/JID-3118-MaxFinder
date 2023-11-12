import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

type Result = {
  id: string;
  name: string;
  breed: string;
  color: string;
  gender: string;
};

type FilterResultsProps = {
  results: Result[];
};

const FilterResults: React.FC<FilterResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <div>
      <h2>Search Results</h2>
    <List>
      {results.map((result) => (
        <ListItem key={result.id}>
          <ListItemText primary={result.name} /> 
          {/* You can add more ListItemText elements for additional properties */}
        </ListItem>
      ))}
    </List>
    </div>
  );
};

export default FilterResults;