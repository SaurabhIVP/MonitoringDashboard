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
import { TaskHeaders, TaskLabels, chainHeaders, chainLabels } from "./TableContents";



const formatDateString = (dateString: string | null): string => {
  if (!dateString) return ""; // Return empty string for null or undefined input

  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd HH:mm:ss", {
    timeZone: "Your-Time-Zone", // Specify your desired time zone
  });
};
function Row(props: { row: any; childDataFunction: () => void }) {
  const { row, childDataFunction } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData([]);
        const response = (await childDataFunction()) as any;
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, row.chain_id, row.date, childDataFunction]);

  const formatDate = (datestring: any | null) => {
    const start = new Date(datestring);
    const start_time = format(start, "yyyy-MM-dd", {
      timeZone: "Asia/Kolkata",
    });
    return start_time;
  };
  const getDeviationColor = (
    chainDuration: number,
    benchmarkDuration: number
  ) => {
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
        {chainLabels.map((x: any) =>
          x === "performance" ? ( // Render nothing or add your logic for 'performance'
            <TableCell
              align="right"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: getDeviationColor(row.total_times, row.avg_total_time),
              }}
            >
              {row.performance}
            </TableCell>
          ) : (
            <TableCell key={x} scope="row" style={{ fontSize: "12px" }}>
              {row[x]}
            </TableCell>
          )
        )}
    
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {
                      TaskHeaders.map((x)=>(
                        <TableCell style={{ fontSize: "12px" }}>
                      {x}
                    </TableCell>
                      ))
                    }
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow>
                      {
                        TaskLabels.map((x)=> x === "performance" ? ( // Render nothing or add your logic for 'performance'
                        <TableCell
                          align="right"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: getDeviationColor(item.total_times, item.avg_total_time),
                          }}
                        >
                          {item.performance}
                        </TableCell>
                      ) :(
                          <TableCell style={{ fontSize: "12px" }}>
                        {item[x]}
                      </TableCell>
                        ))
                      }

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


interface BasicLineChartProps {
  fetchDataFunction: () => Promise<any>;
  taskDetailsFunction: (params: TaskDetailsParams) => void;
}
interface TaskDetailsParams {
  chain_id: number;
  startTime: string;
  endTime: string;
}
const CollapsibleTable: React.FC<BasicLineChartProps> = ({
  fetchDataFunction,
  taskDetailsFunction,
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
      setData(response || []);
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
        Show Results
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
              {
                chainHeaders.map((x)=>(
                  <TableCell style={{ fontSize: "12px", color: "white" }}>
                {x}
              </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Row
                key={row.date}
                row={row}
                childDataFunction={() =>
                  taskDetailsFunction({
                    chain_id: row.chain_id,
                    startTime: row.start_time,
                    endTime: row.end_time,
                  })
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollapsibleTable;
