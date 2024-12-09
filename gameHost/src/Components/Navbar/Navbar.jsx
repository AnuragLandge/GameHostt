// Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Import Login icon
import PersonAdd from '@mui/icons-material/PersonAdd';
import logo from'../Navbar/battle.png';


const Navbar = () => {
    return (
        <AppBar position="static" sx={{ display: 'flex', bgcolor: 'white', height:'60px'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                   {/* <img alt="" sx={{height: "33px"}}/> */}
                    <Typography variant="h6"  sx={{color:'black'}}> G a m e H o s t</Typography>
    
                </div>
                <div>
                    <Button color="inherit" sx={{
                            color: 'black',
                            padding:'5px',
                            
                            '&:hover': {
                                backgroundColor: 'rgb(230, 230, 231)', // Change background color on hover
                                color: 'black', // Change text color on hover
                            },
                            marginRight:'15px',
                        }}><AccountCircle sx={{ marginRight: '5px' }} />Login</Button>
                    <Button color="inherit" sx={{
                            color: 'white',
                            padding:"5px 15px",
                            borderRadius:"10px",
                            bgcolor:"purple",
                            '&:hover': {
                                backgroundColor: 'rgb(230, 230, 231)', // Change background color on hover
                                color: 'black', // Change text color on hover
                            },
                        }}><PersonAdd sx={{ marginRight: '5px' }} />Signup</Button>
                </div>
            </Toolbar>
        </AppBar>
    ); 
};

export default Navbar;