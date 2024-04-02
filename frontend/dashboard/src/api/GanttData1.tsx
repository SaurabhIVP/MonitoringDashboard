import { apiService } from "./configurations/ApiService";
import { DateConversion } from "../utils/DateConversion";

interface GanttProps {
  chains: string[] | null;
  starttime: any | null;
  endtime: any | null;
  date: any | null;
  benchStartDate: any | null;
  benchEndDate: any | null;
  benchmarkCompute?: any | null;
  deviationPercentage?: any | null;
  is_pm:boolean
}
async function GanttData1({
  chains = null,
  starttime = null,
  endtime = null,
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
    let url = `/tasks/${is_pm}`;
    let params = {};

    if (chains != null && starttime != null && endtime != null) {
      url = `/tasks1/${selectedDate}/${benstartdate}/${benenddate}/${benchmarkCompute}/${deviationPercentage}/${is_pm}/${chains}`;
    }

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

export default GanttData1;
