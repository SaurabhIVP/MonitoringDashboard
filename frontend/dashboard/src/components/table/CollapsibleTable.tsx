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
import * as XLSX from "xlsx";

import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./Table.css";
import {
  TaskHeaders,
  TaskLabels,
  chainHeaders,
  chainLabels,
} from "./TableContents";
import { PrimaryColor } from "../../utils/Colors";
import ScrollTop from "../generics/ScrollTop";
import {
  Chip,
  Grid,
  ListItem,
  TableSortLabel,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import {
  DateConversion,
  DateConversioninddMMMMyyyy,
  DateConversioninddMMMMyyyyhhmmss,
} from "../../utils/DateConversion";
import { orderBy } from "lodash";
import { StyledButton } from "../../utils/StyledComponents";
import TaskDetailsNew from "../../api/TaskDetailsNew";
import ChartTask from "../../api/ChartTask";
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
          }}
        />
      </>
    );
  } else if (chainDuration < benchmarkDuration) {
    return (
      <>
        <ArrowDropUpIcon style={{ verticalAlign: "bottom", color: "green" }} />
      </>
    );
  }
};
var benchmarkAlert = false;
function Row(props: {
  row: any | null;
  childDataFunction: () => void | null;
  onAlertChange: (val: boolean | null) => void;
}) {
  const { row, childDataFunction, onAlertChange } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [sortColumn, setSortColumn] = useState<string>("");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const handleSort = (propertyName: number) => {
    if (TaskLabels[propertyName] === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(TaskLabels[propertyName]);
      setSortDirection("asc");
    }
  };

  const sortedData = orderBy(data, sortColumn, sortDirection);
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
    if (row.avg_total_time == null) {
      onAlertChange(true);
    }
    if (open) {
      fetchData();
    }
  }, [open, row.chain_id, row.date, childDataFunction]);

  return (
    <React.Fragment>
      <TableRow className="rowstyling">
        {chainLabels.map((chainLabel: any, index: number) =>
          row[chainLabel[0]] == null ? (
            <TableCell
              align={row[chainLabel[3]]}
              key={chainLabel}
              scope="row"
              className="cellStyling"
              style={{ color: "red" }}
            >
              No Data
            </TableCell>
          ) : chainLabel[4] == true ? (
            <TableCell
              align={row[chainLabel[3]]}
              key={chainLabel}
              scope="row"
              className="cellStyling"
            >
              {DateConversioninddMMMMyyyyhhmmss(row[chainLabel[0]])}
            </TableCell>
          ) : chainLabel[1] === true ? (
            <TableCell align={row[chainLabel[3]]} className="cellStyling">
              {row[chainLabel[0]] + " %"}{" "}
              {getDeviationIconStyling(row.total_times, row.avg_total_time)}
            </TableCell>
          ) : chainLabel[2] === true ? (
            <>
              <TableCell className="cellStyling">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                {row[chainLabel[0]]}
              </TableCell>
            </>
          ) : (
            <>
              <TableCell
                align={row[chainLabel[3]]}
                key={chainLabel}
                scope="row"
                className="cellStyling"
              >
                {row[chainLabel[0]]}
              </TableCell>
            </>
          )
        )}
      </TableRow>
      <TableRow className="rowstyling">
        <TableCell className="taskcells" colSpan={TaskLabels.length}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow
                    style={{ backgroundColor: PrimaryColor }}
                    className="rowstyling"
                  >
                    {TaskHeaders.map((taskHeader, index: number) => (
                      <TableCell align="center" className="taskHeaders">
                        <TableSortLabel
                          active={true}
                          direction={
                            sortColumn === taskHeader ? sortDirection : "asc"
                          }
                          onClick={() => handleSort(index)}
                          className="taskHeaders"
                        >
                          {taskHeader}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length == 0 ? (
                    <>
                      <TableRow className="rowstyling">
                        <TableCell colSpan={TaskLabels.length} align="center">
                          No Data Available
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    sortedData.map((taskdata: any) => (
                      <TableRow
                        className="rowstyling"
                        style={{ backgroundColor: "white" }}
                      >
                        {TaskLabels.map((key: any, index: number) =>
                          taskdata[key[0]] == null ? (
                            <TableCell
                              align={key[3]}
                              className="cellStyling"
                              style={{ color: "red" }}
                            >
                              No Data
                            </TableCell>
                          ) : key[1] === true ? ( // Render nothing or add your logic for 'performance'
                            <TableCell
                              align={key[3]}
                              className="cellStyling"
                              key={key}
                            >
                              {taskdata[key[0]] + " %"}
                              {getDeviationIconStyling(
                                taskdata.total_times,
                                taskdata.avg_total_time
                              )}
                            </TableCell>
                          ) : key[4] == true ? (
                            <TableCell align={key[3]} className="cellStyling">
                              {DateConversioninddMMMMyyyyhhmmss(
                                taskdata[key[0]]
                              )}
                            </TableCell>
                          ) : key[2] == true ? (
                            <TableCell align={key[3]} className="cellStyling">
                              {taskdata[key[0]]}
                            </TableCell>
                          ) : (
                            <TableCell align={key[3]} className="cellStyling">
                              {taskdata[key[0]]}
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
  benchmarkStartDate: Date | null;
  benchmarkEndDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  Deviation: string | null;
  name: string | null;
  isChain: string | null;
}
interface TaskDetailsParams {
  chain_id: number;
  startTime: string;
  endTime: string;
}
const CollapsibleTable: React.FC<BasicLineChartProps> = ({
  fetchDataFunction,
  taskDetailsFunction,
  benchmarkStartDate,
  benchmarkEndDate,
  startDate,
  endDate,
  Deviation,
  name,
  isChain,
}) => {
  const [data, setData] = useState<any[]>([]);
  const benStart = DateConversion(benchmarkStartDate);
  const benEnd = DateConversion(benchmarkEndDate);
  const startdate = DateConversion(startDate);
  const enddate = DateConversion(endDate);
  const [sortBy, setSortBy] = useState(null);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [excelData, setExcelData] = useState([]);
  const fetchData = async () => {
    try {
      setData([]);
      const response = await fetchDataFunction();
      console.log(response);
      setData(response || []);
      const response1 = await TaskDetailsNew({
        startTime: startDate,
        endTime: endDate,
        benchStartDate: benchmarkStartDate,
        benchEndDate: benchmarkEndDate,
        deviationPercentage: 0,
      });
      console.log(response1);
      setExcelData(response1 || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchDataFunction, TaskDetailsNew]);
  const handleSort = (propertyName: number) => {
    if (chainLabels[propertyName] === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(chainLabels[propertyName]);
      setSortDirection("asc");
    }
  };

  const sortedData = orderBy(data, sortColumn, sortDirection);
  const [alert, setAlert] = useState<boolean | null>(false);
  const handleAlert = (val: boolean | null) => {
    setAlert(val);
  };

  const downloadExcel = () => {
    const filteredData = excelData.map((item: any) => {
      return {
        chain_name: item.chain_name,
        task_name: item.task_name,
        chain_id: item.chain_id,
        flow_id: item.flow_id,
        start_time: item.start_time,
        end_time: item.end_time,
        status: item.status,
        total_time: item.total_times,
        benchmark_time: item.avg_total_time,
        deviation: item.performance,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `Data_From_${startdate}_to_${enddate}.xlsx`);
  };

  return (
    <div className="tableWrapper">
      
      <ListItem >
        {isChain == "10" ? (
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold" }}>Chain Name:</span>{" "}
                <span>{name ? name : "All Chains"}</span>{" "}
              </Typography>
            }
            style={{ marginRight: "10px" }}
           
            
          />
        ) : (
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold" }}>Chain Name:</span>{" "}
                <span>All Chains</span>{" "}
              </Typography>
            }
            style={{ marginRight: "10px" }}
            
            
          />
        )}
        {isChain == "20" ? (
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold" }}>Task Name:</span>{" "}
                <span>{name}</span>{" "}
              </Typography>
            }
            style={{ marginRight: "10px" }}
            
          />
        ) : (
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold" }}>Task Name:</span>{" "}
                <span>All Tasks</span>{" "}
              </Typography>
            }
            style={{ marginRight: "10px" }}
           
          />
        )}
        <Chip
          label={
            <Typography component="span">
              <span style={{ fontWeight: "bold" }}>Data Duration:</span>{" "}
              <span>
                {DateConversioninddMMMMyyyy(startdate)} to{" "}
                {DateConversioninddMMMMyyyy(enddate)}
              </span>{" "}
            </Typography>
          }
          style={{ marginRight: "10px" }}
          
        />
        </ListItem>
        <ListItem >
        <Chip
          label={
            <Typography component="span">
              <span style={{ fontWeight: "bold" }}>Benchmark Duration:</span>{" "}
              <span>
                {DateConversioninddMMMMyyyy(benStart)} to{" "}
                {DateConversioninddMMMMyyyy(benEnd)}
              </span>{" "}
            </Typography>
          }
          style={{ marginRight: "10px" }}
         
        />
        <Chip
          label={
            <Typography component="span">
              <span style={{ fontWeight: "bold" }}>Deviation:</span>{" "}
              <span>{Deviation} %</span>{" "}
            </Typography>
          }
          style={{ marginRight: "10px" }}
          
        />
        <Chip
          label={
            <Typography component="span">
              <span style={{ fontWeight: "bold" }}>Benchmark Compute Type:</span>{" "}
              <span>Average</span>{" "}
            </Typography>
          }
          
        />
        </ListItem>
      
      <StyledButton
          onClick={downloadExcel}
          style={{
            marginLeft: "1250px",
            marginBottom: "3px",
            marginTop: "0px",
          }}
        >
          Download Excel
        </StyledButton>
      {alert == false ? (
        <div></div>
      ) : (
        <div style={{ float: "right", color: "red" }}>
          *Selected benchmark duration has no data
        </div>
      )}
      <TableContainer component={Paper} className="tableclass">
        <Table aria-label="collapsible table" size="small">
          {" "}
          <TableHead className="tablehead">
            <TableRow
              className="rowstyling"
              style={{ backgroundColor: "white" }}
            >
              {chainHeaders.map((chainHeader, index) =>
                index == chainHeaders.length - 3 ? (
                  <TableCell align="center" className="chainheadercells">
                    <TableSortLabel
                      active={true}
                      direction={
                        sortColumn === chainHeader ? sortDirection : "asc"
                      }
                      onClick={() => handleSort(index)}
                      className="chainheadercells"
                    >
                      <Tooltip
                        title={`Benchmark Time is calculated by Average of Chain Time from ${DateConversioninddMMMMyyyy(
                          benStart
                        )} to ${DateConversioninddMMMMyyyy(benEnd)}`}
                        arrow
                      >
                        <span>{chainHeader}</span>
                      </Tooltip>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell align="center" className="chainheadercells">
                    <TableSortLabel
                      active={true}
                      direction={
                        sortColumn === chainHeader ? sortDirection : "asc"
                      }
                      onClick={() => handleSort(index)}
                      className="chainheadercells"
                    >
                      {chainHeader}
                    </TableSortLabel>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length == 0 ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={chainLabels.length}
                    align="center"
                    className="chaincell"
                  >
                    No Data Available
                  </TableCell>
                </TableRow>
              </>
            ) : (
              sortedData.map((taskData) => (
                <Row
                  row={taskData}
                  onAlertChange={handleAlert}
                  childDataFunction={() =>
                    taskDetailsFunction({
                      chain_id: taskData.chain_id,
                      startTime: taskData.start_time,
                      endTime: taskData.end_time,
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
