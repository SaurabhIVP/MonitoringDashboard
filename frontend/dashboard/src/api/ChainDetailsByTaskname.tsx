import axios from "axios";
import { DateConversion } from "../utils/DateConversion";
const API_URL = process.env.REACT_APP_API_BASE_URL;

interface Props {
  tasknames: any | null;
  startDate?: any | null; // Assuming you're using string for date format, adjust if needed
  endDate?: any | null;
  benchStartDate?: any | null;
  benchEndDate?: any | null;
}

async function ChainDetailsByTaskname({
  tasknames,
  startDate,
  endDate,
  benchStartDate,
  benchEndDate,
}: Props) {
  try {
    const startInProperFormat = DateConversion(startDate);
    const endInProperFormat = DateConversion(endDate);
    const benchmarkStartInProperFormat = DateConversion(benchStartDate);
    const benchmarkEndInProperFormat = DateConversion(benchEndDate);
    const url = `${API_URL}/chainDetailsByTaskname`;
    const params = {
      tasknames: tasknames,
      startDate: startInProperFormat,
      endDate: endInProperFormat,
      benchStartDate: benchmarkStartInProperFormat,
      benchEndDate: benchmarkEndInProperFormat,
    };
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainDetailsByTaskname;
