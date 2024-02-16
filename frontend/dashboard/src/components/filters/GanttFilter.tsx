import * as React from "react";
import Popover from "@mui/material/Popover";
import AllData from "../../api/GetAllChainNames";
import Datepicker from "../generics/Datepicker";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MultiSelect from "../generics/MultiSelect";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";


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

type ChartFilterProps = {
  onFilter: (val: boolean) => void;
  onChainSelected: (chains: string[]) => void;
  onStartDateSelected: (c: Date | null) => void;
  onStartTimeSelected: (c: any | null) => void;
  onEndTimeSelected: (c: any | null) => void;
  onBenchStartDateSelected: (c: Date | null) => void;
  onBenchEndDateSelected: (c: Date | null) => void;
};

const GanttFilter: React.FC<ChartFilterProps> = ({
  onFilter,
  onChainSelected,
  onStartDateSelected,
  onStartTimeSelected,
  onBenchEndDateSelected,
  onBenchStartDateSelected,
  onEndTimeSelected,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [multichains, setMultichains] = React.useState<string[]>([]);
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
  const [value, onChange] = useState<any | null>("10:00");
  const [startTime, setStartTime] = React.useState<any | null>("00:00:00");
  const [endTime, setEndTime] = React.useState<any | null>("24:00:00");
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const handleStartTimeChange = (val: any | null) => {
    setStartTime(TimeFormatter(val));
  };
  const handleEndTimeChange = (val: any | null) => {
    setEndTime(TimeFormatter(val));
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
  const buttonHandler = () => {
    onFilter(true);
    onStartTimeSelected(startTime);
    onEndTimeSelected(endTime);
    onStartDateSelected(startDate);
    onBenchEndDateSelected(BenchendDate);
    onBenchStartDateSelected(BenchstartDate);
    onChainSelected(multichains);
    handleClose();
  };
  const HandleMultichains = (values: string[]) => {
    setMultichains(values);
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
        <StyledBox style={{height:'360px'}}>
        <StyledDatepickerContainer>
            <Datepicker
              name="Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
            />
          </StyledDatepickerContainer>
          <div style={{marginBottom:'10px',paddingLeft:'40px'}}>
            <MultiSelect
              fetchDataFunction={AllData}
              NameParam="chain_name"
              Label="Search chains"
              onSearch={HandleMultichains}
            ></MultiSelect>
          </div>

          
          
          
          <StyledDatepickerContainer style={{paddingLeft:'40px',paddingRight:'40px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]} sx={{width:'200px'}}>
                 <TimePicker
                  label="Start Time"
                  value={startTime }
                  format="HH:mm:ss"
                  
                  onChange={handleStartTimeChange}
                  
                />
              </DemoContainer>
              <DemoContainer components={["TimePicker"]} sx={{width:'200px'}}>
                <TimePicker
                  label="End Time"
                  format="HH:mm:ss"
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </DemoContainer> 
              
            </LocalizationProvider>
          </StyledDatepickerContainer>

          
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
          <div style={{ position: "absolute", bottom: "5px", right: "45px", zIndex: 999}}>
          <StyledButton  onClick={buttonHandler} style={{ marginRight: 5 }}>
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

export default GanttFilter;
