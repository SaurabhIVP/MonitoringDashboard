import { useEffect, useState } from "react";
import GanttData from "../../api/GanttData";
import GanttChart from "./GanttChart";
import GanttFilter from "../filters/GanttFilter";

const GanttChartHandle = () => {
  const [multichains, setMultichains] = useState<string[]>([]);
  const [ganttstartTime, setGanttStartTime] = useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [startTime, setStartTime] = useState<any | null>("00:00:00");
  const [endTime, setEndTime] = useState<any | null>("23:59:59");
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
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
  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await GanttData({
        chains: multichains,
        starttime: startTime,
        endtime: endTime,
        date: ganttstartTime,
        benchStartDate: BenchstartDate,
        benchEndDate: BenchendDate,
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
        <div style={{paddingTop:10}}>
          <GanttFilter
            onFilter={filterHandler}
            onChainSelected={HandleMultichains}
            onStartDateSelected={handleGanttStartTimeChange}
            onStartTimeSelected={handleStartTimeChange}
            onEndTimeSelected={handleEndTimeChange}
            onBenchStartDateSelected={handlebenStartTimeChange}
            onBenchEndDateSelected={handlebenEndTimeChange}
          ></GanttFilter>
        </div>

        <GanttChart
          data={filteredData}
          starttime={startTime}
          endtime={endTime}
          date={ganttstartTime}
        ></GanttChart>
      </div>
    </div>
  );
};
export default GanttChartHandle;
