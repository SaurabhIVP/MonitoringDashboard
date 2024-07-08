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
      <DemoContainer components={["DatePicker"]} sx={{
            width:'120px !important',
            overflow:'hidden',
            paddingTop:'2px'
          }}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          // label={name}
          sx={{overflow:'hidden','.css-11flz0p-MuiStack-root ':{width:'150px !important'},'.css-1tifq5c-MuiStack-root>.MuiTextField-root':{
            minWidth:'50px !important'
          }}}
          slotProps={{ textField: { variant: 'standard' } }} 
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
                sx={{'.css-v4u5dn-MuiInputBase-root-MuiInput-root':{ maxWidth:'120px !important'},'.css-1x51dt5-MuiInputBase-input-MuiInput-input':{
                  fontSize:'12px',
                  width: "70px !important",
                  paddingBottom:'0px'
                },'.css-i4bv87-MuiSvgIcon-root':{fontSize:'20px'} }}
              />
            ),
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Datepicker;
