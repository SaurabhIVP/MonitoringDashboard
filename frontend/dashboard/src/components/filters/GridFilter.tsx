import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

type ChartFilterProps = {
  onChainSelected: (chainData: {
    id: number | null;
    key: string | null;
  }) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onCheck: (flag: any | null) => void;
};

const GridFilter: React.FC<ChartFilterProps> = ({
  onChainSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onCheck,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [EndDate, setEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 30)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 30)
  );

  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
    onEndDateSelected(newDate);
  };

  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
    onStartDateSelected(newDate);
  };

  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
    onBenchStartDateSelected(newDate);
  };
  const [age, setAge] = React.useState("10");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
    onBenchEndDateSelected(newDate);
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

    onCheck(age);
    handleClose();
  };

  return (
    <div style={{ position: "absolute", right: 60 }}>
      <StyledButton onClick={handleClick}>Filter</StyledButton>
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
        <StyledBox>
          <Box sx={{ width: 300 }}>
            <FormControl fullWidth>
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
              </Select>
            </FormControl>
          </Box>

          <div>
            {age == "20" ? (
              <div>
                <StyledHeading>Select Task Name :</StyledHeading>
                <SearchbarTask
                  fetchDataFunction={() => Tasknames({ chain_id: 0 })}
                  nameParam="task_name"
                  label="Search Task Name"
                  onSearch={TaskhandleSearch}
                />
              </div>
            ) : (
              <div>
                <StyledHeading>Select Chain Name :</StyledHeading>
                <SearchBar
                  fetchDataFunction={AllData}
                  nameParam="chain_name"
                  label="Search Chain Name"
                  onSearch={ChainhandleSearch}
                  idParam="chain_id"
                />
              </div>
            )}
          </div>

          <StyledHeading>Select Duration :</StyledHeading>
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

          <StyledHeading>Select Benchmark Duration :</StyledHeading>
          <StyledDatepickerContainer>
            <Datepicker
              name="Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
            />
            <Datepicker
              name="End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
            />
          </StyledDatepickerContainer>
          <StyledButton onClick={buttonHandler} style={{ marginRight: 10 }}>
            SUBMIT
          </StyledButton>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default GridFilter;
