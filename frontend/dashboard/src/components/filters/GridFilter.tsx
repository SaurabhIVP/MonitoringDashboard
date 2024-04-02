import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
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
import { FilterColor, SecondaryColor } from "../../utils/Colors";
import NumberField from "../generics/NumberField";
import { useState } from "react";
import Dropdown from "../generics/Dropdown";
import { FilterButton } from "../generics/FilterButton";
import Alert from "@mui/material/Alert";
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
  onPmChange:(val:string)=>void;
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
  onPmChange
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
  const [isPm,setIsPm]=useState<string>("false");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [EndDate, setEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 30)
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
      const handlePMChange = (event: SelectChangeEvent) => {
        setIsPm(event.target.value as string);
      };
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 0, 10));
    setEndDate(new Date(2024, 0, 10));
    setBenchStartDate(new Date(2024, 0, 1));
    setBenchEndDate(new Date(2024, 0, 30));
    setKey(key === "1" ? "2" : "1");
    setAge("30");
    setBenchmarkCompute("Average");
    setDeviationPercentage("0");
    selectedChainValueRef.current = null;
    selectedTaskValueRef.current = null;
  };
  const getboolean=(val:string)=>{
    if(val=="true"){
      return true;
    }else{
      return false;
    }
  }
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
    onPmChange(isPm)
    console.log(isPm);
    handleClose();
  };

  return (
    <div>
      <FilterButton ariaLabel="" onClick={handleClick}></FilterButton>
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
          style={{ height: "auto", paddingTop: "40px", marginBottom: "0px" }}
        >
          <Box sx={{ width: 300 }}>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
            <div >
              <FormControl  sx={{width:'550px',paddingBottom:'15px' }}>
                <InputLabel id="demo-simple-select-label">System</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isPm}
                  label="System"
                  onChange={handlePMChange}
                >
                  <MenuItem value={"false"}>SecMaster</MenuItem>
                  <MenuItem value={"true"}>PriceMaster</MenuItem>
                  
                </Select>
              </FormControl>
            </div>
            <FormControl style={{ width: "550px" }}>
              <InputLabel id="demo-simple-select-label">
                Select Filter Criteria
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Select Filter Criteria"
                onChange={handleChange}
              >
                <MenuItem value={10}>Filter By Chain</MenuItem>
                <MenuItem value={20}>Filter By Task</MenuItem>
                <MenuItem value={30}>All Chains & Tasks</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div>
            {age == "20" ? (
              <div style={{ paddingTop: "10px" }}>
                <SearchbarTask
                  fetchDataFunction={() => Tasknames({ chain_id: 0 ,is_pm:getboolean(isPm)})}
                  nameParam="task_name"
                  label="Search Task Name"
                  onSearch={TaskhandleSearch}
                  keyProp={key}
                />
              </div>
            ) : age == "10" ? (
              <div style={{ paddingTop: "10px" }}>
                <SearchBar
                  fetchDataFunction={()=>AllData({is_pm:getboolean(isPm)})}
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

          <StyledDatepickerContainer style={{ paddingTop: 10 }}>
            <Datepicker
              name="Task Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
              flag={isEndDateValid}
            />
            <Datepicker
              name="Task End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
              flag={isEndDateValid}
            />
          </StyledDatepickerContainer>

          <StyledDatepickerContainer style={{ paddingBottom: "0px" }}>
            <Datepicker
              name="Benchmark Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
              flag={isBenchEndDateValid}
            />
            <Datepicker
              name="Benchmark End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
              flag={isBenchEndDateValid}
            />
          </StyledDatepickerContainer>
          <StyledDatepickerContainer style={{marginBottom:'0px'}}>
            {/* <div style={{  marginBottom: 56 }}>
              <NumberField
                name="Deviation % Threshold"
                value={deviationPercentage}
                onChange={handleDeviationChange}
              ></NumberField>
            </div> */}
            <div >
              <Dropdown
                name="Benchmark Compute Type"
                benchmarkComputeOptions={benchmarkComputeOptions}
                onChange={onChange}
              ></Dropdown>
            </div>
            
          </StyledDatepickerContainer>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              paddingTop:'0px',
              right: "45px",
              zIndex: 999,
              marginTop: "0px",
              
            }}
          >
            <StyledButton onClick={buttonHandler} style={{ marginRight: 16 }}>
              SUBMIT
            </StyledButton>

            <StyledButton
              autoFocus
              onClick={resetButtonHandler}
              style={{ backgroundColor: "gray" }}
            >
              Reset
            </StyledButton>
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default GridFilter;
