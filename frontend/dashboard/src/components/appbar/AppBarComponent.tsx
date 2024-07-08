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
  const [tabFonts, setTabFonts] = useState<number[]>([400, 400, 400]);
  const [tabColors, setTabColors] = useState<string[]>([
    "#003168",
    "#003168",
    "#003168",
  ]);
  const handleTabClick = (index: number) => {
    const newTabFonts = [400, 400, 400];
    newTabFonts[index] = 700;

    setTabFonts(newTabFonts);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{ backgroundColor: PrimaryColor, height: "50px" }}
    >
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
            const newTabFonts = [400, 400, 400];
            newTabFonts[0] = 700;

            setTabFonts(newTabFonts);
          }}
        >
          <Typography
            variant="h6"
            color="#003168"
            sx={{
              fontFamily: "roboto",
              fontSize: "24px",
              fontWeight: 500,
              fontVariant: "small-caps",
              marginTop: "0px",
              marginLeft: "10px",
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
              fontWeight: tabFonts[0],
              fontVariant: "small-caps",
              fontSize: "13px",
              marginTop: "4px",
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
              fontWeight: tabFonts[1],
              fontVariant: "small-caps",
              fontSize: "13px",
              marginTop: "4px",
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
              marginTop: "4px",
              fontFamily: "roboto",
              fontSize: "13px",
              fontWeight: tabFonts[2],
              fontVariant: "small-caps",
              marginRight: "10px",
            }}
            onClick={() => handleTabClick(2)}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
