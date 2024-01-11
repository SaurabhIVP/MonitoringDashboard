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
import GanttPage from "./GanttPage";
import AppBarComponent from "../Components/AppBarComponent";

function Dashboard() {

  const benchmarkComputeOptions = [
    {
      text:"Average",
      value:"Average"
    }
  ]
  const history = useNavigate();
  const [selectedChainValue, setSelectedChainValue] = useState<number | null>(0);
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<number | null>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(new Date(2023, 10, 17));
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 0) {
      history("/");
    } else if (newValue == 1) {
      history("/ganttChart")
    }
  };
  const openTaskModal = () => {
    console.log(selectedTaskValue);
    setIsTaskModalOpen(true);
  };
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
    console.log(startDate);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
    console.log(EndDate);
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
    console.log(BenchstartDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
    console.log(BenchendDate);
  };
  const ChainhandleSearch = async (id: number | null) => {
    setSelectedChainValue(id);
    console.log(selectedChainValue);
  }

  const TaskhandleSearch = async (id: number | null) => {
    setSelectedTaskValue(id);
    console.log(selectedTaskValue);
  };

  const [benchmarkCompute,setBenchmarkCompute]=useState("Average")
  const onChange = (value:string)=>{
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  }

  return (
    <>
      <div >
        <AppBarComponent selectedTab={selectedTab} handleTabChange={handleTabChange} />
        <div style={{ paddingBottom: "30px", paddingTop: '80px' }}>
          <div className="searchbar" style={{ paddingTop: "20px", display: 'flex' }}>
            <SearchBar fetchDataFunction={AllData} nameParam="chain_name" label="Search Chain Name" onSearch={ChainhandleSearch} idParam="chain_id" />
            <SearchBar fetchDataFunction={() => Tasknames({ chain_id: selectedChainValue })} nameParam="task_name" label="Search Task Name" onSearch={TaskhandleSearch} idParam="flow_id" />
            <Dropdown name="Benchmark Compute" benchmarkComputeOptions={benchmarkComputeOptions} onChange={onChange}></Dropdown>
          </div>
          <div className="datepicker">
            <Datepicker name="Start Date" selectedDate={startDate} onDateChange={handleStartDateChange} />
            <Datepicker name="End Date" selectedDate={EndDate} onDateChange={handleEndDateChange} />
            <Datepicker name="Benchmark Start Date" selectedDate={BenchstartDate} onDateChange={handleBenchStartDateChange} />
            <Datepicker name="Benchmark End Date" selectedDate={BenchendDate} onDateChange={handleBenchendDateChange} />
            <Button variant="contained" style={{
              marginTop: '15px',
              flexShrink: 0,
              borderRadius: '40px',
              backgroundColor: '#005A44', // Set your desired color here
              color: 'white', // Set text color to contrast with the background
            }}>Chain Chart</Button>
            <Button variant="contained" style={{
              marginTop: '15px',
              flexShrink: 0,
              borderRadius: '40px',
              backgroundColor: '#005A44', 
              color: 'white', 
            }}>Task Chart</Button>
          </div>
        </div>
        <GetChainDetails chainID={selectedChainValue} taskID={selectedTaskValue} benchmarkCompute={benchmarkCompute} startDate={startDate} endDate={EndDate} benchmarkStartDate={BenchstartDate} benchmarkEndDate={BenchendDate}></GetChainDetails>
      </div>
      <div>
        <Button variant="contained" onClick={openTaskModal} size="medium" style={{ borderRadius: '100px' }}>
          Open Task Chart
        </Button>
        <ChartModal isOpen={isTaskModalOpen} onClose={closeTaskModal} fetchDataFunction={() => ChartTask({
          flow_id: selectedTaskValue,
          startDate: startDate,
          endDate: EndDate,
          benchStartDate: BenchstartDate,
          benchEndDate: BenchendDate,
        })} Label="FLOW_To Be Announced Analytics" />

      </div>
      <div className="Gantt-container">
        <div>
          <GanttChartHandle></GanttChartHandle>
        </div>
      </div>


    </>
  )
}

export default Dashboard;