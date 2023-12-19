import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import AllData from "../Api/AllData";
import '../App.css';
import Tasknames from "../Api/Tasknames";
import Datepicker from "../Components/Datepicker";
import Dropdown from "../Components/Dropdown";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import GanttChartHandle from "../Components/GanttChartHandle";
import ChartModal from "../Components/ChartModal";
import ChartChain from "../Api/ChartChain";
import ChartTask from "../Api/ChartTask";

function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<number| null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<number| null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [BenchendDate, SetBenchendDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
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
    SetBenchendDate(newDate);
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
  };
  const TaskhandleSearch = async (id: number| null) => {
    setSelectedTaskValue(id);
  };
  return (
    <><div ><AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" color="white" component="div" sx={{ flexGrow: 1 }}>
          Monitoring Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
      <div style={{ paddingBottom: "15px" }}>
        <div className="searchbar" style={{ paddingTop: "20px" }}>
          <SearchBar fetchDataFunction={AllData} nameParam="chain_name" label="Search Chain Name" onSearch={ChainhandleSearch} idParam="chain_id"/>
          <SearchBar fetchDataFunction={() => Tasknames({ chain_id: selectedChainValue })} nameParam="task_name" label="Search Task Name" onSearch={TaskhandleSearch} idParam="flow_id"/>
          <Dropdown name="Benchmark Compute"></Dropdown>
        </div>
        <div className="searchbar">
          <Datepicker name="Start Date" selectedDate={startDate} onDateChange={handleStartDateChange} />
          <Datepicker name="End Date" selectedDate={EndDate} onDateChange={handleEndDateChange} />
          <Datepicker name="Benchmark Start Date" selectedDate={BenchstartDate} onDateChange={handleBenchStartDateChange} />
          <Datepicker name="Benchmark End Date" selectedDate={BenchendDate} onDateChange={handleBenchendDateChange} />
          <Button variant="contained" onClick={buttonHandler} size="medium" style={{ borderRadius: "100px" }}>Submit</Button>
        </div>
      </div>
    </div>
    <div>
    <Button variant="contained" onClick={openTaskModal} size="medium" style={{ borderRadius: '100px' }}>
        Open Task Chart
      </Button>
      <ChartModal isOpen={isTaskModalOpen} onClose={closeTaskModal} fetchDataFunction={()=>ChartTask({
            flow_id:3257,
            startDate:startDate,
            endDate: EndDate,
            benchStartDate: BenchstartDate,
            benchEndDate: BenchendDate,
          })} Label="FLOW_To Be Announced Analytics"/>
    
    </div>
    <div>
    <Button variant="contained" onClick={openChainModal} size="medium" style={{ borderRadius: '100px' }}>
        Open Chain Chart
      </Button>
      <ChartModal isOpen={isChainModalOpen} onClose={closeChainModal} fetchDataFunction={()=>ChartChain({
            chain_id:2775,
            startDate:startDate,
            endDate: EndDate,
            benchStartDate: BenchstartDate,
            benchEndDate: BenchendDate,
          })} Label="Analytics Golden Copy - Mastered Analytics"/>
    
    </div>
      <div className="Gantt-container">
        <h2>Gantt Chart</h2>
        <div>
        <GanttChartHandle></GanttChartHandle>
        </div>
      </div>
    </>
  )
}

export default Dashboard;