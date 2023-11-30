import axios from "axios";
import exp from "constants";

interface GanttProps {
    startTime: Date;  // Adjust the type to Date
    endTime: Date;    // Adjust the type to Date
}


async function GanttData2({startTime,endTime}: GanttProps) {
    try {
        const response = await axios.get(`https://localhost:7022/api/Data/tasks/${startTime}/${endTime}`);
       console.log(response.data);
        return response; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export default GanttData2;