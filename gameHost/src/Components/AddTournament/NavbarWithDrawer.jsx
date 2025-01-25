import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from './Sidebar'; // Import Sidebar
import Add from './Add';

const NavbarWithDrawer = () => {
  return (
    <>
      {/* AppBar with Navbar */}
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
          {/* GameHost Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'black' }}>
              G a m e H o s t
            </Typography>
          </div>

          {/* Account Information */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Account Button */}
            <Button color="inherit" sx={{ color: 'black' }}>
              <AccountCircle sx={{ marginRight: '5px' }} />
              Account Name
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', gap: 400}}>
        <Sidebar />
        <Add/>
      </div>
    </>
  );
};

export default NavbarWithDrawer;
