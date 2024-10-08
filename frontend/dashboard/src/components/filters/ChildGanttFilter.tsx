import * as React from "react";
import Popover from "@mui/material/Popover";
import AllData from "../../api/GetAllChainNames";
import TuneIcon from "@mui/icons-material/Tune";
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
import {
  FilterColor,
  NormalFontSize,
  SecondaryColor,
} from "../../utils/Colors";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FilterButton } from "../generics/FilterButton";
import Dropdown from "../generics/Dropdown";
import NumberField from "../generics/NumberField";
import CloseButton from "../generics/CloseButton";
import SubmitButton from "../generics/SubmitButton";
import ResetButton from "../generics/ResetButton";

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
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 7);
  const [startDate, setStartDate] = React.useState<Date | null>(
    currentDate
  );
  const minTime = dayjs(startDate).startOf("day");
  const maxTime = dayjs(startDate).endOf("day");
  const [startTime, setStartTime] = React.useState<any | null>(minTime);
  const [endTime, setEndTime] = React.useState<any | null>(maxTime);
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    pastDate
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    currentDate
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
    setBenchStartDate(new Date(2024, 1, 1));
    setBenchEndDate(new Date(2024, 1, 7));
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
    handleClose();
  };
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        buttonHandler();
        
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [buttonHandler]);
  return (
    <div style={{ padding: "0px" }}>
      <IconButton
        onClick={handleClick}
        sx={{ padding: "0px", marginRight: "5px" }}
      >
        <TuneIcon></TuneIcon>
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
        <StyledBox style={{ height: "auto", width: "auto" }}>
          <div style={{ right: 0, position: "absolute", display: "flex" }}>
            <ResetButton onClick={resetButtonHandler}></ResetButton>
            <CloseButton onClick={handleClose}></CloseButton>
          </div>

          <StyledDatepickerContainer
            style={{
              paddingTop: 10,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "80px",
                  marginTop: "15px",
                  marginRight: "30px",
                }}
              >
                Start Time:{" "}
              </div>
              <DemoContainer
                components={["TimePicker"]}
                sx={{
                  paddingTop: "0px",
                  marginTop: "2px",
                  // Apply styles to the container or other elements if needed
                }}
              >
                <TimePicker
                  value={startTime}
                  onChange={handleStartTimeChange}
                  sx={{
                    // Target the input field of the TimePicker
                    "& .MuiOutlinedInput-root": {
                      width: "130px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: NormalFontSize,
                      color: SecondaryColor,
                    },
                    // Target menu items if necessary
                    "& .MuiMenuItem-root": {
                      color: SecondaryColor,
                    },
                  }}
                />
              </DemoContainer>
              <div
                style={{
                  fontSize: NormalFontSize,
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "80px",
                  marginTop: "18px",
                }}
              >
                End Time:{" "}
              </div>
              <DemoContainer
                components={["TimePicker"]}
                sx={{
                  paddingTop: "0px",
                  marginTop: "2px",
                  // Apply styles to the container or other elements if needed
                }}
              >
                <TimePicker
                  value={endTime}
                  onChange={handleEndTimeChange}
                  sx={{
                    // Target the input field of the TimePicker
                    "& .MuiOutlinedInput-root": {
                      width: "130px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: NormalFontSize,
                      color: SecondaryColor,
                    },
                    // Target menu items if necessary
                    "& .MuiMenuItem-root": {
                      color: SecondaryColor,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </StyledDatepickerContainer>

          <StyledDatepickerContainer style={{ paddingBottom: "10px" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                marginRight: "5px",
                // marginLeft: "10px",
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "100px",
              }}
            >
              Benchmark Start Date:{" "}
            </div>
            <div style={{ marginRight: "20px" }}>
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
                marginLeft: "25px",
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "100px",
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

          <div
            style={{
              position: "absolute",

              bottom: "10px",
              right: "5px",
              zIndex: 999,
            }}
          >
            <SubmitButton onClick={buttonHandler}></SubmitButton>
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default ChildGanttFilter;
