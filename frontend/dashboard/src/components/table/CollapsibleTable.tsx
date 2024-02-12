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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import {
  TaskHeaders,
  TaskLabels,
  chainHeaders,
  chainLabels,
} from "./TableContents";
import { SecondaryColor } from "../../utils/Colors";


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
          x === chainLabels[chainLabels.length - 1] ? (
            <TableCell
              align="center"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: getDeviationColor(row.total_times, row.avg_total_time),
              }}
            >
              {row.performance}
            </TableCell>
          ) : (
            <TableCell align="center" key={x} scope="row" style={{ fontSize: "12px" }}>
              {row[x]}
            </TableCell>
          )
        )}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={TaskLabels.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{ backgroundColor: SecondaryColor }}>
                    {TaskHeaders.map((x) => (
                      <TableCell
                      align="center"
                        style={{
                          fontSize: "12px",
                          color:"white",
                          backgroundColor: SecondaryColor,
                        }}
                      >
                        {x}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow>
                      {TaskLabels.map((x) =>
                        x === TaskLabels[TaskLabels.length - 1] ? ( // Render nothing or add your logic for 'performance'
                          <TableCell
                            align="center"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: getDeviationColor(
                                item.total_times,
                                item.avg_total_time
                              ),
                            }}
                          >
                            {item.performance}
                          </TableCell>
                        ) : (
                          <TableCell align="center" style={{ fontSize: "12px" }}>
                            {item[x]}
                          </TableCell>
                        )
                      )}
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
  }, [fetchDataFunction]);

  return (
    <div style={{ paddingTop: 30 }}>
      <TableContainer
     style={{ maxHeight: "650px", overflowY: "auto" }}
        component={Paper}
        
      >
        <Table aria-label="collapsible table" size="small" >
          {" "}
          <TableHead style={{position:'sticky',top: 0, zIndex: 1}}>
            <TableRow>
              <TableCell style={{ backgroundColor: SecondaryColor }} />
              {chainHeaders.map((x) => (
                <TableCell
                align="center"
                  style={{
                    fontSize: "12px",
                    color: "white",
                    backgroundColor: SecondaryColor,
                  }}
                >
                  {x}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {data.map((row) => (
              <Row 
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
