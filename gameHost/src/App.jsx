import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import SignupComponent from './Components/RegAndLog/SignupComponent';
import NavbarWithDrawer from './Components/AddTournament/NavbarWithDrawer';

import TournamentsDetails from './Components/AddTournament/TournamentsDetails';
import LoginComponent from './Components/RegAndLog/LoginComponent';
import Hosthome from './Components/AddTournament/Hosthome';

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet /> 
  </>
);

const NavWithDrawer = () => (
  <>
    <NavbarWithDrawer /> 
    <Outlet /> 
  </>
);

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutWithNavbar />, 
      children: [
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'signup',
          element: <SignupComponent />,
        },
        {
          path : 'login',
          element : <LoginComponent/>,
        }
      ],
    },
    {
      path: '/addtournament',
      element: <NavWithDrawer />,
      children:[
        {
          path:'add',
          element:<TournamentsDetails/>
        },
        {
          path : 'host-home',
          element:<Hosthome/>
        }
      ]
     
    },
  ]);

  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
