import { apiService } from "./configurations/ApiService";
import { DateConversion } from "../utils/DateConversion";

interface GanttProps {
chain_id:any|null;
  date: any | null;
  benchStartDate: any | null;
  benchEndDate: any | null;
  benchmarkCompute?: any | null;
  deviationPercentage?: any | null;
  is_pm:boolean
}
async function GetTaskDetailsByChainGuid({
  chain_id=null,
 
  date = null,
  benchStartDate = null,
  benchEndDate = null,
  benchmarkCompute = null,
  deviationPercentage = null,
  is_pm=false
}: GanttProps) {
  try {
    const selectedDate = DateConversion(date);
    const benstartdate = DateConversion(benchStartDate);
    const benenddate = DateConversion(benchEndDate);
    // let is_pm=false;
    let url = `/defaultGanttData/${is_pm}`;
    let params = {};

      url = `/tasksdetailsbyChainguid/${chain_id}/${selectedDate}/${benstartdate}/${benenddate}/${benchmarkCompute}/${deviationPercentage}/${is_pm}`;
    

    console.log("API URL:", url);
    console.log("Params:", params);

    const response = await apiService.get(url);
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default GetTaskDetailsByChainGuid;
