import * as React from "react";
import Popover from "@mui/material/Popover";
import Datepicker from "../generics/Datepicker";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";

type ChartFilterProps = {
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
};

const DateFilters: React.FC<ChartFilterProps> = ({
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
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

  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
    onBenchEndDateSelected(newDate);
  };
  return (
    <div style={{ position: "absolute", right: 60 }}>
      <StyledButton onClick={handleClick}>Filter</StyledButton>
      <Popover
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
        </StyledBox>
      </Popover>
    </div>
  );
};

export default DateFilters;
