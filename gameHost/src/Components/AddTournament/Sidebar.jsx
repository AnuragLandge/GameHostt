import React, { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsIcon from '@mui/icons-material/Sports';


const Sidebar = () => {
  const [extended, setExtended] = useState(false);

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
        <div className="sidebar-item">
          <SportsEsportsIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Live Tournaments</p>}
        </div>
        <div className="sidebar-item">
          <SportsIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Participate</p>}
        </div>
        <div className="sidebar-item">
          <HelpOutlineIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Help</p>}
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
