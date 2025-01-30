import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import { AuthProvider } from './Context/AuthConntext';

import Navbar from './Components/Navbar/Navbar';
import NavbarWithDrawer from './Components/AddTournament/NavbarWithDrawer';
import Home from './Components/Home/Home';
import SignupComponent from './Components/RegAndLog/SignupComponent';
import LoginComponent from './Components/RegAndLog/LoginComponent';
import Details from './Components/AddTournament/Details';
import Hosthome from './Components/AddTournament/Hosthome';
import Add from './Components/AddTournament/Add'
import AddTournamentHome from './Components/AddTournament/AddTournamentHome';
import AddTeamEntry from './Components/AddTournament/AddTeamEntry';

// Layout component with Navbar
const Layout = ({ withDrawer = false }) => (
  <>
    {withDrawer ? <NavbarWithDrawer> <Outlet /> </NavbarWithDrawer> : <Navbar />}
  </>
);

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: '"Montserrat", "Arial", sans-serif',
    },
  });

  return (
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
         
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Home Route */}
          <Route path="home" element={<Home />} />

          {/* Routes with regular Navbar */}
          <Route path="/" element={<Layout />}>
            <Route path="signup" element={<SignupComponent />} />
            <Route path="login" element={<LoginComponent />} />
          </Route>

          {/* Routes with Navbar + Drawer */}
          <Route path="/addtournament" element={<Layout withDrawer/>}>
            <Route path='help' element={<AddTournamentHome/>}/>
            <Route path="add" element={<Add />} />
            <Route path="add/details" element={<Details/>}/>
            <Route path="host-home" element={<Hosthome />} />
            <Route path='addEntry' element={<AddTeamEntry/>}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
