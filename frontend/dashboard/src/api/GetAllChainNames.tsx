import { apiService } from "./configurations/ApiService";
interface props{
  is_pm:boolean
}
async function GetAllChainNames({is_pm}:props) {
  try {
    const response = await apiService.get(`/chainnames/${is_pm}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default GetAllChainNames;
