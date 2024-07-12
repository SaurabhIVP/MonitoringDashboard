import { useEffect, useState } from "react";
import GanttData from "../../api/GanttData";
import GanttChart from "./GanttChart";
import GanttFilter from "../filters/GanttFilter";
import {
  Card,
  Chip,
  CircularProgress,
  FormControl,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import GanttData1 from "../../api/GanttData1";
import {
  NormalFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";
import { StyledDatepickerContainer } from "../../utils/StyledComponents";
import Datepicker from "../generics/datepicker/Datepicker";

const GanttChartHandle = () => {
  const [multichains, setMultichains] = useState<string[]>([]);
  const [ganttstartTime, setGanttStartTime] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [startTime, setStartTime] = useState<any | null>("00:00:00");
  const [endTime, setEndTime] = useState<any | null>("23:59:59");
  const [BenchstartDate, setBenchStartDate] = useState<Date | any>(
    new Date(2024, 1, 1)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | any>(
    new Date(2024, 1, 7)
  );
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filter, setfilter] = useState(false);
  const handleStartTimeChange = (val: any | null) => {
    setStartTime(val);
  };
  const handlebenStartTimeChange = (val: any | null) => {
    setBenchStartDate(val);
  };
  const handlebenEndTimeChange = (val: any | null) => {
    setBenchEndDate(val);
  };
  const handleEndTimeChange = (val: any | null) => {
    setEndTime(val);
  };
  const HandleMultichains = (values: string[]) => {
    setMultichains(values);
  };
  const handleGanttStartTimeChange = (time: Date | null) => {
    setGanttStartTime(time);
  };
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const BenchonChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
  const getboolean = (val: any) => {
    if (val == "true" || val == true) {
      return true;
    } else {
      return false;
    }
  };
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 1, 7));
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: any) => {
    console.log(event);
    setIsPm(event);
  };

  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const [pge, setpge] = useState("false");

  const handleChange = (event: SelectChangeEvent) => {
    // setAge("30");
    setpge(event.target.value);
  };
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GanttData1({
        chains: multichains,
        starttime: startTime,
        endtime: endTime,
        date: startDate,
        benchStartDate: BenchstartDate,
        benchEndDate: BenchendDate,
        benchmarkCompute: benchmarkCompute,
        deviationPercentage: deviationPercentage,
        is_pm: getboolean(pge),
      });
      setFilteredData(response as any[]);
      console.log(filteredData);
      setfilter(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filter, pge, startDate]);
  const filterHandler = () => {
    console.log(filteredData);
    setfilter(true);
  };
  return (
    <div style={{ width: "100%" }}>
      <div>
        <div style={{ display: "flex", marginLeft: "40px" }}>
          <h2
            style={{
              color: SecondaryColor,
              fontFamily: "roboto",
              fontSize: "17px",
              marginTop: "7px",
            }}
          >
            Daily Gantt
          </h2>
          <div
            style={{
              fontSize: "13px",
              marginRight: "13px",
              marginLeft: "65%",
              marginTop: "12px",
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
              marginTop: "6px",
              ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  fontSize: "13px",
                  paddingBottom: "0px",
                  marginTop: "0px",
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
          <StyledDatepickerContainer
            style={{ marginLeft: "5%", marginBottom: 0 }}
          >
            <div
              style={{
                fontSize: "13px",
                marginRight: "13px",
                marginTop: "12px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
              }}
            >
              Date:
            </div>
            <div style={{ marginTop: "6px" }}>
              <Datepicker
                name="Task Start Date"
                selectedDate={startDate}
                onDateChange={handleStartDateChange}
                flag={true}
              />
            </div>
          </StyledDatepickerContainer>
        </div>
        <Card
          sx={{
            padding: "1px",
            backgroundColor: PrimaryColor,
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: NormalFontSize,
              fontVariant: "jis78",
              fontFamily: "roboto",
              color: "#404040",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <GanttFilter
              onFilter={filterHandler}
              onChainSelected={HandleMultichains}
              onStartDateSelected={handleGanttStartTimeChange}
              onStartTimeSelected={handleStartTimeChange}
              onEndTimeSelected={handleEndTimeChange}
              onBenchStartDateSelected={handlebenStartTimeChange}
              onBenchEndDateSelected={handlebenEndTimeChange}
              onBenchmarkComputeChange={BenchonChange}
              onDeviationChange={handleDeviationChange}
              onPmChange={handlePMChange}
            ></GanttFilter>
            <div style={{ marginTop: "4px" }}>
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
        </Card>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            marginBottom: "0px",
            marginTop: "5px",
            fontFamily: "roboto",
            color: "gray",
            marginLeft: "2%",
          }}
        >
          *Click on Chain Names for Task Data
        </div>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <GanttChart
          data={filteredData}
          starttime={startTime}
          endtime={endTime}
          date={startDate}
          benchstart={BenchstartDate}
          benchend={BenchendDate}
          is_pm={getboolean(pge)}
        ></GanttChart>
      </div>
    </div>
  );
};
export default GanttChartHandle;
