import React, { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const showLive = () => {
    console.log("clicked");
    navigate('/addtournament/host-home');
  };

  const addTournament = () => {
    navigate('/addtournament/add');
  }

  const participateClickHandler = () => {
    navigate('/addtournament/participate');
  }

  const performanceClickHnadler = () => {
      navigate('/addtournament/performance');
  }

  
  return (
    <div className={`sidebar-container ${extended ? 'extended' : ''}`}>
      {/* Sidebar Content */}
      <div className="sidebar-content">
        {/* Toggle Button */}
        <div className="sidebar-toggle" onClick={() => setExtended((prev) => !prev)}>
          <MenuIcon className="menu-icon" />
          {extended && <p className="sidebar-text">Menu</p>}
        </div>

        {/* Sidebar Items */}
        <div className="sidebar-item" onClick={showLive}>
          <SportsEsportsIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Your Tournaments</p>}
        </div>

        <div className="sidebar-item" onClick={addTournament}>
          <SportsIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Add tournament</p>}
        </div>
        <div className="sidebar-item" onClick={participateClickHandler}>
          <HelpOutlineIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Participate</p>}
        </div>
        <div className="sidebar-item" onClick={performanceClickHnadler}>
          <TimelineIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Team Performance</p>}
        </div>
        <div className="sidebar-item">
          <LogoutIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Log Out</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
