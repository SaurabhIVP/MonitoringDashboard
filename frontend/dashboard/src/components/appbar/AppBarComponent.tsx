import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
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
    newTabColors[index] = "black"; // Change to desired color
    setTabColors(newTabColors);
  };
  return (
    <AppBar position="fixed" style={{ backgroundColor: PrimaryColor }}>
      <Toolbar variant="dense">
        <Link to="/" style={{ color: "white" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <AnalyticsIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </Link>

        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
            paddingLeft: 4,
            fontSize: "1.5rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            margin: "0.5rem",
            textAlign: "left",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#34568B",
            },
          }}
        >
          Monitoring Dashboard
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab
            label="Home"
            value={0}
            component={Link}
            to="/"
            style={{ color: tabColors[0] }}
            onClick={()=>handleTabClick(0)}
          />
          <Tab
            label="Gantt Chart"
            value={1}
            component={Link}
            to="/gantt"
            style={{ color: tabColors[1]  }}
            onClick={()=>handleTabClick(1)}
          />
          <Tab
            label="Trend Analysis"
            value={2}
            component={Link}
            to="/charts"
            style={{ color: tabColors[2]  }}
            onClick={()=>handleTabClick(2)}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
