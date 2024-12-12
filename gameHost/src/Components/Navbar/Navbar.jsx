import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';

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

const Navbar = () => {
  const [open, setOpen] = useState(false); // State to control modal visibility

  // Functions to handle modal visibility
  const handleOpen = () => setOpen(true); // Opens the modal
  const handleClose = () => setOpen(false); // Closes the modal

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="sticky"
        sx={{
          display: 'flex',
          bgcolor: 'white',
          height: '60px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1301,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              G a m e H o s t
            </Typography>
          </div>
          <div>
            {/* Login Button */}
            <Button
              color="inherit"
              sx={{
                color: 'black',
                padding: '5px',
                '&:hover': {
                  backgroundColor: 'rgb(230, 230, 231)',
                  color: 'black',
                },
                marginRight: '15px',
              }}
            >
              <AccountCircle sx={{ marginRight: '5px' }} />
              Login
            </Button>

            {/* Signup Button */}
            <Button
              color="inherit"
              sx={{
                color: 'white',
                padding: '5px 15px',
                borderRadius: '10px',
                bgcolor: 'purple',
                '&:hover': {
                  backgroundColor: 'rgb(230, 230, 231)',
                  color: 'black',
                },
              }}
              onClick={handleOpen} // Opens the modal
            >
              <PersonAdd sx={{ marginRight: '5px' }} />
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Modal for Signup */}
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
            label="Number"
            variant="outlined"
            margin="normal"
            type="number"
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
            onClick={handleClose} // Closes the modal
          >
            Signup
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
