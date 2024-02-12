import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import Datepicker from "../generics/Datepicker";
import Tasknames from "../../api/Tasknames";
import ChainNames from "../../api/ChainNamesByTaskname";
import FlowIdGetter from "../../api/FlowIdGetter";
import { useEffect } from "react";
import {
  StyledBox,
  StyledButton,
  StyledHeading,
} from "../../utils/StyledComponents";

type ChartFilterProps = {
  onTaskSelected: (id: number, key: string) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
};

const TaskChartFilter: React.FC<ChartFilterProps> = ({
  onTaskSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
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

  const [flowId, setFlowId] = React.useState(0);

  const fetchData = async () => {
    try {
      const response = (await FlowIdGetter({
        taskname: selectedChainValue?.key,
        chainname: selectedTaskValue?.key,
      })) as any;

      const extractedFlowIds = response.map((item: any) => item.flow_id);
      setFlowId(extractedFlowIds[0]);
      console.log(flowId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedChainValue, selectedTaskValue]);

  const buttonHandler = () => {
    onTaskSelected(flowId, selectedChainValue?.key);
    handleClose();
  };

  return (
    <div style={{}}>
      <StyledButton onClick={handleClick}>Filter</StyledButton>
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
        <StyledBox>
          <StyledHeading>Select Task Name:</StyledHeading>
          <SearchBar
            fetchDataFunction={() => Tasknames({ chain_id: 0 })}
            nameParam="task_name"
            label="Search Task Name"
            onSearch={ChainhandleSearch}
            idParam="flow_id"
          />

          <h4 style={{ paddingLeft: "10px" }}>Select Chain Name:</h4>
          <SearchBar
            fetchDataFunction={() =>
              ChainNames({ taskname: selectedChainValue?.key })
            }
            nameParam="chain_name"
            label="Search Chain Name"
            onSearch={TaskhandleSearch}
            idParam="flow_id"
          />

          <h4 style={{ paddingLeft: "10px" }}>Select Duration:</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Start Datepicker */}
            <Datepicker
              name="Start Date"
              selectedDate={startDate}
              onDateChange={handleStartDateChange}
            />
            {/* End Datepicker */}
            <Datepicker
              name="End Date"
              selectedDate={EndDate}
              onDateChange={handleEndDateChange}
            />
          </div>
          <h4 style={{ paddingLeft: "10px" }}>Select Benchmark Duration:</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Start Datepicker */}
            <Datepicker
              name="Start Date"
              selectedDate={BenchstartDate}
              onDateChange={handleBenchStartDateChange}
            />
            {/* End Datepicker */}
            <Datepicker
              name="End Date"
              selectedDate={BenchendDate}
              onDateChange={handleBenchendDateChange}
            />
          </div>
          <Button
            onClick={buttonHandler}
            style={{
              fontWeight: "bold",
              backgroundColor: "#778899",
              color: "white",
              marginTop: "20px",
            }}
          >
            SUBMIT
          </Button>
        </StyledBox>
      </Popover>
    </div>
  );
};

export default TaskChartFilter;
