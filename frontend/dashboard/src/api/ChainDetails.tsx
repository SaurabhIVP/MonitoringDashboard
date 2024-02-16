import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
interface ChainDetailsProps {
  chain_id: number | null;
  startDate?: any | null; // Assuming you're using string for date format, adjust if needed
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?:any |null;
  deviationPercentage?:any |null;
}
const API_URL = process.env.REACT_APP_API_BASE_URL;
async function ChainDetails({
  chain_id,
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
    if (deviationPercentage == undefined || deviationPercentage == "" || deviationPercentage == null )
    {
      deviationPercentage=0;
    }
    const url = `${API_URL}/chaindetails/${chain_id}`;
    const params = {
      
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage
    };
    console.log(params);
    const response = await axios.get(url, { params });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainDetails;
