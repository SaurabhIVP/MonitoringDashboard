import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import { format } from "date-fns-tz";
import TaskDetails from "../api/TaskDetails";
import { Button } from "@mui/material";

function createData(
  chain_name: string | null,
  chain_id: number | null,
  start_time: string | null,
  end_time: any | null,
  date: string | null,
  chain_guid: string,
  total_times: number,
  avg_total_time: number,
  performance: number
) {
  return {
    chain_id,
    chain_name,
    start_time,
    end_time,
    total_times,
    date,
    chain_guid,
    avg_total_time,
    performance,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
const formatDateString = (dateString: string | null): string => {
  if (!dateString) return ""; // Return empty string for null or undefined input

  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss", {
    timeZone: "Your-Time-Zone", // Specify your desired time zone
  });
};
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await TaskDetails({
          chain_id: row.chain_id,
          startTime: row.start_time,
          endTime: row.end_time,
        })) as any;
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, row.chain_id, row.date]);

  const formatDate = (datestring: any | null) => {
    const start = new Date(datestring);
    const start_time = format(start, "yyyy-MM-dd", {
      timeZone: "Asia/Kolkata",
    });
    return start_time;
  };
  const getDeviationColor = (chainDuration: number, benchmarkDuration: number) => {
    return chainDuration > benchmarkDuration ? "red" : "green";
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row" style={{ fontSize: "12px" }}>
          {row.chain_name}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" }}>
          {formatDate(row.date)}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" }}>
          {formatDateString(row.start_time)}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" }}>
          {formatDateString(row.end_time)}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" }}>
          {row.total_times}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" }}>
          {row.avg_total_time}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "12px" ,fontWeight:'bold',color:getDeviationColor(row.total_times,row.avg_total_time)}}>
          {row.performance}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Task Data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "12px" }}>
                      Task Name
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      Start Time
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>End Time</TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      Duration (In Seconds)
                    </TableCell>
                    <TableCell style={{ fontSize: "12px" }}>
                      Benchmark Duration (In Seconds)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow>
                      <TableCell style={{ fontSize: "12px" }}>
                        {item.task_name}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {formatDateString(item.start_time)}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {formatDateString(item.end_time)}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {item.total_times}
                      </TableCell>
                      <TableCell style={{ fontSize: "12px" }}>
                        {item.avg_total_time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [createData("Frozen yoghurt", 159, 6.0, 24, "4.0", 3.99, 7, 8)];
interface BasicLineChartProps {
  fetchDataFunction: () => Promise<any>;
}

const CollapsibleTable: React.FC<BasicLineChartProps> = ({
  fetchDataFunction,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState(false);
  const buttonHandler = () => {
    setFilter(true);
  };
  const fetchData = async () => {
    try {
      setData([]);
      const response = await fetchDataFunction();
      console.log(response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    setFilter(false);
  }, [filter]);

  return (
    <div>
      <Button
        variant="contained"
        onClick={buttonHandler}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "10px",
          borderRadius: "5px",
          backgroundColor: "#009B77",
          color: "white",
          fontSize: "12px", // Adjust font size
        }}
      >
        SUBMIT
      </Button>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Table aria-label="collapsible table" size="small">
          {" "}
          {/* Set table size to small */}
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>
                Chain Name
              </TableCell>{" "}
              {/* Adjust font size */}
              {/* ... (similar adjustments for other headers) */}
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>Date</TableCell>
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>Start Time</TableCell>
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>End Time</TableCell>
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>Chain Duration</TableCell>
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>
                Benchmark Duration
              </TableCell>
              <TableCell style={{ fontSize: "12px" ,color:'white'}}>Deviation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row key={row.date} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollapsibleTable;
