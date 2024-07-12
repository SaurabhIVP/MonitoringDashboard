import * as React from "react";
import Popover from "@mui/material/Popover";
import TuneIcon from "@mui/icons-material/Tune";
import Datepicker from "../generics/datepicker/Datepicker";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledBox,
  StyledButton,
  StyledDatepickerContainer,
  StyledHeading,
} from "../../utils/StyledComponents";
import { IconButton } from "@mui/material";
import { NormalFontSize, SecondaryColor } from "../../utils/Colors";
import ResetButton from "../generics/ResetButton";
import CloseButton from "../generics/CloseButton";
import SubmitButton from "../generics/SubmitButton";
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

  const handleEndDateChange = (newDate: Date | null) => {
    setEndDate(newDate);
  };
  const resetButtonHandler = () => {
    setStartDate(new Date(2024, 1, 1));
    setEndDate(new Date(2024, 1, 7));
    setBenchStartDate(new Date(2024, 1, 1));
    setBenchEndDate(new Date(2024, 1, 7));
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
    onStartDateSelected(startDate);
    onEndDateSelected(EndDate);
    onBenchStartDateSelected(BenchstartDate);
    onBenchEndDateSelected(BenchendDate);
    handleClose();
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
  return (
    <div>
      <IconButton onClick={handleClick} sx={{ padding: "0px" }}>
        <TuneIcon></TuneIcon>
      </IconButton>
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
          <div
            style={{
              position: "absolute",

              bottom: "2px",
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

export default DateFilters;
