import * as React from "react";
import Box from "@mui/material/Box";
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
import { FilterColor, SecondaryColor } from "../../utils/Colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterButton } from "../generics/FilterButton";
import { useState } from "react";
import NumberField from "../generics/NumberField";
import Dropdown from "../generics/Dropdown";

type ChartFilterProps = {
  onChainSelected: (chainData: { id: number; key: string }) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onDeviationChange: (val: any | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  onPmChange:(val:string)=>void;
};

const ChartFilter: React.FC<ChartFilterProps> = ({
  onChainSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onDeviationChange,
  onBenchmarkComputeChange,
  onPmChange
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
    new Date(2024, 0, 17)
  );
  const [EndDate, setEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 24)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 1)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 30)
  );
  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
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
      const [isPm,setIsPm]=useState<string>("false");
      const handlePMChange = (event: SelectChangeEvent) => {
        setIsPm(event.target.value as string);
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
    onPmChange(isPm);
    handleClose();
  };
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 0, 17));
    setBenchmarkCompute("Average");
    setDeviationPercentage("0");
    setEndDate(new Date(2024, 0, 24));
    setBenchStartDate(new Date(2024, 0, 17));
    setBenchEndDate(new Date(2024, 0, 24));
    setKey(key === "1" ? "2" : "1");
    selectedChainValueRef.current = null;
  };
  const getboolean=(val:string)=>{
    if(val=="true"){
      return true;
    }else{
      return false;
    }
  }
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
        <StyledBox height={"auto"}>
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
          <FormControl  sx={{width:'550px',marginTop:'25px' }}>
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
          <div style={{paddingTop:'15px'}}>
            <SearchBar
              fetchDataFunction={()=>GetAllChainNames({is_pm:getboolean(isPm)})}
              nameParam="chain_name"
              label="Search Chain Name"
              onSearch={ChainhandleSearch}
              idParam="chain_id"
              keyProp={key}
            />
          </div>

          <StyledDatepickerContainer style={{ paddingTop: 10 }}>
            <Datepicker
              name="Chain Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
              flag={isEndDateValid}
            />
            <Datepicker
              name="Chain End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
              flag={isEndDateValid}
            />
          </StyledDatepickerContainer>

          <StyledDatepickerContainer   style={{marginBottom:'0px'}}>
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
          <StyledDatepickerContainer style={{marginBottom:'40px'}}>
            <div >
              <NumberField
                name="Deviation % Threshold"
                value={deviationPercentage}
                onChange={handleDeviationChange}
              ></NumberField>
            </div>
            <div style={{paddingTop:'19px'}}>
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
              bottom: "5px",
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

export default ChartFilter;
