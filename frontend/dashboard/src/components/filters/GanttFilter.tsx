import * as React from "react";
import Popover from "@mui/material/Popover";
import AllData from "../../api/GetAllChainNames";
import Datepicker from "../generics/datepicker/Datepicker";
import TuneIcon from "@mui/icons-material/Tune";
import MultiSelect from "../generics/MultiSelect";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SelectChangeEvent } from "@mui/material";
import {
  StyledBox,
  StyledDatepickerContainer,
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
import Dropdown from "../generics/Dropdown";
import NumberField from "../generics/NumberField";
import CloseButton from "../generics/CloseButton";
import ResetButton from "../generics/ResetButton";
import SubmitButton from "../generics/SubmitButton";

type ChartFilterProps = {
  onFilter: (val: boolean) => void;
  onChainSelected: (chains: string[]) => void;
  onStartDateSelected: (c: Date | null) => void;
  onStartTimeSelected: (c: any | null) => void;
  onEndTimeSelected: (c: any | null) => void;
  onBenchStartDateSelected: (c: Date | null) => void;
  onBenchEndDateSelected: (c: Date | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  onDeviationChange: (val: any | null) => void;
  onPmChange: (val: string) => void;
};

const GanttFilter: React.FC<ChartFilterProps> = ({
  onFilter,
  onChainSelected,
  onStartDateSelected,
  onStartTimeSelected,
  onBenchEndDateSelected,
  onBenchStartDateSelected,
  onEndTimeSelected,
  onBenchmarkComputeChange,
  onDeviationChange,
  onPmChange,
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
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 7);
  const [startDate, setStartDate] = React.useState<Date | null>(
    currentDate
  );
  const minTime = dayjs(startDate).startOf("day");
  const maxTime = dayjs(startDate).endOf("day");
  const [value, onChange] = useState<any | null>("10:00");
  const [startTime, setStartTime] = React.useState<any | null>(minTime);
  const [endTime, setEndTime] = React.useState<any | null>(maxTime);
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    pastDate
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    currentDate
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
  const [key, setKey] = useState("1");
  const resetButtonHandler = () => {
    setStartDate(currentDate);
    setBenchmarkCompute("Average");
    setDeviationPercentage("0");
    setMultichains([]);
    setKey(key === "1" ? "2" : "1");
    setStartTime(dayjs(startDate).startOf("day"));
    setEndTime(dayjs(startDate).endOf("day"));
    setBenchStartDate(pastDate);
    setBenchEndDate(currentDate);
  };
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  const buttonHandler = () => {
    onFilter(true);
    onStartTimeSelected(startTime);
    onEndTimeSelected(endTime);
    onStartDateSelected(startDate);
    onBenchEndDateSelected(BenchendDate);
    onBenchStartDateSelected(BenchstartDate);
    onChainSelected(multichains);
    onBenchmarkComputeChange(benchmarkCompute);
    onDeviationChange(deviationPercentage);
    onPmChange(isPm);
    console.log(startTime);
    handleClose();
  };
  const HandleMultichains = (values: string[]) => {
    setMultichains(values);
  };
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const benchmarkComputeOptions = [
    {
      text: "Average",
      value: "Average",
    },
  ];
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: SelectChangeEvent) => {
    setIsPm(event.target.value as string);
  };
  const getboolean = (val: string) => {
    if (val == "true") {
      return true;
    } else {
      return false;
    }
  };
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const BenchonChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
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
    <div style={{ paddingTop: "0px" }}>
      <IconButton
        onClick={handleClick}
        sx={{ padding: "0px", marginTop: "0px", marginRight: "5px" }}
      >
        <TuneIcon
          sx={{
            color: SecondaryColor,
            fontSize: "24px",
            paddingTop: "0px",
            verticalAlign: "middle",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.2)",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            },
          }}
        ></TuneIcon>
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
          <div style={{ marginBottom: "10px", display: "flex" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "90px",
              }}
            >
              Chains :{" "}
            </div>
            <div style={{ paddingLeft: "7px" }}>
              <MultiSelect
                keyProp={key}
                fetchDataFunction={() => AllData({ is_pm: getboolean(isPm) })}
                NameParam="chain_name"
                Label="Search chains"
                onSearch={HandleMultichains}
              ></MultiSelect>
            </div>
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
                  width: "70px",
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
                  width: "90px",
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

          <StyledDatepickerContainer style={{ paddingBottom: "0px" }}>
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
          <StyledDatepickerContainer style={{ marginBottom: "0px" }}>
            <div style={{ marginBottom: 56, display: "flex" }}>
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
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
              style={{ paddingTop: "0px", display: "flex", marginLeft: "4px" }}
            >
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
                  marginLeft: "40px",
                  marginTop: "9px",
                  fontFamily: "roboto",
                  color: SecondaryColor,
                  fontWeight: 500,
                  width: "105px",
                }}
              >
                Benchmark Compute Type:{" "}
              </div>
              <Dropdown
                name="Benchmark Compute Type"
                benchmarkComputeOptions={benchmarkComputeOptions}
                onChange={BenchonChange}
              ></Dropdown>
            </div>
          </StyledDatepickerContainer>
          <div
            style={{
              position: "absolute",

              bottom: "10px",
              right: "15px",
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

export default GanttFilter;
