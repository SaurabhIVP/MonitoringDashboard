import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
const API_URL = process.env.REACT_APP_API_BASE_URL;

interface Props {
  tasknames: any | null;
  startDate?: any | null; // Assuming you're using string for date format, adjust if needed
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?:any |null;
  deviationPercentage?:any |null;
  is_pm:boolean
}

async function ChainDetailsByTaskname({
  tasknames,
  startDate,
  endDate,
  benchStartDate,
  benchEndDate,
  benchmarkCompute,
  deviationPercentage,
  is_pm
}: Props) {
  try {
    const startInProperFormat = DateConversion(startDate);
    const endInProperFormat = DateConversion(endDate);
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    // let is_pm=false;
    const url = `${API_URL}/chainDetailsByTaskname/${is_pm}`;
    const params = {
      tasknames: tasknames,
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage,
      
    };
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainDetailsByTaskname;
