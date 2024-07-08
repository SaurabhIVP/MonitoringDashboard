import { useEffect, useState } from "react";
import { throttle } from "lodash";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
  MRT_TableOptions,
  MRT_RowData,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  MRT_GlobalFilterTextField,
} from "material-react-table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  FilterColor,
  NormalFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";
import GridFilter from "../filters/GridFilter";
import ChainDetailsByTaskname from "../../api/ChainDetailsByTaskname";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import { stubString } from "lodash";
import { TableLabels } from "./TableContents";
import { StyledDatepickerContainer } from "../../utils/StyledComponents";
import Datepicker from "../generics/datepicker/Datepicker";
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15, //customize the default page size
  });
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 1, 7));
  const [EndDate, setEndDate] = useState<Date | null>(new Date(2024, 1, 7));
  const [BenchstartDate, setBenchStartDate] = useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [BenchendDate, setBenchEndDate] = useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const isEndDateValid =
    startDate === null ||
    EndDate === null ||
    (startDate !== null && EndDate !== null && EndDate >= startDate);
  const [age, setAge] = useState("10");
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
  };
  const [alert, setAlert] = useState<boolean>(false);

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const handleAgeChange = (flag: any | null) => {
    setAge(flag);
  };
  const [pge, setpge] = useState("false");

  const handleChange = (event: SelectChangeEvent) => {
    setAge("30");
    setpge(event.target.value);
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
  let flag = false;
  const getboolean = (val: any) => {
    if (val == "true" || val == true) {
      return true;
    } else {
      return false;
    }
  };
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: any) => {
    console.log(event);
    setIsPm(event);
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
  // 1000 milliseconds (1 second) throttle

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
          is_pm: getboolean(pge),
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: BenchstartDate,
              benchEndDate: BenchendDate,
              benchmarkCompute: "Average",
              deviationPercentage: "0",
              is_pm: getboolean(pge),
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
          is_pm: getboolean(pge),
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: BenchstartDate,
              benchEndDate: BenchendDate,
              benchmarkCompute: "Average",
              deviationPercentage: "0",
              is_pm: getboolean(pge),
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
          is_pm: getboolean(pge),
        });
        const chainsWithData = await Promise.all(
          response.map(async (chain: any) => {
            const tasksResponse = await taskDetailsApi({
              chain_id: chain.id,
              startTime: chain.start_time,
              endTime: chain.end_time,
              benchStartDate: BenchstartDate,
              benchEndDate: BenchendDate,
              benchmarkCompute: "Average",
              deviationPercentage: "0",
              is_pm: getboolean(pge),
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
    pge,
  ]);
  data.map((item) => {
    if (item.avg_total_time == null) {
    }
  });
  const columns1 = useMemo<MRT_ColumnDef<any>[]>(
    () =>
      TableLabels.map(([acc, head, is_deviation, is_name, al]) => ({
        muiTableHeadCellProps: ({ column }) => ({
          align: "left",
          size: "small",
          sx: {
            // backgroundColor: PrimaryColor,
            ".css-fv3lde": {
              fontSize: NormalFontSize,
            },
            backgroundColor: PrimaryColor,
            color: SecondaryColor,
            maxHeight: "10px",
            // border: "none",
            borderSpacing: "1px",
            borderColor: "#5F9EA0",
            fontSize: NormalFontSize,
            fontFamily: "roboto",
            marginLeft: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
            fontWeight: "6px",
            // alignContent: "center",
            ".css-lapokc": {
              minWidth: "4ch",
            },
            "& .Mui-TableHeadCell-Content": {
              justifyContent: "flex-end",
            },
            ".css-i4bv87-MuiSvgIcon-root": {
              color: SecondaryColor,
            },
            "& .Mui-TableHeadCell-Content-Labels": {
              padding: "0px",
              margin: "auto",
            },
            ".css-118d58w-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
              {
                color: SecondaryColor,
              },
          },
        }),
        muiTableBodyCellProps: {
          align:
            al.toString() === "center"
              ? "center"
              : al.toString() === "left"
              ? "left"
              : "right",

          style: {
            fontFamily: "roboto",
            fontSize: NormalFontSize,
            border: "none",
            marginLeft: "0px",
            ".css-y6rp3m-MuiButton-startIcon>*:nth-of-type(1)": {
              color: "black",
            },
          },
        },
        size: 20,
        accessorKey: acc.toString(),
        filterFn: "contains",
        columnFilterModeOptions: !is_deviation
          ? []
          : [
              "between",
              "betweenInclusive",
              "contains",
              "greaterThan",
              "greaterThanOrEqualTo",
              "inNumberRange",
              "lessThan",
              "lessThanOrEqualTo",
              "notEquals",
            ],
        header: head.toString(),
        Cell: ({ cell, row }) => (
          <div>
            {is_name ? (
              <div
                style={{
                  // display: "flex",
                  // alignItems: "left",
                  color: "black",
                  // textAlign: "left",
                  width: "300px",
                 
                }}
              >
                {row.getCanExpand() ? (
                  <Button
                    size="small"
                    onClick={() => {
                      row.toggleExpanded();
                    }}
                    startIcon={
                      row.getIsExpanded() ? <ExpandLess /> : <ExpandMore />
                    }
                    style={{
                      textTransform: "none",
                      textAlign: "left",
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      fontSize: NormalFontSize,
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                    }}
                  >
                    {cell.getValue<string>()}
                  </Button>
                ) : (
                  <span
                    style={{
                      alignItems: "left",
                      textAlign: "left",
                      marginLeft: "30px",
                      fontFamily: "roboto",
                      fontSize: NormalFontSize,
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      whiteSpace:'nowrap',
                      overflow:'hidden',
                      textOverflow:'ellipsis',
                    }}
                  >
                    {cell.getValue<string>()}
                  </span>
                )}
              </div>
            ) : is_deviation ? (
              <div>
                <Box
                  component="div"
                  sx={(theme: any) => ({
                    width: "32px",
                    backgroundColor:
                      cell.getValue<string>() < "0"
                        ? theme.palette.error.dark
                        : cell.getValue<string>() >= "-10" &&
                          cell.getValue<string>() < "10"
                        ? theme.palette.warning.dark
                        : theme.palette.success.dark,
                    borderRadius: "10%",
                    // color: "#fff",
                    p: "3px",
                    fontSize: NormalFontSize,
                    color: "white",
                    fontFamily: "roboto",
                    fontWeight: row.getIsExpanded() ? "bold" : "normal",
                    marginLeft: "70px",
                  })}
                >
                  {cell.getValue<string>()}
                </Box>
              </div> // Render empty div if is_deviation is true
            ) : (
              <div>
                {cell.getValue<string>() == undefined ||
                cell.getValue<string>() == null ? (
                  <div
                    style={{
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      marginLeft: "20px",
                      fontSize: NormalFontSize,
                    }}
                  >
                    {"No Data"}
                  </div>
                ) : (
                  <div
                    style={{
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: row.getIsExpanded() ? "bold" : "normal",
                      marginLeft: "20px",
                      fontSize: NormalFontSize,
                    }}
                  >
                    {cell.getValue<string>()}
                  </div>
                )}
              </div>
            )}
          </div>
        ),
      })),
    [TableLabels]
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
    columns: columns1,
    data,
    enableDensityToggle: false,
    muiTableBodyCellProps: {
      sx: {
        borderBottom: "1px solid light-grey",
        // borderRight: "none",
        // borderLeft: "none",
        fontSize: "13px",
        fontFamily: "roboto",
        padding: "0px",
      },
    },

    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    muiTablePaperProps: {
      elevation: 0,
    },

    // enableExpandAll: true,
    enableColumnFilterModes: true,
    // enableExpanding: true,
    filterFromLeafRows: false,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFullScreenToggle: false,
    defaultDisplayColumn: {
      enableResizing: true,
    },

    muiTableHeadCellProps: ({ column }) => ({
      //conditionally style pinned columns
      sx: {
        backgroundColor: PrimaryColor,
        color: "black",
        fontFamily: "roboto",
        border: "none",
        fontWeight: "normal",
      },
    }),

    muiColumnActionsButtonProps: {
      style: {
        color: "black",
      },
    },
    defaultColumn: {
      minSize: 60,
      maxSize: 600,
    },
    muiTableProps: {
      style: {
        width: "80%",
        margin: "auto",
      },
    },
    muiDetailPanelProps: { style: { color: "black" } },
    maxLeafRowFilterDepth: 0,
    muiFilterTextFieldProps: {
      sx: {
        ".css-929hxt-MuiInputBase-input-MuiInput-input": {
          fontSize: NormalFontSize,
        },
      },
    },
    enableStickyHeader: true,
    state: { isLoading: loading, pagination, density: "compact" },
    getSubRows: (row) => row.tasks || [],
    columnFilterDisplayMode: "popover",
    // initialState:{density:'comfortable'},
    paginateExpandedRows: false,
    enableToolbarInternalActions: false,
    // renderToolbarInternalActions: ({ table }) => (
    //   <Box sx={{ width:'0px' }}>

    //   </Box>
    // ),
    renderBottomToolbar: ({ table }) => (
      <Box sx={{ paddingBottom: "0px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root ": {
              fontSize: "13px",
              fontWeight: "normal",
              fontFamily: "roboto",
            },
            ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.MuiSelect-select":
              {
                fontSize: "13px",
                fontWeight: "normal",
                fontFamily: "roboto",
                marginTop: "2px",
              },
            ".css-1f2oslk-MuiTypography-root": {
              fontSize: "13px",
              fontWeight: "normal",
              fontFamily: "roboto",
            },
          }}
        >
          <MRT_TablePagination table={table} sx={{ fontSize: "13px" }} />
        </Box>
        <Box sx={{ display: "grid", width: "100%" }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    ),
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "block",
          marginLeft: "20px",
          marginTop: "0px",
          padding: "0px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            marginRight: "0%",
            width: "100%",
            paddingTop: "0px",
          }}
        >
          <h2
            style={{
              color: SecondaryColor,
              fontFamily: "roboto",
              fontSize: "17px",
              // marginTop: "15px",
              marginRight: "30%",
              // fontStyle: "italic",
              maxWidth: "200px",
              flex: 1,
            }}
          >
            Chain - Task Status Table
          </h2>
          <div
            style={{
              fontSize: "13px",
              marginRight: "13px",
              marginLeft: "5%",
              marginTop: "18px",
              fontFamily: "roboto",
              color: SecondaryColor,
              fontWeight: 500,
            }}
          >
            System:
          </div>
          <FormControl
            variant="standard"
            sx={{
              width: "100px",
              marginTop: "13px",

              ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  fontSize: "13px",
                  paddingBottom: "0px",
                  marginTop: "0px",
                  color: SecondaryColor,
                },
            }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={pge}
              label="System"
              onChange={handleChange}
              sx={{
                fontSize: NormalFontSize,
              }}
            >
              <MenuItem value={"false"} sx={{ fontSize: NormalFontSize }}>
                SecMaster
              </MenuItem>
              <MenuItem value={"true"} sx={{ fontSize: NormalFontSize }}>
                PriceMaster
              </MenuItem>
            </Select>
          </FormControl>
          <StyledDatepickerContainer
            style={{ marginLeft: "2%", marginBottom: 0, marginRight: "0%" }}
          >
            <div
              style={{
                fontSize: "13px",
                marginRight: "5px",
                marginTop: "19px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "100px",
              }}
            >
              Start Date:
            </div>
            <div
              style={{
                marginRight: "2%",
                marginBottom: "0px",
                marginTop: "11px",
              }}
            >
              <Datepicker
                name="Task Start Date"
                selectedDate={startDate}
                onDateChange={handleStartDateChange}
                flag={isEndDateValid}
              />
            </div>
            <div
              style={{
                fontSize: "13px",
                marginRight: "2%",
                marginTop: "19px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "80px",
                marginLeft: "5%",
              }}
            >
              End Date:
            </div>
            <div style={{ marginBottom: "0px", marginTop: "11px" }}>
              <Datepicker
                name="Task End Date"
                selectedDate={EndDate}
                onDateChange={handleEndDateChange}
                flag={isEndDateValid}
              />
            </div>
          </StyledDatepickerContainer>
          <div style={{ marginTop: "10px", paddingLeft: "5%" }}>
            <CSVLink
              data={data}
              filename={"data.csv"}
              onClick={() => handleExportRows(data)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <FileDownloadIcon
                sx={{
                  color: SecondaryColor,
                  fontSize: "24px",
                  marginRight: "8px",
                  verticalAlign: "middle",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
              />
            </CSVLink>
          </div>
        </div>
        <Card sx={{padding:'3px',backgroundColor:PrimaryColor}}>
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              fontVariant: "jis78",
              // fontWeight: "normal",
              fontFamily: "roboto",
              marginTop: "0px",
              color: "#404040",
            }}
          >
            <div style={{ marginTop: "0px" }}>
              {pge == "false" ? (
                <GridFilter
                  onChainSelected={handleChainSelected}
                  onStartDateSelected={handleStartDateChange}
                  onEndDateSelected={handleEndDateChange}
                  onBenchStartDateSelected={handleBenchStartDateChange}
                  onBenchEndDateSelected={handleBenchendDateChange}
                  onCheck={handleAgeChange}
                  onDeviationChange={handleDeviationChange}
                  onBenchmarkComputeChange={handleBenchmarkCompute}
                  pm={"false"}
                ></GridFilter>
              ) : (
                <GridFilter
                  onChainSelected={handleChainSelected}
                  onStartDateSelected={handleStartDateChange}
                  onEndDateSelected={handleEndDateChange}
                  onBenchStartDateSelected={handleBenchStartDateChange}
                  onBenchEndDateSelected={handleBenchendDateChange}
                  onCheck={handleAgeChange}
                  onDeviationChange={handleDeviationChange}
                  onBenchmarkComputeChange={handleBenchmarkCompute}
                  pm={"true"}
                ></GridFilter>
              )}
            </div>

            {age == "10" ? (
              <div
                style={{ display: "flex", marginTop: "1px", marginLeft: "5px" }}
              >
                <strong>&nbsp;Chain Name: &nbsp;</strong>
                <span>
                  {selectedChainValue?.key
                    ? selectedChainValue?.key
                    : "All Chains"}
                  &nbsp;
                </span>
                <span>|</span>
              </div>
            ) : (
              <div
                style={{ display: "flex", marginTop: "1px", marginLeft: "5px" }}
              >
                <strong>&nbsp;Chain Name: &nbsp;</strong>
                <span>All Chains&nbsp;</span>
                <span>|</span>
              </div>
            )}
            {age == "20" ? (
              <div style={{ display: "flex", marginTop: "1px" }}>
                <strong>&nbsp;Task Name: &nbsp;</strong>
                <span>{selectedChainValue?.key}&nbsp;</span>
                <span>|</span>
              </div>
            ) : (
              <div style={{ display: "flex", marginTop: "1px" }}>
                <strong>&nbsp;Task Name: &nbsp;</strong>
                <span> All Tasks&nbsp;</span>
                <span>|</span>
              </div>
            )}
            <div style={{ marginTop: "1px" }}>
              <strong>&nbsp;Data Duration: </strong>
              <span>
                &nbsp;
                {DateConversioninddMMMMyyyy(startDate)} to{" "}
                {DateConversioninddMMMMyyyy(EndDate)} &nbsp;
              </span>
              <span>|</span>
              <strong> &nbsp;Benchmark Data Duration: </strong>
              <span>
                &nbsp;
                {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
                {DateConversioninddMMMMyyyy(BenchendDate)}
              </span>
            </div>
          </div>
        </Card>
        <div
          style={{
            display: "flex",
            fontSize: "11px",
            marginBottom: "0px",
            marginTop: "5px",
            fontFamily: "roboto",
            color: "gray",
          }}
        >
          *Click on Chain Names for Task Details
        </div>
      </Box>
    ),
  });

  return (
    <div>
      <div
        style={{
          height: "auto",
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MaterialReactTable table={table} />
        </LocalizationProvider>
        {/* {loading && (
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",

              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GridTable;
