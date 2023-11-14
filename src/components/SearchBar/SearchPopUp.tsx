import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const handleClickOpen = (result: Result) => {
    setSelectedResult(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*if (results.length === 0) {
    return <div>No results found.</div>;
  }*/

  return (
    <div>
      <h2>Search Results</h2>
      <List>
        {results.map((result) => (
          <ListItem key={result.id} button onClick={() => handleClickOpen(result)}>
            <ListItemText primary={result.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Result Details</DialogTitle>
        <DialogContent>
          {selectedResult && (
            <>
              <DialogContentText>
                Name: {selectedResult.name}
                {/* Add other properties as needed */}
              </DialogContentText>
              {/* Add more DialogContentText elements for additional properties */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterResults;