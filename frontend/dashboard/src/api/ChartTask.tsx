import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
const API_URL = process.env.REACT_APP_API_BASE_URL;

interface TaskProps {
  flow_id: number | null;
  startDate?: any | null; 
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?: any | null;
  deviationPercentage?: any | null;
  is_pm:boolean
}

async function ChartTask({
  flow_id,
  startDate,
  endDate,
  benchStartDate,
  benchEndDate,
  benchmarkCompute,
  deviationPercentage,
  is_pm
}: TaskProps) {
  try {
    const startInProperFormat = DateConversion(startDate);
    const endInProperFormat = DateConversion(endDate);
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    // let is_pm=false;
    const url = `${API_URL}/chartTimes/${is_pm}`;
    
    const params = {
      flow_id: flow_id,
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage,
      // is_pm:false
    } as any;

    const response = await axios.get(url, { params });
    const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
console.log("Full URL:", fullUrl);
    console.log(response);
    return response.data; // Assuming you want to return the data property of the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChartTask;
