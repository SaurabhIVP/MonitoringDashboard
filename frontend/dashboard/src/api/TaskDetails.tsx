import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
import { apiService } from "./configurations/ApiService";

interface TaskProps {
  chain_id?: number | null;
  startTime?: any | null;
  endTime?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?:any |null;
  deviationPercentage?:any |null;
  is_pm:boolean
}
const API_URL = process.env.REACT_APP_API_BASE_URL;
async function TaskDetails({ chain_id, startTime, endTime,benchStartDate,benchEndDate,benchmarkCompute,deviationPercentage,is_pm }: TaskProps) {
  try {
    const startInProperFormat = startTime;
    const endInProperFormat = endTime;
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    if (deviationPercentage == undefined || deviationPercentage == "" || deviationPercentage == null )
    {
      deviationPercentage=0;
    }
    // let is_pm=false;
    const url = `${API_URL}/taskdetails/${chain_id}/${is_pm}`;
    const params = {
      
      startTime: startInProperFormat,
      endTime: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage,
      
    };
    console.log(params);
    const response = await axios.get(url, { params });
    console.log(response.data);
    return response.data;  // Assuming you want to return the data property of the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default TaskDetails;
