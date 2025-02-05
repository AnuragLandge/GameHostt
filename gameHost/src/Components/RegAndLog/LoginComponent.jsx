import React from 'react';
import { Modal, Box, TextField, Typography, Button, Link } from '@mui/material';
import { useNavigate,} from 'react-router-dom';
import { useRef,useContext } from 'react';
import { AuthContext } from '../../Context/AuthConntext';
import axios from 'axios';

//import { Password } from '@mui/icons-material';

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

const LoginComponent = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  const formRef = useRef(
    {
      uname: '',
      email: '',
      password: '',
    }
  );

  const loginClickHandler = async () => {
    const {uname, email, password} = formRef.current;

    try{

      const response = await axios.post("https://localhost:44395/api/users/login", 
        {
          Username : uname,
          Email: email,
          PasswordHash : password,
        }
      );
      console.log(response.data);

      if(response.status == 200)
      {
        login(response.data);
        handleClose();
        navigate("/addtournament/help");
      }
    }catch (error) {
      console.error('Error during login:', error);
      alert('login failed. Please try again.');
    }
  }

  const handleSignupRedirect = async(e) => {

    navigate('/signup'); 
  };
  const handleChange = (e) =>{
    const {name,value} = e.target;
    formRef.current[name] = value;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="login-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
          Log in
        </Typography>
        <TextField
          fullWidth
          name="uname"
          label="Name"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="Text"
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
        <TextField
          fullWidth
          name="password"
          label="Password"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          type="password"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={loginClickHandler}
          sx={{ mt: 2, p: 1, bgcolor: 'purple' }}
        >
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={handleSignupRedirect}
            sx={{ color: 'purple', textDecoration: 'underline' }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};


export default LoginComponent;
