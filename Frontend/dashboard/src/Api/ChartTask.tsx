import axios from "axios";
import { format } from "date-fns-tz";

interface TaskProps {
    flow_id: number | null;
    startDate?: any | null; // Assuming you're using string for date format, adjust if needed
    endDate?: any | null;
    benchStartDate?: any | null;
    benchEndDate?: any | null;
}

async function ChartTask({ flow_id, startDate, endDate, benchStartDate, benchEndDate }: TaskProps) {
    try {
        const start = new Date(startDate);
        const end=new Date(endDate);
        const benStart=new Date(benchStartDate);
        const benEnd=new Date(benchEndDate);
        const start_time = format(start, 'yyyy-MM-dd', { timeZone: 'Asia/Kolkata' });
        const end_time = format(end, 'yyyy-MM-dd', { timeZone: 'Asia/Kolkata' });
        const benstart_time = format(benStart, 'yyyy-MM-dd', { timeZone: 'Asia/Kolkata' });
        const bencend_time = format(benEnd, 'yyyy-MM-dd', { timeZone: 'Asia/Kolkata' });
        const url = `https://localhost:7022/api/Data/chart/tasktimes/${flow_id}`;
        const params = {
            startDate: start_time,
            endDate: end_time,
            benchStartDate: benstart_time,
            benchEndDate: bencend_time
        };

        const response = await axios.get(url, { params });
        console.log(params);
        return response; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default ChartTask;
