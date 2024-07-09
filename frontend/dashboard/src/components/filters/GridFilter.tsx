import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import AllData from "../../api/GetAllChainNames";
import Datepicker from "../generics/datepicker/Datepicker";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Tasknames from "../../api/Tasknames";
import SearchbarTask from "../generics/SearchbarTask";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  FilterColor,
  NormalFontSize,
  SecondaryColor,
} from "../../utils/Colors";
import NumberField from "../generics/NumberField";
import { useState } from "react";
import Dropdown from "../generics/Dropdown";
import { FilterButton } from "../generics/FilterButton";
import Alert from "@mui/material/Alert";
import CloseButton from "../generics/CloseButton";
import ResetButton from "../generics/ResetButton";
import SubmitButton from "../generics/SubmitButton";
type ChartFilterProps = {
  onChainSelected: (chainData: {
    id: number | null;
    key: string | null;
  }) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onDeviationChange: (val: any | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  onCheck: (flag: any | null) => void;
  pm: any;
};

const GridFilter: React.FC<ChartFilterProps> = ({
  onChainSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onDeviationChange,
  onCheck,
  onBenchmarkComputeChange,
  pm,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const selectedChainValueRef = React.useRef<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const selectedTaskValueRef = React.useRef<{
    [key: string]: any;
  } | null>(null);
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    selectedChainValueRef.current = id !== null ? { id, key } : null;
  };
  const TaskhandleSearch = async (key: string | null) => {
    selectedTaskValueRef.current = key !== null ? { key } : null;
    console.log(selectedTaskValueRef.current);
  };
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [isPm,setIsPm]=useState<string>("false");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 1, 7)
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
  const [age, setAge] = React.useState("30");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const benchmarkComputeOptions = [
    {
      text: "Average",
      value: "Average",
    },
  ];
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const onChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const isEndDateValid =
    startDate === null ||
    EndDate === null ||
    (startDate !== null && EndDate !== null && EndDate >= startDate);
  const [key, setKey] = useState("1");
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 0, 10));
    setEndDate(new Date(2024, 0, 10));
    setBenchStartDate(new Date(2024, 1, 1));
    setBenchEndDate(new Date(2024, 1, 7));
    setKey(key === "1" ? "2" : "1");
    setAge("30");
    setBenchmarkCompute("Average");
    setDeviationPercentage("0");
    selectedChainValueRef.current = null;
    selectedTaskValueRef.current = null;
  };
  const getboolean = (val: string) => {
    if (val == "true") {
      return true;
    } else {
      return false;
    }
  };
  const buttonHandler = () => {
    const id = selectedChainValueRef.current?.id;
    const key = selectedChainValueRef.current?.key;
    const taskKey = selectedTaskValueRef.current?.key;

    console.log(taskKey);
    if (age == "10") {
      if (id != null && key != null) {
        onChainSelected({ id, key });
      }
    }
    if (age == "20") {
      onChainSelected({ id: 1, key: taskKey });
    }
    onStartDateSelected(startDate);
    onEndDateSelected(EndDate);
    onBenchStartDateSelected(BenchstartDate);
    onBenchEndDateSelected(BenchendDate);
    onCheck(age);
    onDeviationChange(deviationPercentage);
    onBenchmarkComputeChange(benchmarkCompute);

    // console.log(isPm);
    handleClose();
  };

  return (
    <div style={{padding:'0px'}}>
      <IconButton onClick={handleClick} sx={{padding:'0px'}}>
        <TuneIcon fontSize={'small'} sx={{padding:'0px',color:SecondaryColor,margin:'0px'}}></TuneIcon>
      </IconButton>
      <Popover
        keepMounted={true}
        id={id}
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
        <StyledBox
          style={{ height: "auto", paddingTop: "0px", marginBottom: "0px" }}
        >
          <Box sx={{ width: "auto" }}>
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
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "150px",
                }}
              >
                Select Criteria:{" "}
              </div>
              <FormControl
                style={{ width: "150px", marginRight: "10px" }}
                variant="standard"
                sx={{
                  ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                    {
                      fontSize: NormalFontSize,
                    },
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-standard"
                  value={age}
                  label="Select Filter Criteria"
                  onChange={handleChange}
                >
                  <MenuItem value={10} sx={{ fontSize: NormalFontSize }}>
                    Filter By Chain
                  </MenuItem>
                  <MenuItem value={20} sx={{ fontSize: NormalFontSize }}>
                    Filter By Task
                  </MenuItem>
                  <MenuItem value={30} sx={{ fontSize: NormalFontSize }}>
                    All Chains & Tasks
                  </MenuItem>
                </Select>
              </FormControl>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
                  width: "150px",
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,marginLeft:'10px'
                }}
              >
                Benchmark Compute Type:{" "}
              </div>
              <div style={{ marginRight: "55px" }}>
                <Dropdown
                  name="Benchmark Compute Type"
                  benchmarkComputeOptions={benchmarkComputeOptions}
                  onChange={onChange}
                ></Dropdown>
              </div>
            </div>
          </Box>

          <div>
            {age == "20" ? (
              <div style={{ paddingTop: "10px", display: "flex",paddingBottom: "10px", }}>
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
                  Select Task:{" "}
                </div>
                <SearchbarTask
                  fetchDataFunction={() =>
                    Tasknames({ chain_id: 0, is_pm: getboolean(pm) })
                  }
                  nameParam="task_name"
                  label="Search Task Name"
                  onSearch={TaskhandleSearch}
                  keyProp={key}
                />
              </div>
            ) : age == "10" ? (
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  paddingBottom: "10px",
                }}
              >
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
                  Select Chain:{" "}
                </div>
                <SearchBar
                  fetchDataFunction={() => AllData({ is_pm: getboolean(pm) })}
                  nameParam="chain_name"
                  label="Search Chain Name"
                  onSearch={ChainhandleSearch}
                  idParam="chain_id"
                  keyProp={key}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <StyledDatepickerContainer style={{ paddingBottom: "25px" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                marginRight: "5px",
                // marginLeft: "10px",
                marginTop: "9px",
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
          </StyledDatepickerContainer>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              paddingTop: "0px",
              right: "10px",
              zIndex: 999,
              marginTop: "0px",
            }}
          >
            <SubmitButton onClick={buttonHandler}></SubmitButton>
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default GridFilter;
