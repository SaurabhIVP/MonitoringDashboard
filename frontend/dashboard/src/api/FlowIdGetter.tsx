import { apiService } from "./configurations/ApiService";

interface TaskProps {
  taskname: string | null;
  chainname: string | null;
  is_pm:boolean
}

async function FlowIdGetter({ taskname, chainname,is_pm }: TaskProps) {
  try {
    // let is_pm=false;
    const response = await apiService.get(
      `/getFlowId/${taskname}/${chainname}/${is_pm}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default FlowIdGetter;
