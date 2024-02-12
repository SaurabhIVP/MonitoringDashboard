import { apiService } from "./configurations/ApiService";
import { DateConversion } from "../utils/DateConversion";

interface GanttProps {
  chains: string[] | null;
  starttime: any | null;
  endtime: any | null;
  date: any | null;
}

async function GanttData({
  chains = null,
  starttime = null,
  endtime = null,
  date = null,
}: GanttProps) {
  try {
    const selectedDate = DateConversion(date);
    if (chains == null || starttime == null || endtime == null) {
      const response = await apiService.get(`/tasks`);
      return response;
    } else {
      const response = await apiService.get(
        `/tasks/${selectedDate}/${starttime}/${endtime}/${chains}`
      );
      console.log(response);
      return response;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export default GanttData;
