import axios from "axios";
import exp from "constants";
import { format,utcToZonedTime,getTimezoneOffset,formatInTimeZone } from 'date-fns-tz';
import { enUS } from "date-fns/locale";
import { enIN } from "date-fns/locale";
interface GanttProps {
    starttime: any|null;  // Adjust the type to Date
    endtime: any | null;    // Adjust the type to Date
}


async function GanttData2({starttime,endtime}: GanttProps) {
    try {
        // const timeZone = 'America/New_York'
        // const zoneString = format(utcToZonedTime(starttime, timeZone), "yyyy-MM-dd HH:mm:ssXXX", {
        // timeZone,
        // locale: enUS
        // });
        const start = new Date(starttime);
        // formatInTimeZone(date, 'America/New_York', 'yyyy-MM-dd HH:mm:ssXXX')
        // const start_time=format(starttime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: '' });
        // const end_time=format(endtime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'Asia/Kolkata' });
        const end=new Date(endtime);
        
        const start_time = format(start, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        const end_time = format(end, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        console.log(start_time);
        console.log(end_time);
        const response = await axios.get(`https://localhost:7022/api/Data/tasks/${start_time}/${end_time}`);
       console.log(response.data);
        return response; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
export default GanttData2;