import React, { useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'; // Import Link from MUI
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

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


  const formRef = useRef({
    uname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formRef.current[name] = value;
  };


  const handleLoginRedirect = () => {
    navigate('/login');
  };

  // Signup Handler
  const signupButtonClickHandler = async (e) => {
    e.preventDefault();

    const { uname, email, password, confirmPassword } = formRef.current;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Send signup data to the backend
      const response = await axios.post("https://localhost:44395/api/Users", {
        username: uname,
        email: email,
        passwordHash: password,
      });

      if (response.status === 201) {
        alert('Signup successful!');
        handleClose(); // Close the modal
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

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

        {/* Email input */}
        <TextField
          fullWidth
          name="uname"
          label="Name"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="text"
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="email"
        />

        {/* Password input */}
        <TextField
          fullWidth
          name="password"
          label="Password"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="password"
        />

        {/* Confirm Password input */}
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="password"
        />

        {/* Signup Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            p: 1,
            bgcolor: 'purple',
          }}
          onClick={signupButtonClickHandler}
        >
          Signup
        </Button>

        {/* Login redirect */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={handleLoginRedirect}
            sx={{ color: 'purple', textDecoration: 'underline' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignupComponent;
