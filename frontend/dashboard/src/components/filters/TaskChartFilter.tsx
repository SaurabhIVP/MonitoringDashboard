import * as React from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import Datepicker from "../generics/datepicker/Datepicker";
import Tasknames from "../../api/Tasknames";
import ChainNames from "../../api/ChainNamesByTaskname";
import FlowIdGetter from "../../api/FlowIdGetter";
import { useEffect, useState } from "react";
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
import NumberField from "../generics/NumberField";
import Dropdown from "../generics/Dropdown";
type ChartFilterProps = {
  onTaskSelected: (id: number, key: string) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
  onDeviationChange: (val: any | null) => void;
  onBenchmarkComputeChange: (val: any | null) => void;
  onPmChange:(val:string)=>void;
};

const TaskChartFilter: React.FC<ChartFilterProps> = ({
  onTaskSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
  onBenchmarkComputeChange,
  onDeviationChange,
  onPmChange
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [selectedChainValue, setSelectedChainValue] = React.useState<{
    id: number;
    [key: string]: any;
  } | null>(null);

  const [selectedTaskValue, setSelectedTaskValue] = React.useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
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
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedChainValue(id !== null ? { id, key } : null);
  };

  const TaskhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedTaskValue(id !== null ? { id, key } : null);
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
    new Date(2024, 0, 24)
  );
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    new Date(2024, 0, 17)
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    new Date(2024, 0, 24)
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

  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };

  const [flowId, setFlowId] = React.useState(0);

  const fetchData = async () => {
    try {
      const response = (await FlowIdGetter({
        taskname: selectedChainValue?.key,
        chainname: selectedTaskValue?.key,
        is_pm:getboolean(isPm)
      })) as any;

      const extractedFlowIds = response.map((item: any) => item.flow_id);
      setFlowId(extractedFlowIds[0]);
      console.log(flowId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const isEndDateValid =
    startDate === null ||
    EndDate === null ||
    (startDate !== null && EndDate !== null && EndDate >= startDate);
  const [key, setKey] = useState("1");
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 0, 17));
    setEndDate(new Date(2024, 0, 24));
    setBenchStartDate(new Date(2024, 0, 17));
    setBenchEndDate(new Date(2024, 0, 24));
    setSelectedChainValue(null);
    setKey(key === "1" ? "2" : "1");
    setSelectedTaskValue(null);
  };
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);
  useEffect(() => {
    fetchData();
  }, [selectedChainValue, selectedTaskValue]);

  const buttonHandler = () => {
    console.log(flowId);
    onTaskSelected(flowId, selectedChainValue?.key);
    onStartDateSelected(startDate);
    onEndDateSelected(EndDate);
    onBenchStartDateSelected(BenchstartDate);
    onBenchEndDateSelected(BenchendDate);
    onDeviationChange(deviationPercentage);
    onBenchmarkComputeChange(benchmarkCompute)
    onPmChange(isPm)
    handleClose();
  };
  
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
  return (
    <div style={{}}>
      <FilterButton ariaLabel="" onClick={handleClick}></FilterButton>
      <Popover
        id={id}
        keepMounted={true}
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
          <div style={{ marginBottom: 15,paddingTop:'15px' }}>
            <SearchBar
              fetchDataFunction={() => Tasknames({ chain_id: 0,is_pm:getboolean(isPm) })}
              nameParam="task_name"
              label="Search Task Name"
              onSearch={ChainhandleSearch}
              idParam="flow_id"
              keyProp={key}
            />
          </div>

          <SearchBar
            fetchDataFunction={() =>
              ChainNames({ taskname: selectedChainValue?.key,is_pm:getboolean(isPm) })
            }
            nameParam="chain_name"
            label="Search Chain Name"
            onSearch={TaskhandleSearch}
            idParam="flow_id"
            keyProp={key}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop:'10px'
            }}
          >
            {/* Start Datepicker */}
            <Datepicker
              name="Task Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
              flag={isEndDateValid}
            />
            {/* End Datepicker */}
            <Datepicker
              name="Task End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
              flag={isEndDateValid}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 0,
              paddingTop:'10px'
            }}
          >
            {/* Start Datepicker */}
            <Datepicker
              name="Benchmark Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
              flag={isBenchEndDateValid}
            />
            {/* End Datepicker */}
            <Datepicker
              name="Benchmark End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
              flag={isBenchEndDateValid}
            />
          </div>
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
                onChange={()=>{}}
              ></Dropdown>
            </div>
          </StyledDatepickerContainer>
          {/* <Button
            onClick={buttonHandler}
            style={{
              fontWeight: "bold",
              backgroundColor: "#778899",
              color: "white",
              marginTop: "20px",
            }}
          >
            SUBMIT
          </Button> */}
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

export default TaskChartFilter;
