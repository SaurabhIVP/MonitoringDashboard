import * as React from "react";
import Box from "@mui/material/Box";
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
import SearchBar from "../generics/SearchBar";
import Datepicker from "../generics/datepicker/Datepicker";
import GetAllChainNames from "../../api/GetAllChainNames";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
import { useState } from "react";
import NumberField from "../generics/NumberField";
import Dropdown from "../generics/Dropdown";
import SubmitButton from "../generics/SubmitButton";
import ResetButton from "../generics/ResetButton";
import CloseButton from "../generics/CloseButton";

type ChartFilterProps = {
  onChainSelected: (chainData: { id: number; key: string }) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onDeviationChange: (val: any | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  pm: any;
  // onPmChange:(val:string)=>void;
};

const ChartFilter: React.FC<ChartFilterProps> = ({
  onChainSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onDeviationChange,
  onBenchmarkComputeChange,
  pm,
  // onPmChange
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const selectedChainValueRef = React.useRef<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    selectedChainValueRef.current = id !== null ? { id, key } : null;
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [key, setKey] = useState("1");
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
  const onChange = (value: string) => {
    setBenchmarkCompute(value);
    console.log(benchmarkCompute);
  };
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
  const isEndDateValid =
    startDate === null ||
    EndDate === null ||
    (startDate !== null && EndDate !== null && EndDate >= startDate);
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  const [isPm, setIsPm] = useState<string>("false");
  const handlePMChange = (event: SelectChangeEvent) => {
    setIsPm(event.target.value as string);
    setKey(key === "1" ? "2" : "1");
    selectedChainValueRef.current = null;
  };
  const buttonHandler = () => {
    const id = selectedChainValueRef.current?.id;
    const key = selectedChainValueRef.current?.key;
    if (id != null && key != null) {
      onChainSelected({ id, key });
    }
    onStartDateSelected(startDate);
    onEndDateSelected(EndDate);
    onBenchStartDateSelected(BenchstartDate);
    onBenchEndDateSelected(BenchendDate);
    onDeviationChange(deviationPercentage);
    onBenchmarkComputeChange(benchmarkCompute);
    // onPmChange(isPm);
    handleClose();
  };
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 1, 1));
    setBenchmarkCompute("Average");
    setDeviationPercentage("0");
    setEndDate(new Date(2024, 1, 7));
    setBenchStartDate(new Date(2024, 1, 1));
    setBenchEndDate(new Date(2024, 1, 7));
    setKey(key === "1" ? "2" : "1");
    selectedChainValueRef.current = null;
  };
  const getboolean = (val: string) => {
    if (val == "true") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div style={{}}>
      <IconButton onClick={handleClick} sx={{ padding: "0px" }}>
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
        <StyledBox height={"auto"}>
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
          <div style={{ display: "flex" }}>
            {/* <div
              style={{
                fontSize: "13px",
                marginRight: "13px",
                marginLeft: "130px",
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
              }}
            >
              System:
            </div> */}
            {/* <FormControl
              variant="standard"
              sx={{
                width: "100px",

                ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                  {
                    fontSize: "13px",
                    paddingBottom: "0px",
                    marginTop: "5px",
                    color: SecondaryColor,
                  },
              }}
            >
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={isPm}
                label="System"
                onChange={handlePMChange}
                sx={{ fontSize: NormalFontSize }}
              >
                <MenuItem value={"false"} sx={{ fontSize: NormalFontSize }}>
                  SecMaster
                </MenuItem>
                <MenuItem value={"true"} sx={{ fontSize: NormalFontSize }}>
                  PriceMaster
                </MenuItem>
              </Select>
            </FormControl> */}
          </div>

          <div style={{ paddingTop: "15px", display: "flex" }}>
            <div
              style={{
                fontSize: NormalFontSize,
                // marginRight: "5px",
                // marginLeft: "10px",
                marginTop: "9px",
                fontFamily: "roboto",
                color: SecondaryColor,
                fontWeight: 500,
                width: "50px",
              }}
            >
              Chain:{" "}
            </div>
            <div style={{ marginLeft: "70px" }}>
              <SearchBar
                fetchDataFunction={() => GetAllChainNames({ is_pm: pm })}
                nameParam="chain_name"
                label="Search Chain Name"
                onSearch={ChainhandleSearch}
                idParam="chain_id"
                keyProp={key}
              />
            </div>
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
                  // marginLeft: "10px",
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
                // marginLeft: "10px",
                // marginTop: "9px",
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
                  marginRight: "5px",
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
              style={{ paddingTop: "0px", display: "flex", marginLeft: "4px" }}
            >
              <div
                style={{
                  fontSize: NormalFontSize,
                  marginRight: "5px",
                  marginLeft: "40px",
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
            {/* <StyledButton
              onClick={resetButtonHandler}
              style={{ backgroundColor: "gray" }}
            >
              Reset
            </StyledButton> */}
          </div>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default ChartFilter;
