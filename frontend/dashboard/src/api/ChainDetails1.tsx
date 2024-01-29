import { apiService } from "./ApiService";

interface TaskProps {
 row:any
}

async function ChainDetails1({ row}: TaskProps) {
  try {
    // console.log(startDate);
    // const params = {
    //   startTime: startDate,
    // };
    const response = await apiService.get(
      `/taskss/tasktimes/${row.chain_id}/${row.start_time}/${row.end_time}`
    );
    console.log(response);
    return response; // Assuming you want to return the data property of the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default ChainDetails1;
