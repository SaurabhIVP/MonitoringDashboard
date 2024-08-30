import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Typography, styled } from "@mui/material";
import "../../../App.css";
import "./Datepicker.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar, DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { NormalFontSize, PrimaryColor, SecondaryColor } from "../../../utils/Colors";

interface DateProps {
  name: string;
  selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
  flag: boolean;
}

function Datepicker({ name, selectedDate, onDateChange, flag }: DateProps) {
  const [error, setError] = useState(false);



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
      {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
      <DatePicker
        componentsProps={{
          textField: {
            size: "small",
            variant: "standard",
            sx: {
              "& .MuiInputBase-root": {
                fontSize: NormalFontSize,
                width: "135px",
                paddingLeft:'10px',
                paddingRight:'8px'
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "& .MuiInputAdornment-root": {
                  marginRight: "0px",
                },
                "& MuiButtonBase-root MuiIconButton-root": {
                  padding: "0px !important",
                  fontSize:'1 rem !important'
                },
                
              },
              "& .MuiInputBase-input": {
                fontSize: NormalFontSize,
                color:SecondaryColor
                
              },
              "& .MuiSvgIcon-root":{
                color:SecondaryColor,
                fontSize:'1rem',
                marginBottom:'3px'
              },
              "& .MuiButtonBase-root":{
                marginRight:'0px'
              }
            },
          },
        }}
        
        value={selectedDate ? dayjs(selectedDate) : null}
        onChange={(date) => handleDateChange(date)}
        
        components={{
          
          TextField: (props) => (
            <TextField
              {...props}
              error={error}
              onChange={(event) => {
                const value = event.target.value;
                const date = new Date(value);
                handleDateChange(date);
              }}
              helperText={
                error
                  ? "Date cannot be empty"
                  : !flag
                  ? "Start Date should not be greater than End Date"
                  : ""
              }
             
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
}

export default Datepicker;
