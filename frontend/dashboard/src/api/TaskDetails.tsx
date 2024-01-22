import { apiService } from "./ApiService";

interface TaskProps {
  chain_id: number | null;
  startTime?: any | null;
  endTime?:any|null
}

async function TaskDetails({ chain_id, startTime,endTime }: TaskProps) {
  try {
    // console.log(startDate);
    // const params = {
    //   startTime: startDate,
    // };
    const response = await apiService.get(
      `/taskss/tasktimes/${chain_id}/${startTime}/${endTime}`
    );
    console.log(response);
    return response; // Assuming you want to return the data property of the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default TaskDetails;
