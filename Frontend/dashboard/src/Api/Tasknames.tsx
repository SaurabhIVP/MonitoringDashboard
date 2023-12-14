import axios from "axios";

interface TaskProps {
    chain_id: number|null;
}

async function Tasknames({chain_id}: TaskProps) {
    try {
        const response = await axios.get(`https://localhost:7022/api/Data/tasks/${chain_id}`);
        // console.log(chainname);
        return response; // Assuming you want to return the data property of the response
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default Tasknames;