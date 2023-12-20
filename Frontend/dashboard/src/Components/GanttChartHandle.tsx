import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import MultiSelect from "./MultiSelect";
import AllData from "../Api/AllData";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GanttData from "../Api/GanttData";
import GanttChart from "./GanttChart";

const GanttChartHandle = () => {
  const [multichains, setMultichains] = useState<string[]>([]);
  const [ganttstartTime, setGanttStartTime] = useState<Date | null>(null)
  const [ganttendTime, setGanttEndTime] = useState<Date | null>(null);
  const [filteredData,setFilteredData]=useState<any[]>([]);
  const [filter,setfilter]=useState(false);

  const HandleMultichains = (values: string[]) => {
    setMultichains(values);
  }
  const handleGanttStartTimeChange = (time: Date | null) => {
    setGanttStartTime(time);
  };
  const handleGanttEndTimeChange = (time: Date | null) => {
    setGanttEndTime(time);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);
  
  const fetchData = async () => {
    try {
        const response = await GanttData({chains:multichains,starttime:ganttstartTime,endtime:ganttendTime});
        setFilteredData(response.data);
        console.log(filteredData);
        setfilter(false);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

  const ButtonHandler=()=>{
    console.log(filteredData);
    setfilter(true);
  }
  
  return (
    <div>
      <div style={{borderStyle:'ridge', paddingTop:'10px'}}>
        <div className="searchbar"  >
          
          <div style={{display:'flex',position:'relative',paddingBottom:'10px'}}>
            <div style={{paddingRight:'150px'}}>
          <MultiSelect fetchDataFunction={AllData} NameParam="chain_name" Label="Search chains" onSearch={HandleMultichains}></MultiSelect>
          </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{paddingRight:'150px'}}>
            
              <DateTimePicker label="Gantt Start time" value={ganttstartTime} onChange={handleGanttStartTimeChange} />
            </div>
            <div style={{paddingRight:'15px'}}>
              <DateTimePicker label="Gantt End time" value={ganttendTime} onChange={handleGanttEndTimeChange} />
              </div>
            </LocalizationProvider>
            
          </div>
          
        </div>
        <Button variant="contained" onClick={ButtonHandler} size="medium" style={{ borderRadius: "100px"}}>Submit</Button>
        <GanttChart data={filteredData} starttime={ganttstartTime}
                endtime={ganttendTime}></GanttChart>
      </div>
     
    </div>
  )

}
export default GanttChartHandle;