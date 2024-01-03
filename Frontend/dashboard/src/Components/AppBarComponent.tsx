import React from "react";
import { AppBar, IconButton, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Link, useNavigate } from "react-router-dom";

interface AppBarComponentProps {
  selectedTab: number | null;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ selectedTab, handleTabChange }) => {
  const history = useNavigate();

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#009B77' }}>
      <Toolbar variant="dense">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <AnalyticsIcon sx={{ fontSize: '3rem' }} />
        </IconButton>
        <Typography
          variant="h6"
          color="white"
          sx={{
            flexGrow: 1,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0.5rem',
            textAlign: 'center',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#34568B',
            },
          }}
        >
          Monitoring Dashboard
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} >
          <Tab label="Home" value={0} component={Link} to="/" style={{ color: 'white' }} />
          <Tab label="Gantt Chart" value={1} component={Link} to="/ganttChart" style={{ color: 'white' }} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
