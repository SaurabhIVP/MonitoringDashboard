import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import AllData from "../Api/AllData";
import '../App.css';
import { Link, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Tasknames from "../Api/Tasknames";
import Datepicker from "../Components/Datepicker";
import Dropdown from "../Components/Dropdown";
import { AppBar, Button, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import GanttChartHandle from "../Components/GanttChartHandle";
import { GetChainDetails } from "../Api/GetChainDetails";
import ChartModal from "../Components/ChartModal";
import ChartTask from "../Api/ChartTask";
import Dashboard from "./Dashboard";


function GanttPage() {
  const history = useNavigate();
  const [selectedChainValue, setSelectedChainValue] = useState<number| null>(null);
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<number| null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    // Handle tab change here
    if (newValue === 0) {
        history("/");
      }else if(newValue==1){
        history("/ganttChart")
      } 
  };
  const openChainModal = () => {
    setIsChainModalOpen(true);
  };
  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeChainModal = () => {
    setIsChainModalOpen(false);
  };
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const buttonHandler = () => {
    console.log(selectedChainValue);
    console.log(selectedTaskValue);
    console.log(startDate);
    console.log(EndDate);
    console.log(BenchstartDate);
    console.log(BenchendDate);
  }
  const ChainhandleSearch = async (id: number| null) => {
    setSelectedChainValue(id);
     }

 
  const TaskhandleSearch = async (id: number| null) => {
    setSelectedTaskValue(id);
  };
  return (
    <><div ><AppBar position="static" style={{ backgroundColor: '#009B77' }}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }}>
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
            color: '#FF8C00', // Change color on hover (adjust as needed)
          },
        }}
      >
        Monitoring Dashboard
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Home" value={0} component={Link} to="/" />
            <Tab label="Gantt Chart" value={1} component={Link} to="/ganttChart" />
        </Tabs>
      </Toolbar>
    </AppBar>
      
    </div>
      <div className="Gantt-container">
        <div>
        <GanttChartHandle></GanttChartHandle>
        </div>
      </div>
      
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ganttChart" element={<GanttPage />} />
        </Routes>
      
        
    
    </>
  )
}

export default GanttPage;