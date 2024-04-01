import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterColor, PrimaryColor } from "../../utils/Colors";
import GridFilter from "../filters/GridFilter";
import ChainDetailsByTaskname from "../../api/ChainDetailsByTaskname";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
interface ExampleProps {
  chainDetailsApi: (params: any) => Promise<any[]>;
  taskDetailsApi: (params: any) => Promise<any[]>;
  chainDetailsbyTaskApi: (params: any) => Promise<any[]>;
}

const GridTable: React.FC<ExampleProps> = ({
  chainDetailsApi,
  taskDetailsApi,
  chainDetailsbyTaskApi,
}) => {
  const [selectedChainValue, setSelectedChainValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2024, 0, 10));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 0, 31)
  );

  const [age, setAge] = useState("10");
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
  };

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleAgeChange = (flag: any | null) => {
    setAge(flag);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const handleChainSelected = (
    chainData: { id: number | null; key: string } | any
  ) => {
    setSelectedChainValue(chainData);
  };
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const handleBenchmarkCompute = (value: string) => {
    setBenchmarkCompute(value);
  };
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      setData([]);
      if (age == "10") {
        const response = await chainDetailsApi({
          chain_id: selectedChainValue?.id,
          startDate: startDate,
          endDate: EndDate,
          benchStartDate: BenchstartDate,
          benchEndDate: BenchendDate,
          benchmarkCompute: "Average",
          deviationPercentage: "0",
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: new Date(2024, 0, 3),
              benchEndDate: new Date(2024, 0, 3),
              benchmarkCompute: "Average",
              deviationPercentage: "0",
            });
            chain.tasks = tasksResponse || [];
            return { ...chain, showTasks: false }; // Initialize showTasks property
          })
        );
        console.log(response);
        setData(chainsWithData || []);
      } else if (age == "20" && selectedChainValue?.key) {
        const response = await chainDetailsbyTaskApi({
          tasknames: selectedChainValue.key,
          startDate: startDate,
          endDate: EndDate,
          benchStartDate: BenchstartDate,
          benchEndDate: BenchendDate,
          benchmarkCompute: benchmarkCompute,
          deviationPercentage: deviationPercentage,
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: new Date(2024, 0, 3),
              benchEndDate: new Date(2024, 0, 3),
              benchmarkCompute: "Average",
              deviationPercentage: "0",
            });
            chain.tasks = tasksResponse || [];
            return { ...chain, showTasks: false }; // Initialize showTasks property
          })
        );
        console.log(response);
        setData(chainsWithData || []);
      } else {
        const response = await chainDetailsApi({
          chain_id: null,
          startDate: startDate,
          endDate: EndDate,
          benchStartDate: BenchstartDate,
          benchEndDate: BenchendDate,
          benchmarkCompute: "Average",
          deviationPercentage: "0",
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: new Date(2024, 0, 3),
              benchEndDate: new Date(2024, 0, 3),
              benchmarkCompute: "Average",
              deviationPercentage: "0",
            });
            chain.tasks = tasksResponse || [];
            return { ...chain, showTasks: false }; // Initialize showTasks property
          })
        );
        console.log(response);
        setData(chainsWithData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [
    chainDetailsApi,
    taskDetailsApi,
    chainDetailsbyTaskApi,
    startDate,
    EndDate,
    BenchstartDate,
    BenchendDate,
    selectedChainValue,
    age,
    
  ]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    //column definitions...
    () => [
      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "start_time",
        header: "Start Time",
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "end_time",
        header: "End Time",
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "total_times",
        header: "Total Time",

        size: 50,
        grow: false,
        muiTableBodyCellProps: {
          align: "center",
        },
      },

      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "avg_total_time",
        // enableColumnOrdering: false,
        header: "Benchmark Time",
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        muiTableHeadCellProps: {
          style: {
            backgroundColor: PrimaryColor,
            color: "white",
            // borderColor: "white",
            fontWeight: "normal",
          },
        },
        accessorKey: "performance",
        header: "Deviation %",
        filterFn: "greaterThanOrEqualTo",
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ cell }) => (
          <Box
            component="div"
            sx={(theme: any) => ({
              textAlign: "center",
              width: "20px",
              backgroundColor:
                cell.getValue<string>() < "0"
                  ? theme.palette.error.dark
                  : cell.getValue<string>() >= "-10" &&
                    cell.getValue<string>() < "10"
                  ? theme.palette.warning.dark
                  : theme.palette.success.dark,
              borderRadius: "10%",
              color: "#fff",
              height: "15px", // Add this line to set the height
              p: "10px",
              fontSize: "small",
            })}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
    ],
    []
    //end
  );
  const handleExportRows = (rows: any[]) => {
    const csvData = rows.map((row) => ({
      "Chain ID/Task ID": row.id,
      "Chain Name/Task Name": row.name,
      "Start Time": row.start_time,
      "End Time": row.end_time,
      "Total Time": row.total_times,
      "Benchmark Time": row.avg_total_time,
      "Deviation %": row.performance,
    }));
    return csvData;
  };

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyCellProps: {
      style: {
        border: "none",
        fontSize: "small",
        fontFamily: "roboto",
      },
    },
    enableExpandAll: true,
    enableColumnFilterModes: true,
    enableExpanding: true,
    filterFromLeafRows: false,
    enableColumnOrdering: true,
    enableColumnPinning: true,

    defaultDisplayColumn: {
      enableResizing: true,
    },
    muiTableHeadCellProps: {
      style: {
        backgroundColor: PrimaryColor,
        color: "white",
        fontFamily: "roboto",
      },
    },
    muiTablePaperProps: {
      elevation: 10,
    },
    muiColumnActionsButtonProps: {
      style: {
        color: "white",
      },
    },

    maxLeafRowFilterDepth: 0,
    enableStickyHeader: true,
    getSubRows: (row) => row.tasks || [],
    // initialState: { expanded: true },
    columnFilterDisplayMode: "popover",
    paginateExpandedRows: false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            color: FilterColor,
            boxShadow: "0 0 5px gray",
            borderRadius: "100%",
            width: "40px",
            height: "36px",
            textAlign: "center",
          }}
        >
          <CSVLink
            data={data}
            filename={"data.csv"}
            onClick={() => handleExportRows(data)}
          >
            <FileDownloadIcon
              style={{ color: FilterColor, paddingTop: "6px" }}
            />
          </CSVLink>
        </div>
        <div>
          <GridFilter
            onChainSelected={handleChainSelected}
            onStartDateSelected={handleStartDateChange}
            onEndDateSelected={handleEndDateChange}
            onBenchStartDateSelected={handleBenchStartDateChange}
            onBenchEndDateSelected={handleBenchendDateChange}
            onCheck={handleAgeChange}
            onDeviationChange={handleDeviationChange}
            onBenchmarkComputeChange={handleBenchmarkCompute}
          ></GridFilter>
        </div>
        {/* 
        <ListItem sx={{ paddingLeft: "0px" }}>
          {age == "10" ? (
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold", fontSize: "small" }}>
                    Chain Name:
                  </span>{" "}
                  <span style={{ fontSize: "small" }}>
                    {selectedChainValue?.key
                      ? selectedChainValue?.key
                      : "All Chains"}
                  </span>{" "}
                </Typography>
              }
              sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
            />
          ) : (
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold", fontSize: "small" }}>
                    Chain Name:
                  </span>{" "}
                  <span style={{ fontSize: "small" }}>All Chains</span>{" "}
                </Typography>
              }
              sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
            />
          )}
          {age == "20" ? (
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold", fontSize: "small" }}>
                    Task Name:
                  </span>{" "}
                  <span style={{ fontSize: "small" }}>
                    {selectedChainValue?.key}
                  </span>{" "}
                </Typography>
              }
              sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
            />
          ) : (
            <Chip
              label={
                <Typography component="span">
                  <span style={{ fontWeight: "bold", fontSize: "small" }}>
                    Task Name:
                  </span>{" "}
                  <span style={{ fontSize: "small" }}>All Tasks</span>{" "}
                </Typography>
              }
              sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
            />
          )}
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold", fontSize: "small" }}>
                  Data Duration:
                </span>{" "}
                <span style={{ fontSize: "small" }}>
                  {DateConversioninddMMMMyyyy(startDate)} to{" "}
                  {DateConversioninddMMMMyyyy(EndDate)}
                </span>{" "}
              </Typography>
            }
            sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
          />
          <Chip
            label={
              <Typography component="span">
                <span style={{ fontWeight: "bold", fontSize: "small" }}>
                  Benchmark Duration:
                </span>{" "}
                <span style={{ fontSize: "small" }}>
                  {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
                  {DateConversioninddMMMMyyyy(BenchendDate)}
                </span>{" "}
              </Typography>
            }
            sx={{ marginRight: "10px", height: "24px", fontSize: "small" }} // Adjust the height and font size here
          />
        </ListItem> */}
        <div
          style={{
            display: "flex",
            fontSize: "small",
            fontWeight: "bold",
            fontFamily: "roboto",
            marginTop:'10px'
          }}
        >
          {age == "10" ? (
            <div>
              <span>Chain Name: </span>
              <span>
                {selectedChainValue?.key
                  ? selectedChainValue?.key
                  : "All Chains"}
              </span>
              <span> | </span>
            </div>
          ) : (
            <div>
              <span>Chain Name: </span>
              <span>All Chains</span>
              <span> | </span>
            </div>
          )}
          {age == "20" ? (
            <div>
              <span>Task Name: </span>
              <span>{selectedChainValue?.key}</span>
              <span> | </span>
            </div>
          ) : (
            <div>
              <span>Task Name: </span>
              <span>All Tasks</span>
              <span> | </span>
            </div>
          )}
          <span>Data Duration: </span>
          <span>
            {DateConversioninddMMMMyyyy(startDate)} to{" "}
            {DateConversioninddMMMMyyyy(EndDate)}
            {" "}
          </span>
          <span> | </span>
          <span> Benchmark Data Duration: </span>
          <span>
            {" "}
            {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
            {DateConversioninddMMMMyyyy(BenchendDate)}
          </span>
        </div>
      </Box>
    ),

    //   expandOnFilter: true, // Enable expanding after filtering
  });

  return (
    <div
      style={{
        height: "auto",
        position: "relative",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <h2
        style={{
          color: PrimaryColor,
          fontFamily: "roboto",
          fontSize: "large",
        }}
      >
        Chain/ Task Status Table
      </h2>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MaterialReactTable table={table} />
      </LocalizationProvider>
    </div>
  );
};

export default GridTable;
