import React, { useEffect, useState } from "react";
import ChainChart from "../../components/chart/ChartComponent";
import ChartChain from "../../api/ChartChain";
import ChartTask from "../../api/ChartTask";
import ChartFilter from "../../components/filters/ChartFilter";
import TaskChartFilter from "../../components/filters/TaskChartFilter";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import Tasknames from "../../api/Tasknames";
import DateFilters from "../../components/filters/DateFilters";
import {
  StyledButton,
  StyledDatepickerContainer,
} from "../../utils/StyledComponents";
import { PrimaryColor } from "../../utils/Colors";
import { PaperComponent } from "../../components/generics/paper component/PaperComponent";
import "./Charts.css";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";

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

  const [chainStartDate, setChainStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [chainEndDate, setChainEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );
  const [childTaskStartDate, setChildTaskStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [childTaskEndDate, setChildTaskEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );
  const [taskStartDate, setTaskStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [taskEndDate, setTaskEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );
  const [BenchTaskstartDate, setBenchTaskStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchTaskendDate, setBenchTaskEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );
  const [BenchChildstartDate, setBenchChildStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchChildendDate, setBenchChildEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );

  const handleChainStartDateChange = (newDate: Date | null) => {
    setChainStartDate(newDate);
  };
  const handleChainEndDateChange = (newDate: Date | null) => {
    setChainEndDate(newDate);
  };
  const handleChildTaskStartDateChange = (newDate: Date | null) => {
    setChildTaskStartDate(newDate);
  };
  const handleChildTaskEndDateChange = (newDate: Date | null) => {
    setChildTaskEndDate(newDate);
  };
  const handleTaskStartDateChange = (newDate: Date | null) => {
    setTaskStartDate(newDate);
  };
  const handleTaskEndDateChange = (newDate: Date | null) => {
    setTaskEndDate(newDate);
  };

  //chain benchmark handlers
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  //task benchmark handlers
  const handleTaskBenchStartDateChange = (newDate: Date | null) => {
    setBenchTaskStartDate(newDate);
  };
  const handleTaskBenchendDateChange = (newDate: Date | null) => {
    setBenchTaskEndDate(newDate);
  };
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const [taskdeviationPercentage, settaskDeviationPercentage] = useState<
    string | null
  >("0");
  const handletaskDeviationChange = (value: string | null) => {
    settaskDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const benchmarkComputeOptions = [
    {
      text: "Average",
      value: "Average",
    },
  ];
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const onChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
  //child task benchmark handlers
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
      <div className="paperWrapper">
        <Paper elevation={3} className="paperClass">
          <div className="titleHolder">
            <h3
              className="titleStyler"
              style={{
                color: PrimaryColor,
              }}
            >
              Chain Level Analysis :{" "}
              {`${
                selectedChainValue?.key ||
                "Analytics Golden Copy - Mastered Analytics"
              }`}
            </h3>
            <StyledDatepickerContainer style={{ paddingTop: "15px" }}>
              <StyledButton
                onClick={handleClickOpen}
                style={{
                  marginTop: "5px",
                  // marginBottom: "5px",
                  marginRight: "15px",
                  fontFamily: "roboto",
                }}
              >
                Child Tasks
              </StyledButton>
              <div style={{ marginTop: "5px" }}>
                <ChartFilter
                  onChainSelected={handleChainSelected}
                  onStartDateSelected={handleChainStartDateChange}
                  onEndDateSelected={handleChainEndDateChange}
                  onBenchStartDateSelected={handleBenchStartDateChange}
                  onBenchEndDateSelected={handleBenchendDateChange}
                  onBenchmarkComputeChange={onChange}
                  onDeviationChange={handleDeviationChange}
                />
              </div>
            </StyledDatepickerContainer>
          </div>
          {/* <ListItem>
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Duration:
                  </span>{" "}
                  <span>
                    {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
                    {DateConversioninddMMMMyyyy(BenchendDate)}
                  </span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px", marginLeft: "30px" }}
            />
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>Deviation:</span>{" "}
                  <span>{deviationPercentage} %</span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px" }}
            />
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Compute Type:
                  </span>{" "}
                  <span>Average</span>{" "}
                </Typography>
              }
            />
          </ListItem> */}
          <div
            style={{
              display: "flex",
              fontFamily: "roboto",
              fontSize: "small",
              fontWeight: "bold",
              marginTop: "0px",
              marginLeft: "10px",
            }}
          >
            <span>Benchmark Duration: </span>
            <span>
              {" "}
              {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
              {DateConversioninddMMMMyyyy(BenchendDate)}
            </span>
            <span>{" | "}</span>
            <span>Deviation %:</span>
            <span>{deviationPercentage}</span>
          </div>
          <div id="1293">
            <ChainChart
              fetchDataFunction={() =>
                ChartChain({
                  chain_id: selectedChainValue?.id || 2775,
                  startDate: chainStartDate,
                  endDate: chainEndDate,
                  benchStartDate: BenchstartDate,
                  benchEndDate: BenchendDate,
                  benchmarkCompute: benchmarkCompute,
                  deviationPercentage: deviationPercentage,
                })
              }
              title="Chain Time"
              axisname="Chain Run Date"
            />
          </div>
        </Paper>
      </div>

      <div className="paperWrapper" style={{ paddingTop: "0px" }}>
        <Paper
          elevation={3}
          style={{ padding: 20, marginBottom: 20 }}
          className="paperClass"
        >
          <div className="titleHolder">
            <h3
              className="titleStyler"
              style={{
                color: PrimaryColor,
              }}
            >
              Task Level Analysis :{" "}
              {`${selectedTaskValue?.key || "CRD Loans Task"}`}
            </h3>

            <TaskChartFilter
              onTaskSelected={handleTaskSelected}
              onStartDateSelected={handleTaskStartDateChange}
              onEndDateSelected={handleTaskEndDateChange}
              onBenchStartDateSelected={handleTaskBenchStartDateChange}
              onBenchEndDateSelected={handleTaskBenchendDateChange}
              onDeviationChange={handletaskDeviationChange}
              onBenchmarkComputeChange={onChange}
            />
          </div>
          {/* <ListItem>
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Duration:
                  </span>{" "}
                  <span>
                    {DateConversioninddMMMMyyyy(BenchTaskstartDate)} to{" "}
                    {DateConversioninddMMMMyyyy(BenchTaskendDate)}
                  </span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px", marginLeft: "30px" }}
            />
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>Deviation:</span>{" "}
                  <span>{taskdeviationPercentage} %</span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px" }}
            />
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Compute Type:
                  </span>{" "}
                  <span>Average</span>{" "}
                </Typography>
              }
            />
          </ListItem> */}
          <div
            style={{
              display: "flex",
              fontFamily: "roboto",
              fontSize: "small",
              fontWeight: "bold",
              marginTop: "0px",
              marginLeft: "10px",
            }}
          >
            <span>Benchmark Duration: </span>
            <span>
              {" "}
              {DateConversioninddMMMMyyyy(BenchTaskstartDate)} to{" "}
              {DateConversioninddMMMMyyyy(BenchTaskendDate)}
            </span>
            <span>{" | "}</span>
            <span>Deviation %:</span>
            <span>{taskdeviationPercentage}</span>
          </div>
          <div id="111">
            <ChainChart
              fetchDataFunction={() =>
                ChartTask({
                  flow_id: selectedTaskValue?.id || 2919,
                  startDate: taskStartDate,
                  endDate: taskEndDate,
                  benchStartDate: BenchTaskstartDate,
                  benchEndDate: BenchTaskendDate,
                  deviationPercentage: taskdeviationPercentage,
                  benchmarkCompute: benchmarkCompute,
                })
              }
              title="Task Time"
              axisname="Task Run Date"
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
          // sx={{height:'100px'}}
          fullWidth
          maxWidth="xs"
          sx={{
            maxHeight: "calc(100vh - 300px)",
            top: "20%",
          }}
        >
          <div style={{ paddingBottom: "0px", height: "80px" }}>
            <DialogTitle
              style={{
                color: PrimaryColor,
                fontFamily: "roboto",
                fontSize: "large",
              }}
              id="draggable-dialog-title"
              className="DialogTitle"
            >
              <h4>{`${
                selectedChainValue?.key ||
                "Analytics Golden Copy - Mastered Analytics"
              }`}</h4>
            </DialogTitle>

            <DateFilters
              onStartDateSelected={handleChildTaskStartDateChange}
              onEndDateSelected={handleChildTaskEndDateChange}
              onBenchStartDateSelected={handleBenchChildStartDateChange}
              onBenchEndDateSelected={handleBenchChildendDateChange}
            />
          </div>
          {/* <ListItem>
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Duration:
                  </span>{" "}
                  <span>
                    {DateConversioninddMMMMyyyy(BenchChildstartDate)} to{" "}
                    {DateConversioninddMMMMyyyy(BenchChildendDate)}
                  </span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px", marginLeft: "30px" }}
            />{" "}
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>Deviation:</span>{" "}
                  <span>{deviationPercentage} %</span>{" "}
                </Typography>
              }
              style={{ marginRight: "10px" }}
            />
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold" }}>
                    Benchmark Compute Type:
                  </span>{" "}
                  <span>Average</span>{" "}
                </Typography>
              }
            />
          </ListItem> */}
          <div
            style={{
              display: "flex",
              fontFamily: "roboto",
              fontSize: "small",
              fontWeight: "bold",
              marginTop: "0px",
              marginLeft: "25px",
            }}
          >
            <span>Benchmark Duration: </span>
            <span>
              {" "}
              {DateConversioninddMMMMyyyy(BenchChildstartDate)} to{" "}
              {DateConversioninddMMMMyyyy(BenchChildendDate)}
            </span>
            <span>{" | "}</span>
            <span>Deviation %:</span>
            <span>{taskdeviationPercentage}</span>
          </div>
          <DialogContent
            dividers={true}
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 500px)" }}
          >
            {data.map((item: any) => (
              <div
                key={item.flow_id}
                className="paperWrapper"
                style={{
                  paddingTop: 10,
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <Paper elevation={3} className="paperClass">
                  <div className="titleHolder">
                    <h3
                      style={{ color: PrimaryColor, fontFamily: "sans-serif" }}
                    >
                      Task Name: {`${item.task_name}`}
                    </h3>
                  </div>
                  <div>
                    <ChainChart
                      fetchDataFunction={() =>
                        ChartTask({
                          flow_id: item.flow_id,
                          startDate: childTaskStartDate,
                          endDate: childTaskEndDate,
                          benchStartDate: BenchChildstartDate,
                          benchEndDate: BenchChildendDate,
                          deviationPercentage: deviationPercentage,
                          benchmarkCompute: onchange,
                        })
                      }
                      title="Task Time"
                      axisname="Task Run Date"
                    />
                  </div>
                </Paper>
              </div>
            ))}
          </DialogContent>
          <DialogActions style={{ height: "20px" }}>
            <StyledButton autoFocus onClick={handleClose}>
              Cancel
            </StyledButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Charts;
