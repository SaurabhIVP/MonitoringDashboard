import axios from "axios";
import { format,utcToZonedTime,getTimezoneOffset,formatInTimeZone } from 'date-fns-tz';

interface GanttProps {
    chains:string[]|null;
    starttime: any|null;  // Adjust the type to Date
    endtime: any|null ;    // Adjust the type to Date
}

async function GanttData({chains=null,starttime=null,endtime=null}: GanttProps) {
    try {
        const start = new Date(starttime);
        const end=new Date(endtime);
        const start_time = format(start, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        const end_time = format(end, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        if(chains==null || starttime==null || endtime==null){
            const response = await axios.get(`https://localhost:7022/api/Data/tasks`);
           return response;
        }else{
            const response = await axios.get(`https://localhost:7022/api/Data/tasks/${start_time}/${end_time}/${chains}`);
            return response; 
        }
        // Assuming you want to return the data property of the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export default GanttData;