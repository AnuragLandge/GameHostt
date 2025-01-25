import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


// Styles for the Modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const SignupComponent = ({ open, handleClose }) => {

  const navigate = useNavigate();
  const handleSignup=()=>{

    navigate('/addtournament');
  }
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="signup-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          Signup Form
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          type="password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            p: 1,
            bgcolor: 'purple',
          }}
          onClick={handleSignup} // Closes the modal
        >
          Signup
        </Button>
      </Box>
    </Modal>
  );
};

export default SignupComponent;
