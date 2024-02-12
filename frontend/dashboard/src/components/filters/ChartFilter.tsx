import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Popover from "@mui/material/Popover";
import SearchBar from "../generics/SearchBar";
import Datepicker from "../generics/Datepicker";
import GetAllChainNames from "../../api/GetAllChainNames";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";

type ChartFilterProps = {
  onChainSelected: (chainData: { id: number; key: string }) => void;
  onStartDateSelected: (startdate: Date | null) => void;
  onEndDateSelected: (enddate: Date | null) => void;
  onBenchStartDateSelected: (sdate: Date | null) => void;
  onBenchEndDateSelected: (edate: Date | null) => void;
};

const ChartFilter: React.FC<ChartFilterProps> = ({
  onChainSelected,
  onStartDateSelected,
  onEndDateSelected,
  onBenchStartDateSelected,
  onBenchEndDateSelected,
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

  const buttonHandler = () => {
    const id = selectedChainValueRef.current?.id;
    const key = selectedChainValueRef.current?.key;
    if (id != null && key != null) {
      onChainSelected({ id, key });
    }
    handleClose();
  };

  return (
    <div style={{}}>
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
          <StyledHeading>Select Chain Name :</StyledHeading>
          <div>
            <SearchBar
              fetchDataFunction={GetAllChainNames}
              nameParam="chain_name"
              label="Search Chain Name"
              onSearch={ChainhandleSearch}
              idParam="chain_id"
            />
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

export default ChartFilter;
