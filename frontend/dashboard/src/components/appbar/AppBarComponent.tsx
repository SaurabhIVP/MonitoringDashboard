import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Link } from "react-router-dom";
import { PrimaryColor } from "../../utils/Colors";

interface AppBarComponentProps {
  selectedTab: number | null;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  selectedTab,
  handleTabChange,
}) => {
  const [tabColors, setTabColors] = useState<string[]>([
    "white",
    "white",
    "white",
  ]);
  const handleTabClick = (index: number) => {
    const newTabColors = [...tabColors].fill("white");
    newTabColors[index] = "#F2CE72"; // Change to desired color
    setTabColors(newTabColors);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: PrimaryColor,height:'55px' }}>
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            textDecoration: "none",
          }}
          onClick={() => {
            const newTabColors = [...tabColors].fill("white");
            setTabColors(newTabColors);
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <AnalyticsIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
          <Typography
            variant="h6"
            color="white"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              fontFamily:"roboto",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: "0.5rem",
              textAlign: "left",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#F2CE72",
              },
            }}
          >
            Performance Tracker
          </Typography>
        </Link>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab
            label="Home"
            value={0}
            component={Link}
            to="/"
            style={{
              color: tabColors[0],
              fontFamily: "roboto",
              fontWeight: "bold",
            }}
            onClick={() => handleTabClick(0)}
          />
          <Tab
            label="Daily Gantt"
            value={1}
            component={Link}
            to="/gantt"
            style={{
              color: tabColors[1],
              fontFamily: "roboto",
              fontWeight: "bold",
            }}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            label="Trend Analysis"
            value={2}
            component={Link}
            to="/charts"
            style={{
              color: tabColors[2],
              fontFamily: "roboto",
              fontWeight: "bold",
            }}
            onClick={() => handleTabClick(2)}
          />
          {/* <div style={{ paddingTop: "5px", display: "flex" }}>
            <div
              style={{
                paddingTop: "10px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
              }}
            >
              PM
            </div>
            <Switch></Switch>
          </div> */}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
