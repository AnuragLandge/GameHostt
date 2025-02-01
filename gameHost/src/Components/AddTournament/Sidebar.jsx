import React, { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsIcon from '@mui/icons-material/Sports';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const showLive = () => {
    console.log("clicked");
    navigate('/addtournament/host-home');
  };

  const addTournament =()=>{

    navigate('/addtournament/add');
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
        <div className="sidebar-item">
          <HelpOutlineIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Participate</p>}
        </div>
        <div className="sidebar-item">
          <TimelineIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Activity</p>}
        </div>
        <div className="sidebar-item">
          <SettingsIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
