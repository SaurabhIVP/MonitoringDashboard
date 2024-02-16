import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import AllData from "../../api/GetAllChainNames";
import Datepicker from "../generics/Datepicker";
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [EndDate, setEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 10)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 17)
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
    handleClose();
  };

  return (
    <div style={{ position: "absolute", right: 60 }}>
      <IconButton
        onClick={handleClick}
        aria-label="filter"
        sx={{ color: FilterColor }}
      >
        <FilterAltIcon fontSize="large"></FilterAltIcon>
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
        <StyledBox style={{ height: "auto" }}>
          <Box sx={{ width: 300, paddingLeft: "35px", paddingTop: "10px" }}>
            <FormControl style={{ width: "475px" }}>
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
                  fetchDataFunction={() => Tasknames({ chain_id: 0 })}
                  nameParam="task_name"
                  label="Search Task Name"
                  onSearch={TaskhandleSearch}
                />
              </div>
            ) : age == "10" ? (
              <div style={{ paddingTop: "10px" }}>
                <SearchBar
                  fetchDataFunction={AllData}
                  nameParam="chain_name"
                  label="Search Chain Name"
                  onSearch={ChainhandleSearch}
                  idParam="chain_id"
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <StyledDatepickerContainer>
            <Datepicker
              name="Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
            />
            <Datepicker
              name="End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
            />
          </StyledDatepickerContainer>

          <StyledDatepickerContainer>
            <Datepicker
              name="Benchmark Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
            />
            <Datepicker
              name="Benchmark End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
            />
          </StyledDatepickerContainer>
          <StyledDatepickerContainer>
            <div style={{paddingLeft:37,marginBottom:56}}>
            <NumberField
              name="Deviation % "
              value={deviationPercentage}
              onChange={handleDeviationChange}
            ></NumberField>
            </div>
            <div style={{ paddingTop: 18, paddingRight: 36 }}>
              <Dropdown
                name="Benchmark Compute"
                benchmarkComputeOptions={benchmarkComputeOptions}
                onChange={onChange}
              ></Dropdown>
            </div>
          </StyledDatepickerContainer>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "45px",
              zIndex: 999,
            }}
          >
            <StyledButton onClick={buttonHandler} style={{ marginRight: 5 }}>
              SUBMIT
            </StyledButton>
            <StyledButton autoFocus onClick={handleClose}>
            Cancel
          </StyledButton>
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default GridFilter;
