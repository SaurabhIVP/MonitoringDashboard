import { useEffect, useState } from "react";
import GanttData from "../../api/GanttData";
import GanttChart from "./GanttChart";
import GanttFilter from "../filters/GanttFilter";
import { Chip, ListItem, Typography } from "@mui/material";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import GanttData1 from "../../api/GanttData1";

const GanttChartHandle = () => {
  const [multichains, setMultichains] = useState<string[]>([]);
  const [ganttstartTime, setGanttStartTime] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [startTime, setStartTime] = useState<any | null>("00:00:00");
  const [endTime, setEndTime] = useState<any | null>("23:59:59");
  const [BenchstartDate, setBenchStartDate] = useState<Date | any>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | any>(
    new Date(2024, 0, 24)
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
  useEffect(() => {
    fetchData();
  }, [filter]);
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const fetchData = async () => {
    try {
      const response = await GanttData1({
        chains: multichains,
        starttime: startTime,
        endtime: endTime,
        date: ganttstartTime,
        benchStartDate: BenchstartDate,
        benchEndDate: BenchendDate,
        benchmarkCompute: benchmarkCompute,
        deviationPercentage: deviationPercentage,
      });
      setFilteredData(response as any[]);
      console.log(filteredData);
      setfilter(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterHandler = () => {
    console.log(filteredData);
    setfilter(true);
  };
  return (
    <div>
      <div>
        <div>
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
          ></GanttFilter>
        </div>
        {/* <ListItem>
          
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold",fontSize:'small' }}>Benchmark Duration:</span>{" "}
                <span style={{fontSize:'small' }}>
                  {DateConversioninddMMMMyyyy( BenchstartDate)} to {DateConversioninddMMMMyyyy(BenchendDate)}
                </span>{" "}
              </Typography>
            }
            style={{marginRight:'10px'}}
          />
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold",fontSize:'small' }}>Deviation:</span>{" "}
                <span style={{fontSize:'small' }}>{deviationPercentage} %</span>{" "}
              </Typography>
            }
            style={{marginRight:'10px'}}
          />
          <Chip
          label={
            <Typography component="span">
              <span style={{ fontWeight: "bold",fontSize:'small' }}>Benchmark Compute Type:</span>{" "}
              <span style={{fontSize:'small' }}>Average</span>{" "}
            </Typography>
          }
        />
        </ListItem> */}
        <div
          style={{
            display: "flex",
            fontSize: "small",
            fontWeight: "bold",
            fontFamily: "roboto",
            marginLeft: "65px",
          }}
        >
          <span>Benchmark Data Duration: </span>
          <span>
            {" "}
            {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
            {DateConversioninddMMMMyyyy(BenchendDate)}
            {" | "}
          </span>
          
          <span>Deviation % : </span>

          <span>{deviationPercentage}</span>
        </div>
        <GanttChart
          data={filteredData}
          starttime={startTime}
          endtime={endTime}
          date={ganttstartTime}
          benchstart={BenchstartDate}
          benchend={BenchendDate}
        ></GanttChart>
      </div>
    </div>
  );
};
export default GanttChartHandle;
