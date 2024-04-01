import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Typography } from "@mui/material";
import "../../../App.css";
import "./Datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";

interface DateProps {
  name: string;
  selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
  flag: boolean;
}

function Datepicker({ name, selectedDate, onDateChange, flag }: DateProps) {
  const [error, setError] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleDateChange = (date: any) => {
    if (date) {
      const newDate = dayjs(date);
      setError(false);
      onDateChange(newDate.toDate());
    } else {
      setError(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          label={name}
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={(date) => handleDateChange(date)}
          components={{
            // Custom input component
            TextField: (props) => (
              <TextField
                {...props}
                error={error}
                helperText={
                  error
                    ? "Date cannot be empty"
                    : !flag
                    ? "Start Date should not be greater than End Date"
                    : ""
                }
                style={{ width: "100%" }}
              />
            ),
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Datepicker;

// <form
//   noValidate
//   className="form"

//   onClick={handleClick}
// >
//   <TextField
//     id="date"
//     label={name}
//     type="date"

//     value={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
//     onChange={handleDateChange}
//     InputLabelProps={{
//       shrink: true,
//     }}
//     error={error && flag}
//     helperText={error ? "Date cannot be empty":!flag? "Start Date should not be greater than End Date":""}
//     style={{ width: "100%" }}
//   />
// </form>
