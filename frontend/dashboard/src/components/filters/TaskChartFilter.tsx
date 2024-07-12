import * as React from "react";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import Datepicker from "../generics/datepicker/Datepicker";
import Tasknames from "../../api/Tasknames";
import ChainNames from "../../api/ChainNamesByTaskname";
import FlowIdGetter from "../../api/FlowIdGetter";
import { useEffect, useState } from "react";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";
import { IconButton } from "@mui/material";
import {
  FilterColor,
  NormalFontSize,
  SecondaryColor,
} from "../../utils/Colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterButton } from "../generics/FilterButton";
import NumberField from "../generics/NumberField";
import Dropdown from "../generics/Dropdown";
import "./Filters.css";
import ResetButton from "../generics/ResetButton";
import CloseButton from "../generics/CloseButton";
import SubmitButton from "../generics/SubmitButton";
type ChartFilterProps = {
  onTaskSelected: (id: number, key: string) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onDeviationChange: (val: any | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  pm: any;
};

const TaskChartFilter: React.FC<ChartFilterProps> = ({
  onTaskSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onBenchmarkComputeChange,
  onDeviationChange,
  pm,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [selectedChainValue, setSelectedChainValue] = React.useState<{
    id: number;
    [key: string]: any;
  } | null>(null);

  const [selectedTaskValue, setSelectedTaskValue] = React.useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: SelectChangeEvent) => {
    setIsPm(event.target.value as string);
    setKey(key === "1" ? "2" : "1");
    setSelectedTaskValue(null);
  };
  const getboolean = (val: string) => {
    if (val == "true") {
      return true;
    } else {
      return false;
    }
  };
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedChainValue(id !== null ? { id, key } : null);
  };

  const TaskhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedTaskValue(id !== null ? { id, key } : null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [EndDate, setEndDate] = React.useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 1, 1)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 1, 7)
  );
  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };

  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };

  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const [flowId, setFlowId] = React.useState(0);

  const fetchData = async () => {
    try {
      const response = (await FlowIdGetter({
        taskname: selectedChainValue?.key,
        chainname: selectedTaskValue?.key,
        is_pm: getboolean(pm),
      })) as any;

      const extractedFlowIds = response.map((item: any) => item.flow_id);
      setFlowId(extractedFlowIds[0]);
      console.log(flowId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const isEndDateValid =
    startDate === null ||
    EndDate === null ||
    (startDate !== null && EndDate !== null && EndDate >= startDate);
  const [key, setKey] = useState("1");
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 1, 1));
    setEndDate(new Date(2024, 1, 7));
    setBenchStartDate(new Date(2024, 1, 1));
    setBenchEndDate(new Date(2024, 1, 7));
    setSelectedChainValue(null);
    setKey(key === "1" ? "2" : "1");
    setSelectedTaskValue(null);
  };
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  useEffect(() => {
    fetchData();
  }, [selectedChainValue, selectedTaskValue]);

  const buttonHandler = () => {
    console.log(flowId);
    onTaskSelected(flowId, selectedChainValue?.key);
    onStartDateSelected(startDate);
    onEndDateSelected(EndDate);
    onBenchStartDateSelected(BenchstartDate);
    onBenchEndDateSelected(BenchendDate);
    onDeviationChange(deviationPercentage);
    onBenchmarkComputeChange(benchmarkCompute);
    handleClose();
  };

  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    if (value == "") {
      value = "0";
    }
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const benchmarkComputeOptions = [
    {
      text: "Average",
      value: "Average",
    },
  ];
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  return (
    <div style={{}}>
      <IconButton onClick={handleClick} sx={{ padding: "0px" }}>
        <TuneIcon></TuneIcon>
      </IconButton>
      <Popover
        id={id}
        keepMounted={true}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <StyledBox height={"auto"} >
        <div
            style={{
              display: "flex",
              position: "absolute",
              top: "0px",
              right: "10px",
            }}
          >
            <ResetButton onClick={resetButtonHandler}></ResetButton>

            <CloseButton onClick={handleClose}></CloseButton>
          </div>
          <div style={{ paddingTop: "15px", display: "flex" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "120px",
              }}
            >
              Task:{" "}
            </div>
          
            <SearchBar
              fetchDataFunction={() => Tasknames({ chain_id: 0, is_pm: pm })}
              nameParam="task_name"
              label="Search Task Name"
              onSearch={ChainhandleSearch}
              idParam="flow_id"
              keyProp={key}
            />
        
          </div>
          <div style={{ paddingTop: "15px", display: "flex" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "120px",
              }}
            >
              Chain:{" "}
            </div>
            <SearchBar
              fetchDataFunction={() =>
                ChainNames({ taskname: selectedChainValue?.key, is_pm: pm })
              }
              nameParam="chain_name"
              label="Search Chain Name"
              onSearch={TaskhandleSearch}
              idParam="flow_id"
              keyProp={key}
            />
          </div>
          <StyledDatepickerContainer style={{ paddingTop: 10 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
                  // marginLeft: "10px",
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "115px",
                }}
              >
                Start Date:{" "}
              </div>
              <Datepicker
                name="Chain Start Date"
                selectedDate={startDate}
                onDateChange={handleStartDateChange}
                flag={isEndDateValid}
              />
            </div>
            <div style={{ display: "flex", marginLeft: "15px" }}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "121px",
                }}
              >
                End Date:{" "}
              </div>
              <Datepicker
                name="Chain End Date"
                selectedDate={EndDate}
                onDateChange={handleEndDateChange}
                flag={isEndDateValid}
              />
            </div>
          </StyledDatepickerContainer>

          <StyledDatepickerContainer>
            <div
              style={{
                fontSize: NormalFontSize,
                marginRight: "5px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "114px",
              }}
            >
              Benchmark Start Date:{" "}
            </div>
            <div style={{ marginRight: "10px" }}>
              <Datepicker
                name="Benchmark Start Date"
                selectedDate={BenchstartDate}
                onDateChange={handleBenchStartDateChange}
                flag={isBenchEndDateValid}
              />
            </div>
            <div
              style={{
                fontSize: NormalFontSize,
                marginRight: "5px",
                marginLeft: "5px",
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "121px",
              }}
            >
              Benchmark End Date:{" "}
            </div>
            <div style={{ marginRight: "13px" }}>
              <Datepicker
                name="Benchmark End Date"
                selectedDate={BenchendDate}
                onDateChange={handleBenchendDateChange}
                flag={isBenchEndDateValid}
              />
            </div>
          </StyledDatepickerContainer>
          <StyledDatepickerContainer style={{ marginBottom: "0px" }}>
            <div style={{ marginBottom: 56, display: "flex" }}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "19px",
                  // marginLeft: "10px",
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "100px",
                }}
              >
                Deviation %:{" "}
              </div>

              <NumberField
                name="Deviation % Threshold"
                value={deviationPercentage}
                onChange={handleDeviationChange}
              ></NumberField>
            </div>
            <div
              style={{ paddingTop: "0px", display: "flex", marginLeft: "0px" }}
            >
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "25px",
                  marginLeft: "15px",
                  marginTop: "4px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "100px",
                }}
              >
                Benchmark Compute Type:{" "}
              </div>
              <Dropdown
                name="Benchmark Compute Type"
                benchmarkComputeOptions={benchmarkComputeOptions}
                onChange={() => {}}
              ></Dropdown>
            </div>
          </StyledDatepickerContainer>
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              zIndex: 999,
            }}
          >
            <SubmitButton onClick={buttonHandler} />
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default TaskChartFilter;
