import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
interface TimePickerProps {
  label: string;
  value: any; // Change the type to the appropriate type for your value
  onChange: (time: any) => void; // Change the type to the appropriate type for your onChange handler
}

const TimePickerC: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker label={label} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
};
export default TimePickerC;