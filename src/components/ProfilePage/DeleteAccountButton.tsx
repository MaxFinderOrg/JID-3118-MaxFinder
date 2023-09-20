
import Button from '@mui/material/Button';



function deleteProfile() {
    console.log("profile deleted");
}

export default function DeleteAccountButton() {
    return (
        <Button variant="contained" className="delete button"
        onClick={() => {  
            const confirmBox = window.confirm( "Are you sure you want to delete your account?")
            if (confirmBox === true) {
                deleteProfile()
            }}}> Delete Account</Button>
    );
  }
  
  
  
  