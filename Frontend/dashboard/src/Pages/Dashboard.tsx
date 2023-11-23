import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import AllData from "../Api/AllData";
import '../App.css';
import Tasknames from "../Api/Tasknames";
import Datepicker from "../Components/Datepicker";
import Dropdown from "../Components/Dropdown";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import TimePicker from "../Components/TimePickerC";
import TimePickerC from "../Components/TimePickerC";
import Ganttt from "../Components/Ganttt";



function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<string | ''>('');
  const [selectedTaskValue, setSelectedTaskValue] = useState<string | ''>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [EndDate, setEndDate] = useState<Date | null>(new Date());
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(new Date());
  const [BenchendDate, SetBenchendDate] = useState<Date | null>(new Date());
  const [value, onChange] = useState('10:00');

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
          <SearchBar fetchDataFunction={AllData} NameParam="chain_Name" Label="Search Chain Name" onSearch={ChainhandleSearch} />
          <SearchBar fetchDataFunction={() => Tasknames({ chainname: selectedChainValue })} NameParam="task_Name" Label="Search Task Name" onSearch={TaskhandleSearch} />
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
      <div className="Gantt-container">
        <h2>Gantt Chart</h2>
        <div className="timepicker">
          <TimePickerC name="Start Time"></TimePickerC>
          <TimePickerC name="End Time"></TimePickerC>
        </div>
        <div className="Gantt">
          <Ganttt></Ganttt>
        </div>
      </div>

    </>
  )
}

export default Dashboard;