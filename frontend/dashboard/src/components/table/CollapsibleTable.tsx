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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  TaskHeaders,
  TaskLabels,
  chainHeaders,
  chainLabels,
} from "./TableContents";
import { PrimaryColor, SecondaryColor } from "../../utils/Colors";
import ScrollTop from "../generics/ScrollTop";

function Row(props: { row: any | null; childDataFunction: () => void | null }) {
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
  const getDeviationIconStyling = (
    chainDuration: number,
    benchmarkDuration: number
  ) => {
    if (chainDuration > benchmarkDuration) {
      return (
        <>
          <ArrowDropDownIcon
            style={{
              verticalAlign: "bottom",
              color: "red",
              justifyContent: "end",
            }}
          />
        </>
      );
    } else if (chainDuration < benchmarkDuration) {
      return (
        <>
          <ArrowDropUpIcon
            style={{ verticalAlign: "bottom", color: "green" }}
          />
        </>
      );
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset", border: "0" } }}>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}

        {chainLabels.map((x: any, index: number) =>
          x === chainLabels[chainLabels.length - 1] ? (
            <TableCell
              align="center"
              style={{
                fontFamily: "sans-serif",
                fontSize: "12px",
                // fontWeight: "bold",
                // color: getDeviationColor(row.total_times, row.avg_total_time),
              }}
            >
              {row.performance + " %"}{" "}
              {getDeviationIconStyling(row.total_times, row.avg_total_time)}
            </TableCell>
          ) : index === 0 ? (
            <>
              <TableCell
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "12px",
                  // fontWeight: "bold",
                  // color: getDeviationColor(row.total_times, row.avg_total_time),
                }}
              >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {row[x]}
              </TableCell>
            </>
          ) : (
            <>
              <TableCell
                align="center"
                key={x}
                scope="row"
                style={{ fontFamily: "sans-serif", fontSize: "12px" }}
              >
                {row[x]}
              </TableCell>
            </>
          )
        )}
      </TableRow>
      <TableRow sx={{ "& > *": { borderBottom: "unset", border: "0" } }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={TaskLabels.length}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: PrimaryColor }}
                    sx={{ "& > *": { borderBottom: "unset", border: "0" } }}
                  >
                    {TaskHeaders.map((x) => (
                      <TableCell
                        align="center"
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: "13px",
                          fontWeight: "bold",
                          color: "white",
                          backgroundColor: '#b4b4b8',
                        }}
                      >
                        {x}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length == 0 ? (
                    <>
                      <TableRow
                        sx={{
                          "& > *": {
                            borderBottom: "unset",
                            border: "0",
                            backgroundColor: "white",
                          },
                        }}
                      >
                        <TableCell colSpan={TaskLabels.length} align="center">
                          No Data Available
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    data.map((item) => (
                      <TableRow
                        sx={{
                          "& > *": {
                            borderBottom: "unset",
                            border: "0",
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {TaskLabels.map((x, index) =>
                          x === TaskLabels[TaskLabels.length - 1] ? ( // Render nothing or add your logic for 'performance'
                            <TableCell
                              align="center"
                              style={{
                                fontSize: "12px",
                                // fontWeight: "bold",
                                // color: getDeviationColor(
                                //   item.total_times,
                                //   item.avg_total_time
                                // ),
                              }}
                            >
                              {item.performance + " %"}
                              {getDeviationIconStyling(
                                item.total_times,
                                item.avg_total_time
                              )}
                            </TableCell>
                          ) : index == 0 ? (
                            <TableCell
                              align="left"
                              style={{
                                fontSize: "12px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {item[x]}
                            </TableCell>
                          ) : (
                            <TableCell
                              align="center"
                              style={{
                                fontSize: "12px",
                                fontFamily: "sans-serif",
                              }}
                            >
                              {item[x]}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))
                  )}
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
    <div style={{ paddingTop: 10 ,paddingBottom:10}}>
      <TableContainer
        style={{ maxHeight: "580px", overflowY: "auto" }}
        component={Paper}
        className="tableclass"
      >
        <Table aria-label="collapsible table" size="small">
          {" "}
          <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <TableRow sx={{ "& > *": { borderBottom: "unset", border: "0" } }}>
              {/* <TableCell style={{ backgroundColor: PrimaryColor }} /> */}
              {chainHeaders.map((x) => (
                <TableCell
                  align="center"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: PrimaryColor,
                  }}
                >
                  {x}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length == 0 ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={chainLabels.length}
                    align="center"
                    sx={{
                      "& > *": {
                        borderBottom: "unset",
                        border: "0",
                        backgroundColor: "white",
                      },
                    }}
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              </>
            ) : (
              data.map((row) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ScrollTop targetClass="tableclass"></ScrollTop>
    </div>
  );
};

export default CollapsibleTable;
