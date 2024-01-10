import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AllData from "../api/AllData";
import "../App.css";
import Tasknames from "../api/Tasknames";
import Datepicker from "../components/Datepicker";
import Dropdown from "../components/Dropdown";
import {
  AppBar,
  Button,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { GetChainDetails } from "../api/GetChainDetails";
import ChartModal from "../components/ChartModal";
import ChartTask from "../api/ChartTask";
import TaskChart from "../components/TaskChart";
import ChartChain from "../api/ChartChain";

function Dashboard() {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2023, 10, 17)
  );
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2023, 10, 24));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2023, 10, 17)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2023, 10, 24)
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);

  const openTaskModal = () => {
    console.log(selectedTaskValue);
    setIsTaskModalOpen(true);
  };
  const openChainModal = () => {
    console.log(selectedTaskValue);
    setIsChainModalOpen(true);
  };
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };
  const closeChainModal = () => {
    setIsChainModalOpen(false);
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
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedChainValue(id !== null ? { id, key } : null);
  };

  const TaskhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedTaskValue(id !== null ? { id, key } : null);
  };
  return (
    <>
    
        <div style={{ paddingBottom: "2%", paddingTop: "5%" }}>
          <div
            className="searchbar"
            style={{ paddingTop: "20px", display: "flex" }}
          >
            <SearchBar
              fetchDataFunction={AllData}
              nameParam="chain_name"
              label="Search Chain Name"
              onSearch={ChainhandleSearch}
              idParam="chain_id"
            />
            <SearchBar
              fetchDataFunction={() =>
                Tasknames({
                  chain_id: selectedChainValue ? selectedChainValue.id : null,
                })
              }
              nameParam="task_name"
              label="Search Task Name"
              onSearch={TaskhandleSearch}
              idParam="flow_id"
            />
            <Dropdown name="Benchmark Compute"></Dropdown>
          </div>
          <div className="datepicker">
            <Datepicker
              name="Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
            />
            <Datepicker
              name="End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
            />
            <Datepicker
              name="Benchmark Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
            />
            <Datepicker
              name="Benchmark End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
            />
            <Button
              variant="contained"
              onClick={openChainModal}
              style={{
                marginTop: "15px",
                flexShrink: 0,
                borderRadius: "10px",
                backgroundColor: "#005A44", // Set your desired color here
                color: "white", // Set text color to contrast with the background
              }}
            >
              Chain Chart
            </Button>
            <Button
              variant="contained"
              onClick={openTaskModal}
              style={{
                marginTop: "15px",
                marginLeft: "20px",
                borderRadius: "10px",
                backgroundColor: "#005A44",
                color: "white",
              }}
            >
              Task Chart
            </Button>
          </div>
        </div>
        <div>
          <ChartModal
            isOpen={isTaskModalOpen}
            onClose={closeTaskModal}
            ChartComponent={TaskChart}
            fetchDataFunction={() =>
              ChartTask({
                flow_id: selectedTaskValue ? selectedTaskValue.id : null,
                startDate: startDate,
                endDate: EndDate,
                benchStartDate: BenchstartDate,
                benchEndDate: BenchendDate,
              })
            }
            Label={selectedTaskValue ? selectedTaskValue.key : ""}
          />
        </div>
        <div>
          <ChartModal
            isOpen={isChainModalOpen}
            onClose={closeChainModal}
            ChartComponent={TaskChart}
            fetchDataFunction={() =>
              ChartChain({
                chain_id: selectedChainValue ? selectedChainValue.id : null,
                startDate: startDate,
                endDate: EndDate,
                benchStartDate: BenchstartDate,
                benchEndDate: BenchendDate,
              })
            }
            Label={selectedChainValue ? selectedChainValue.key : ""}
          />
        </div>
        <GetChainDetails
          chainID={1}
          taskID={1}
          benchmarkCompute="AVG"
          startDate={startDate}
          endDate={EndDate}
          benchmarkStartDate={BenchstartDate}
          benchmarkEndDate={BenchendDate}
        ></GetChainDetails>
      
    </>
  );
}

export default Dashboard;
