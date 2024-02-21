import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
} from "@mui/material";
import "../App.css";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import GanttChartHandle from "../components/gantt/GanttChartHandle";

function GanttPage() {
  const history = useNavigate();
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // Handle tab change here
    if (newValue === 0) {
      history("/");
    } else if (newValue == 1) {
      history("/ganttChart");
    }
  };
  return (
    <>
      <div className="Gantt-container">
      <Paper elevation={8} style={{ padding: 0,margin:20 }}>
        <div style={{paddingBottom:10}}>
        <GanttChartHandle></GanttChartHandle>
        </div>
        </Paper>
      </div>
    </>
  );
}

export default GanttPage;
