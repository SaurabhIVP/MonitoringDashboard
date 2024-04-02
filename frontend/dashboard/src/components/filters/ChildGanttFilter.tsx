import * as React from "react";
import Popover from "@mui/material/Popover";
import AllData from "../../api/GetAllChainNames";
import Datepicker from "../generics/datepicker/Datepicker";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MultiSelect from "../generics/MultiSelect";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker as MuiTimePicker } from "@mui/lab";
import { TextField, InputAdornment } from "@mui/material";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";
import TimeFormatter from "../../utils/HHMMSSConverter";
import { IconButton } from "@mui/material";
import { FilterColor, SecondaryColor } from "../../utils/Colors";
import dayjs from "dayjs";
import { useState } from "react";
import { FilterButton } from "../generics/FilterButton";
import Dropdown from "../generics/Dropdown";
import NumberField from "../generics/NumberField";

type ChartFilterProps = {
  onFilter: (val: boolean) => void;
  onStartDateSelected: (c: Date | null) => void;
  onStartTimeSelected: (c: any | null) => void;
  onEndTimeSelected: (c: any | null) => void;
  onBenchStartDateSelected: (c: Date | null) => void;
  onBenchEndDateSelected: (c: Date | null) => void;
  onDeviationChange: (val: any | null) => void;

};

const ChildGanttFilter: React.FC<ChartFilterProps> = ({
  onFilter,
  onStartDateSelected,
  onStartTimeSelected,
  onBenchEndDateSelected,
  onBenchStartDateSelected,
  onEndTimeSelected,
  onDeviationChange,

}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const minTime = dayjs(startDate).startOf("day");
  const maxTime = dayjs(startDate).endOf("day");
  const [startTime, setStartTime] = React.useState<any | null>(minTime);
  const [endTime, setEndTime] = React.useState<any | null>(maxTime);
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 24)
  );
  let start = false;
  let end = false;
  const handleStartTimeChange = (val: any | null) => {
    setStartTime(TimeFormatter(val));
    start = true;
  };
  const handleEndTimeChange = (val: any | null) => {
    setEndTime(TimeFormatter(val));
    end = true;
  };
  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };
  const [key, setKey] = useState("1");
  const resetButtonHandler = () => {
    setDeviationPercentage("0");
    setKey(key === "1" ? "2" : "1");
    setStartTime(dayjs(startDate).startOf("day"));
    setEndTime(dayjs(startDate).endOf("day"));
    setBenchStartDate(new Date(2024, 0, 1));
    setBenchEndDate(new Date(2024, 0, 31));
  };
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  const buttonHandler = () => {
   
      onStartTimeSelected(startTime);
   
   
      onEndTimeSelected(endTime);
   

    onStartDateSelected(startDate);
    onBenchEndDateSelected(BenchendDate);
    onBenchStartDateSelected(BenchstartDate);
    onDeviationChange(deviationPercentage);
    console.log(startTime);

    onFilter(true);
    // start=false;
    // end=false;
    handleClose();
  };
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  return (
    <div style={{}}>
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
        <StyledBox style={{ height: "auto" }}>
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
          <StyledDatepickerContainer style={{ paddingLeft: "130px" }}>
            <Datepicker
              name="Chain Run Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
              flag={true}
            />
          </StyledDatepickerContainer>

          <StyledDatepickerContainer
            style={{
              paddingTop: 10,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                sx={{ width: "200px" }}
              >
                <TimePicker
                  label="Chain Start Time"
                  value={startTime}
                  // format="HH:mm:ss"
                  onChange={handleStartTimeChange}
                />
              </DemoContainer>
              <DemoContainer
                components={["TimePicker"]}
                sx={{ width: "200px" }}
              >
                <TimePicker
                  label="Chain End Time"
                  // format="HH:mm:ss"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </StyledDatepickerContainer>

          <StyledDatepickerContainer>
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
          <StyledDatepickerContainer>
            <div style={{ marginBottom: 56 }}>
              <NumberField
                name="Deviation % Threshold"
                value={deviationPercentage}
                onChange={handleDeviationChange}
              ></NumberField>
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
            <StyledButton onClick={buttonHandler} style={{ marginRight: 15 }}>
              SUBMIT
            </StyledButton>
            <StyledButton
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

export default ChildGanttFilter;
