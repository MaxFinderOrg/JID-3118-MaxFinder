import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Adopt = () => {
    const [showPost, setShowPost] = React.useState(false);
    const [viewPostId, setViewPostId] = React.useState(-1);

    // these (rows/columns) should come from props
    const rows1 = [
        { id: 1, name: 'Rocky', image: '', type: 'Cat', breed: 'American Shorthair', furColor: 'Brown', age: '6 months', location: 'Atlanta, GA' },
        { id: 2, name: 'Dolly', image: '', type: 'Dog', breed: 'Labrador Retriever', furColor: 'Black', age: '2 years', location:'Athens, GA' },
        ].sort((a, b) => (a.name < b.name ? -1 : 1));;

    const columns1: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1 },
        {
            field: 'image',
            headerName: 'Picture',
            width: 150,
            flex: 1,
        },
        { field: 'type', headerName: 'Type', flex: 1 },
        { field: 'breed', headerName: 'Breed', flex: 1 },
        { field: 'furColor', headerName: 'Fur Color', flex: 1 },
        { field: 'age', headerName: 'Age', flex: 1},
        { field: 'location', headerName: 'Age', flex: 1},
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: ({ row }: Partial<GridRowParams>) =>
            <Button variant="outlined" onClick={() => viewPost(row)}>
                View
            </Button>,
        
        },
    ];

    const viewPost = (row: any) => {
        setViewPostId(row.id);
        setShowPost(true);
    };

      return (
        <>
        {showPost && 
        <div>
            <Dialog
                open={showPost}
                onClose={() => setShowPost(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"View Post Details and add comments"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        This is post {viewPostId}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => setShowPost(false)} autoFocus>
                        Close
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
        }
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' , marginTop: '50px'}}>
            <div className='md-3' style={{marginLeft:'20px'}}><h1>Available Pets for Adoption</h1></div>

            <DataGrid
                rows={rows1}
                columns={columns1}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 5,
                    },
                },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
            />
        </Card>
        </>
        
      );

    }

export default Adopt;