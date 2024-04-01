import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
const API_URL = process.env.REACT_APP_API_BASE_URL;

//IMPORTANT = Difference between ChartChain and ChainDetails in ChainDetails in instance-specific and 
//ChartChain is Daywise

interface TaskProps {
  chain_id: number | null;
  startDate?: any | null; 
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
  benchmarkCompute?: any | null;
  deviationPercentage?: any | null;
}

async function ChartChain({
  chain_id,
  startDate,
  endDate,
  benchStartDate,
  benchEndDate,
  benchmarkCompute,
  deviationPercentage
}: TaskProps) {
  try {
    const startInProperFormat = DateConversion(startDate);
    const endInProperFormat = DateConversion(endDate);
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    const url = `${API_URL}/chart`;
    const params = {
      chain_id: chain_id,
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
      benchmarkCompute: benchmarkCompute,
      deviationPercentage: deviationPercentage,
    };
    const response = await axios.get(url, { params });
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChartChain;
