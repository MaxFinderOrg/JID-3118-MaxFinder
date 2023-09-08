import Button from '@mui/material/Button';

const NavBarButton = (props: any) => {
  return (
    <Button
      variant="contained"
      disableElevation={true}
      sx={{ my: 2, color: 'white', display: 'block' }}
      {...props}
    />
  )
}

export default NavBarButton;