import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const FilterResults = ({ results }) => {
  return (
    <List>
      {results.map((result) => (
        <ListItem key={result.id}>
          <ListItemText primary={result.name} /> {/* Replace with your result rendering logic */}
        </ListItem>
      ))}
    </List>
  );
};

export default FilterResults;