import React, { useEffect, useState } from "react";
import ChainChart from "../../components/chart/ChartComponent";
import ChartChain from "../../api/ChartChain";
import ChartTask from "../../api/ChartTask";
import ChartFilter from "../../components/filters/ChartFilter";
import TaskChartFilter from "../../components/filters/TaskChartFilter";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Tasknames from "../../api/Tasknames";
import DateFilters from "../../components/filters/DateFilters";
import {
  StyledButton,
  StyledDatepickerContainer,
} from "../../utils/StyledComponents";
import {
  AppTitleFontSize,
  NormalFontSize,
  PageTitleFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";
import { PaperComponent } from "../../components/generics/paper component/PaperComponent";
import "./Charts.css";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import CloseButton from "../../components/generics/CloseButton";
import { Height } from "@mui/icons-material";

const Charts: React.FC = () => {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    key: string;
  } | null>(null);
  const [pge, setpge] = useState("false");

  const handleChange = (event: SelectChangeEvent) => {
    // setAge("30");
    setpge(event.target.value);
  };
  const [taskpge, settaskpge] = useState("false");

  const handletaskChange = (event: SelectChangeEvent) => {
    // setAge("30");
    settaskpge(event.target.value);
  };
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
    new Date(2024, 1, 1)
  );
  const [chainEndDate, setChainEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [childTaskStartDate, setChildTaskStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [childTaskEndDate, setChildTaskEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [taskStartDate, setTaskStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [taskEndDate, setTaskEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [BenchTaskstartDate, setBenchTaskStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [BenchTaskendDate, setBenchTaskEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [BenchChildstartDate, setBenchChildStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [BenchChildendDate, setBenchChildEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
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
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const onChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: any) => {
    setIsPm(event as string);
  };
  const [istaskPm, settaskIsPm] = useState<string>("false");
  const handlePMtaskChange = (event: any) => {
    settaskIsPm(event as string);
  };
  //child task benchmark handlers
  const handleBenchChildStartDateChange = (newDate: Date | null) => {
    setBenchChildStartDate(newDate);
  };
  const handleBenchChildendDateChange = (newDate: Date | null) => {
    setBenchChildEndDate(newDate);
  };
  const getboolean = (val: string) => {
    if (val == "true") {
      return true;
    } else {
      return false;
    }
  };
  //Data for Child charts (Task charts) for selected chain
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      setData([]);
      const response = (await Tasknames({
        chain_id: selectedChainValue?.id || 2775,
        is_pm: getboolean(isPm),
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
      <h2
        style={{
          color: SecondaryColor,
          fontFamily: "roboto",
          fontSize: PageTitleFontSize,
          paddingTop: "60px",
          marginBottom: "0px",
          position: "absolute",
          left: "5%",
          // fontStyle: "italic",
        }}
      >
        Trend Analysis
      </h2>
      <div className="paperWrapper" style={{ paddingTop: "85px" }}>
        <div className="paperClass">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h3
              
              style={{
                color: SecondaryColor,
                maxWidth: "500px",
                minWidth: "200px",
                flex:1,
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis',
                fontSize:NormalFontSize,
                fontWeight:700,
                textAlign:'left'
              }}
            >
              Chain Level Analysis :{" "}
              {pge == "false"
                ? `${
                    selectedChainValue?.key ||
                    "Analytics Golden Copy - Mastered Analytics"
                  }`
                : `${
                    selectedChainValue?.key || "Security Position Loading Task"
                  }`}
            </h3>
            <div style={{width:'45%'}}></div>
            <div
              style={{ display: "flex",width:'15%',  marginRight: "1%" }}
            >
              <div
                style={{
                  fontSize: "13px",
                  marginRight: "13px",

                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                }}
              >
                System:
              </div>
              <FormControl
                variant="standard"
                sx={{
                  width: "100px",
                  marginTop: "5px",
                  ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                    {
                      fontSize: "13px",
                      paddingBottom: "0px",
                      // marginTop: "5px",
                      color: SecondaryColor,
                    },
                }}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={pge}
                  label="System"
                  onChange={handleChange}
                  sx={{ fontSize: NormalFontSize }}
                >
                  <MenuItem value={"false"} sx={{ fontSize: NormalFontSize }}>
                    SecMaster
                  </MenuItem>
                  <MenuItem value={"true"} sx={{ fontSize: NormalFontSize }}>
                    PriceMaster
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <StyledDatepickerContainer
              style={{ marginTop: "3px", marginBottom: "0px" }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: PrimaryColor,
                  color: SecondaryColor,
                  borderColor: SecondaryColor,
                  fontSize: NormalFontSize,
                  fontFamily: "roboto",
                  paddingBottom: "0px",
                  maxHeight: "30px",
                  paddingTop: "0px",
                }}
              >
                Child Tasks
              </Button>
            </StyledDatepickerContainer>
          </div>
          <Card sx={{ padding: "1px", backgroundColor: PrimaryColor }}>
            <div>
              <div
                style={{
                  display: "flex",
                  fontSize: NormalFontSize,
                  fontWeight: "lighter",
                  fontFamily: "roboto",
                  // marginLeft: "15px",
                  color: "#404040",
                }}
              >
                <div style={{ marginTop: "0px" }}>
                  <ChartFilter
                    onChainSelected={handleChainSelected}
                    onStartDateSelected={handleChainStartDateChange}
                    onEndDateSelected={handleChainEndDateChange}
                    onBenchStartDateSelected={handleBenchStartDateChange}
                    onBenchEndDateSelected={handleBenchendDateChange}
                    onBenchmarkComputeChange={onChange}
                    onDeviationChange={handleDeviationChange}
                    // onPmChange={handlePMChange}
                    pm={getboolean(pge)}
                  />
                </div>
                <div style={{ marginTop: "4px", marginLeft: "5px" }}>
                  <strong>Benchmark Data Duration: </strong>
                  <span>
                    {" "}
                    {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
                    {DateConversioninddMMMMyyyy(BenchendDate)}
                    &nbsp;{" | "} &nbsp;
                  </span>

                  <strong>Deviation % : </strong>

                  <span>{deviationPercentage}</span>
                </div>
              </div>
            </div>
          </Card>
          <div id="1293">
            {pge == "false" ? (
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
                    is_pm: getboolean(pge),
                  })
                }
                title="Chain Time"
                axisname="Chain Run Date"
              />
            ) : (
              <ChainChart
                fetchDataFunction={() =>
                  ChartChain({
                    chain_id: selectedChainValue?.id || 1,
                    startDate: chainStartDate,
                    endDate: chainEndDate,
                    benchStartDate: BenchstartDate,
                    benchEndDate: BenchendDate,
                    benchmarkCompute: benchmarkCompute,
                    deviationPercentage: deviationPercentage,
                    is_pm: getboolean(pge),
                  })
                }
                title="Chain Time"
                axisname="Chain Run Date"
              />
            )}
          </div>
        </div>
      </div>

      <div className="paperWrapper" style={{ paddingTop: "0px" }}>
        <div
          style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}
          className="paperClass"
        >
          <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}>
            <h3
              
              style={{
                color: SecondaryColor,
                maxWidth: "500px",
                minWidth: "200px",
                flex:1,
                whiteSpace:'nowrap',
                overflow:'hidden',
                textOverflow:'ellipsis',
                fontSize:NormalFontSize,
                fontWeight:700,
                textAlign:'left'
              }}
            >
              Task Level Analysis :{" "}
              {`${selectedTaskValue?.key || "CRD Loans Task"}`}
            </h3>
            <div
              style={{ display: "flex",width:'15%',  marginRight: "1%" }}
            >
              <div
                style={{
                  fontSize: "13px",
                  marginRight: "13px",

                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                }}
              >
                System:
              </div>
              <FormControl
                variant="standard"
                sx={{
                  width: "100px",
                  marginTop: "5px",
                  ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                    {
                      fontSize: "13px",
                      paddingBottom: "0px",
                      // marginTop: "5px",
                      color: SecondaryColor,
                    },
                }}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={taskpge}
                  label="System"
                  onChange={handletaskChange}
                  sx={{ fontSize: NormalFontSize }}
                >
                  <MenuItem value={"false"} sx={{ fontSize: NormalFontSize }}>
                    SecMaster
                  </MenuItem>
                  <MenuItem value={"true"} sx={{ fontSize: NormalFontSize }}>
                    PriceMaster
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <Card sx={{ padding: "1px", backgroundColor: PrimaryColor }}>
            <div style={{}}>
              <div
                style={{
                  display: "flex",
                  fontSize: NormalFontSize,
                  fontWeight: "lighter",
                  fontFamily: "roboto",
                  // marginLeft: "15px",
                  color: "#404040",
                }}
              >
                <TaskChartFilter
                  onTaskSelected={handleTaskSelected}
                  onStartDateSelected={handleTaskStartDateChange}
                  onEndDateSelected={handleTaskEndDateChange}
                  onBenchStartDateSelected={handleTaskBenchStartDateChange}
                  onBenchEndDateSelected={handleTaskBenchendDateChange}
                  onDeviationChange={handletaskDeviationChange}
                  onBenchmarkComputeChange={onChange}
                  // onPmChange={handlePMtaskChange}
                  pm={taskpge}
                />
                <div style={{ marginTop: "4px", marginLeft: "5px" }}>
                  <strong>Benchmark Data Duration: </strong>
                  <span>
                    {" "}
                    {DateConversioninddMMMMyyyy(BenchTaskstartDate)} to{" "}
                    {DateConversioninddMMMMyyyy(BenchTaskendDate)}
                    &nbsp;{" | "} &nbsp;
                  </span>

                  <strong>Deviation % : </strong>

                  <span>{taskdeviationPercentage}</span>
                </div>
              </div>
            </div>
          </Card>
          <div id="111">
            <ChainChart
              fetchDataFunction={() =>
                ChartTask({
                  flow_id: selectedTaskValue?.id || 1,
                  startDate: taskStartDate,
                  endDate: taskEndDate,
                  benchStartDate: BenchTaskstartDate,
                  benchEndDate: BenchTaskendDate,
                  deviationPercentage: taskdeviationPercentage,
                  benchmarkCompute: benchmarkCompute,
                  is_pm: getboolean(taskpge),
                })
              }
              title="Task Time"
              axisname="Task Run Date"
            />
          </div>
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          fullWidth
          maxWidth="xs"
          sx={{
            maxHeight: "calc(100vh - 200px)",
            top: "10%",
            maxWidth: "75%",
            left: "10%",
          }}
        >
          <div style={{ paddingBottom: "0px" }}>
            <DialogTitle
              sx={{
                color: SecondaryColor,
                fontFamily: "roboto",
                fontSize: PageTitleFontSize,
                display: "flex",
                paddingTop: "5px",
                paddingBottom: "5px !important",
                maxHeight: "30px",
              }}
              id="draggable-dialog-title"
              className="DialogTitle"
            >
              <h4 style={{ marginTop: "0px", marginBottom: "0px" }}>
                {" "}
                {pge == "false"
                  ? `${
                      selectedChainValue?.key ||
                      "Analytics Golden Copy - Mastered Analytics"
                    }`
                  : `${
                      selectedChainValue?.key ||
                      "Security Position Loading Task"
                    }`}
              </h4>
              <div style={{ position: "absolute", right: 5, top: 10 }}>
                <CloseButton onClick={handleClose}></CloseButton>
              </div>
            </DialogTitle>
          </div>
          <Card sx={{ padding: "1px", backgroundColor: PrimaryColor }}>
            <div
              style={{
                display: "flex",
                fontSize: NormalFontSize,
                fontWeight: "lighter",
                fontFamily: "roboto",
                marginLeft: "20px",
                color: "#404040",
              }}
            >
              <DateFilters
                onStartDateSelected={handleChildTaskStartDateChange}
                onEndDateSelected={handleChildTaskEndDateChange}
                onBenchStartDateSelected={handleBenchChildStartDateChange}
                onBenchEndDateSelected={handleBenchChildendDateChange}
              />
              <div style={{ marginTop: "4px", marginLeft: "5px" }}>
                <strong>Benchmark Data Duration: </strong>
                <span>
                  {" "}
                  {DateConversioninddMMMMyyyy(BenchChildstartDate)} to{" "}
                  {DateConversioninddMMMMyyyy(BenchChildendDate)}
                  &nbsp;{" | "} &nbsp;
                </span>

                <strong>Deviation % : </strong>

                <span>{deviationPercentage}</span>
              </div>
            </div>
          </Card>
          <DialogContent
            dividers={true}
            style={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 300px)",
              height: "100%",
            }}
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
                <div className="paperClass">
                  <div className="titleHolder">
                    <h3
                      style={{
                        color: SecondaryColor,
                        fontFamily: "sans-serif",
                      }}
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
                          is_pm: getboolean(pge),
                        })
                      }
                      title="Task Time"
                      axisname="Task Run Date"
                    />
                  </div>
                </div>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Charts;
