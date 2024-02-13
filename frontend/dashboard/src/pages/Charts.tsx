import React, { useEffect, useState } from "react";
import ChainChart from "../components/chart/ChartComponent";
import ChartChain from "../api/ChartChain";
import ChartTask from "../api/ChartTask";
import ChartFilter from "../components/filters/ChartFilter";
import TaskChartFilter from "../components/filters/TaskChartFilter";

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
import Tasknames from "../api/Tasknames";
import Draggable from "react-draggable";
import DateFilters from "../components/filters/DateFilters";
import ChainDetails from "../api/ChainDetails";
import { StyledButton } from "../utils/StyledComponents";
import { PrimaryColor } from "../utils/Colors";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        style={{ maxWidth: "1300px", width: "100%", height: "80%" }}
      />
    </Draggable>
  );
}

const Charts: React.FC = () => {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    key: string;
  } | null>(null);
  const [selectedTaskValue, setSelectedTaskValue] = useState<{
    id: number;
    key: string;
  } | null>(null);
  const handleChainSelected = (chainData: { id: number; key: string }) => {
    setSelectedChainValue(chainData);
  };
  const handleTaskSelected = (id: number, key: string) => {
    setSelectedTaskValue({ id, key });
  };

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2024, 0, 24));
  const [childStartDate, setChildStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [childEndDate, setChildEndDate] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [taskStartDate, setTaskStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [taskEndDate, setTaskEndDate] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [BenchTaskstartDate, setBenchTaskStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchTaskendDate, setBenchTaskEndDate] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [BenchChildstartDate, setBenchChildStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchChildendDate, setBenchChildEndDate] = useState<Date | null>(
    new Date(2024, 0, 24)
  );

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  const handleChildStartDateChange = (newDate: Date | null) => {
    setChildStartDate(newDate);
  };
  const handleChildEndDateChange = (newDate: Date | null) => {
    setChildEndDate(newDate);
  };
  const handleTaskStartDateChange = (newDate: Date | null) => {
    setTaskStartDate(newDate);
  };
  const handleTaskEndDateChange = (newDate: Date | null) => {
    setTaskEndDate(newDate);
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };
  const handleTaskBenchStartDateChange = (newDate: Date | null) => {
    setBenchTaskStartDate(newDate);
  };
  const handleTaskBenchendDateChange = (newDate: Date | null) => {
    setBenchTaskEndDate(newDate);
  };
  const handleBenchChildStartDateChange = (newDate: Date | null) => {
    setBenchChildStartDate(newDate);
  };
  const handleBenchChildendDateChange = (newDate: Date | null) => {
    setBenchChildEndDate(newDate);
  };
  //Data for Child charts (Task charts) for selected chain
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      setData([]);
      const response = (await Tasknames({
        chain_id: selectedChainValue?.id || 2775,
      })) as any;
      console.log(response);
      setData(response || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedChainValue]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ paddingTop: 100, paddingLeft: 100, paddingRight: 100 }}>
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                color: PrimaryColor,
                fontFamily: 'sans-serif',
                // fontWeight: "bolder",
              }}
            >
              Chain Name:{" "}
              {`${
                selectedChainValue?.key ||
                "Analytics Golden Copy - Mastered Analytics"
              }`}
            </h3>
            <div style={{ display: "flex" }}>
              <StyledButton
                onClick={handleClickOpen}
                style={{ marginBottom: "10px", marginRight: "10px" }}
              >
                Show Tasks
              </StyledButton>
              <ChartFilter
                onChainSelected={handleChainSelected}
                onStartDateSelected={handleStartDateChange}
                onEndDateSelected={handleEndDateChange}
                onBenchStartDateSelected={handleBenchStartDateChange}
                onBenchEndDateSelected={handleBenchendDateChange}
              />
            </div>
          </div>

          <div>
            <ChainChart
              fetchDataFunction={() =>
                ChartChain({
                  chain_id: selectedChainValue?.id || 2775,
                  startDate: startDate,
                  endDate: EndDate,
                  benchStartDate: BenchstartDate,
                  benchEndDate: BenchendDate,
                })
              }
              title="Chain Time"
            />
          </div>
        </Paper>
      </div>

      <div style={{ paddingTop: 50, paddingLeft: 100, paddingRight: 100 }}>
        <Paper elevation={10} style={{ padding: 20, marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                color: PrimaryColor,
                fontFamily: "cursive",
                // fontWeight: "bolder",
              }}
            >
              Task Name: {`${selectedTaskValue?.key || "CRD Loans Task"}`}
            </h3>

            <TaskChartFilter
              onTaskSelected={handleTaskSelected}
              onStartDateSelected={handleTaskStartDateChange}
              onEndDateSelected={handleTaskEndDateChange}
              onBenchStartDateSelected={handleTaskBenchStartDateChange}
              onBenchEndDateSelected={handleTaskBenchendDateChange}
            />
          </div>
          <div>
            <ChainChart
              fetchDataFunction={() =>
                ChartTask({
                  flow_id: selectedTaskValue?.id || 2919,
                  startDate: taskStartDate,
                  endDate: taskEndDate,
                  benchStartDate: BenchTaskstartDate,
                  benchEndDate: BenchTaskendDate,
                })
              }
              title="Task Time"
            />
          </div>
        </Paper>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            style={{
              cursor: "move",
              fontStyle: "italic",
              fontWeight: "inherit",
            }}
            id="draggable-dialog-title"
          >
            <h3>{`${selectedChainValue?.key || "Risk Metrics Analytics"}`}</h3>
          </DialogTitle>
          <DateFilters
            onStartDateSelected={handleChildStartDateChange}
            onEndDateSelected={handleChildEndDateChange}
            onBenchStartDateSelected={handleBenchChildStartDateChange}
            onBenchEndDateSelected={handleBenchChildendDateChange}
          />
          <DialogContent>
            {data.map((item: any) => (
              <div
                style={{
                  paddingTop: 50,
                  paddingLeft: 100,
                  paddingRight: 100,
                }}
              >
                <Paper elevation={10} style={{ padding: 20, marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>Task Name: {`${item.task_name}`}</h3>
                  </div>
                  <div>
                    <ChainChart
                      fetchDataFunction={() =>
                        ChartTask({
                          flow_id: item.flow_id,
                          startDate: childStartDate,
                          endDate: childEndDate,
                          benchStartDate: BenchChildstartDate,
                          benchEndDate: BenchChildendDate,
                        })
                      }
                      title="Task Time"
                    />
                  </div>
                </Paper>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Charts;
