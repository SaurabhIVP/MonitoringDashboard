import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
import { apiService } from "./configurations/ApiService";
interface ChainDetailsProps {
  startDate?: any | null; // Assuming you're using string for date format, adjust if needed
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?:any |null;
  deviationPercentage?:any |null;
}
const API_URL = process.env.REACT_APP_API_BASE_URL;
async function CurrentData({
  startDate,
  endDate,
  benchStartDate,
  benchEndDate,
  benchmarkCompute,
  deviationPercentage
}: ChainDetailsProps) {
  try {
    const startInProperFormat = DateConversion(startDate);
    const endInProperFormat = DateConversion(endDate);
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    let is_pm=false;
    const params = {
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage,
     
    };
    console.log(params);
    const url = `${API_URL}/currentData/${is_pm}`;
    const response = await axios.get(url, { params });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default CurrentData;
