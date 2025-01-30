import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Sidebar from "./Sidebar";

const NavbarWithDrawer = (props) => {
  return (
    <>
      {/* AppBar with Navbar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "white",
          height: "60px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1301, // Keeps it above sidebar
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontFamily: "Montserrat, Arial, sans-serif",
            }}
          >
            G a m e H o s t
          </Typography>

          <Button color="inherit" sx={{ color: "black" }}>
            <AccountCircle sx={{ marginRight: "5px" }} />
            Account Name
          </Button>
        </Toolbar>
      </AppBar>

      {/* Layout */}
      <Box
        sx={{
          display: "flex",
          height: "100vh", // Full viewport height
          overflow: "hidden", // Prevent scrollbars
          mt: "60px", // Account for AppBar height
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {props.children}
        
      </Box>
    </>
  );
};

export default NavbarWithDrawer;
