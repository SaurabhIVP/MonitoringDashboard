import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import AllData from "../Api/AllData";
import '../App.css';
import Tasknames from "../Api/Tasknames";
import Datepicker from "../Components/Datepicker";
import Dropdown from "../Components/Dropdown";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import GanttChart from "../Components/GanttChart";
import GanttData2 from "../Api/GanttData2";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GanttData from "../Api/GanttData";
import Table from "../Components/Table";
import { GetChainDetails } from "../Api/GetChainDetails";
//import {chainList,columnList} from "../Api/GetChainDetails"

function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<string | ''>('');
  const [selectedTaskValue, setSelectedTaskValue] = useState<string | ''>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [EndDate, setEndDate] = useState<Date | null>(new Date());
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(new Date());
  const [BenchendDate, setBenchendDate] = useState<Date | null>(new Date());
  const [ganttstartTime, setGanttStartTime] = useState<Date | null>(null)
  const [ganttendTime, setGanttEndTime] = useState<Date | null>(null)
  const [filter, setFilter] = useState(false);
  const [showTableComponent,setShowTableComponent] = useState(false);

  const CDHeader= 
  [
    "Chain Name","Start Time","End Time","Current Time","Chain Time","Benchmark","Deviation"
  ]

  const handleGanttStartTimeChange = (time: Date | null) => {
    setGanttStartTime(time);
  };
  const handleGanttEndTimeChange = (time: Date | null) => {
    setGanttEndTime(time);
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
    setBenchendDate(newDate);
  };

  const GanttButtonHandler = () => {
    console.log(ganttstartTime);
    console.log(ganttendTime);
    setFilter(true);
  }
  const fetchData = () => {
    if (filter) {
      GanttData2({ starttime: ganttstartTime, endtime: ganttendTime });
    } else {
      GanttData();
    }
  }
  const ChainhandleSearch = async (value: string) => {
    setSelectedChainValue(value);
  };
  const TaskhandleSearch = async (value: string) => {
    setSelectedTaskValue(value);
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
          <SearchBar fetchDataFunction={AllData} NameParam="chain_name" Label="Search Chain Name" onSearch={ChainhandleSearch} />
          <SearchBar fetchDataFunction={() => Tasknames({ chainname: selectedChainValue })} NameParam="task_name" Label="Search Task Name" onSearch={TaskhandleSearch} />
          <Dropdown name="Benchmark Compute"></Dropdown>
        </div>
        <div className="searchbar">
          <Datepicker name="Start Date" selectedDate={startDate} onDateChange={handleStartDateChange} />
          <Datepicker name="End Date" selectedDate={EndDate} onDateChange={handleEndDateChange} />
          <Datepicker name="Benchmark Start Date" selectedDate={BenchstartDate} onDateChange={handleBenchStartDateChange} />
          <Datepicker name="Benchmark End Date" selectedDate={BenchendDate} onDateChange={handleBenchendDateChange} />
        </div>

        <GetChainDetails chainID={1} taskID={1} benchmarkCompute="AVG" startDate={startDate} endDate={EndDate} benchmarkStartDate={BenchstartDate} benchmarkEndDate={BenchendDate}></GetChainDetails>
        <div></div>
      </div>
    </div>
      <div className="Gantt-container">
        <h2>Gantt Chart</h2>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="Gantt Start time" value={ganttstartTime} onChange={handleGanttStartTimeChange} />
            <DateTimePicker label="Gantt End time" value={ganttendTime} onChange={handleGanttEndTimeChange} />
          </LocalizationProvider>
        </div>
        <Button variant="contained" onClick={() => {
          GanttButtonHandler();
          fetchData();
        }} size="medium" style={{ borderRadius: "100px" }}>Submit</Button>
           <div>
        {filter ? (
          <GanttChart
            fetchDataFunction={() => GanttData2({ starttime: ganttstartTime, endtime: ganttendTime })}
          ></GanttChart>
        ) : (
          <GanttChart fetchDataFunction={GanttData}></GanttChart>
        )}
      </div>
      </div>
    </>
  )
}

export default Dashboard;