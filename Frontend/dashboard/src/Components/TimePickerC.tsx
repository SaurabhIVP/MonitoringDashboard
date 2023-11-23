import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';

interface props{
  name:string
}

const TimePickerC = ({name}:props) => {
  const [selectedTime, setSelectedTime] = useState('12:00');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker label={name} value={selectedTime} onChange={(time:any)=>{setSelectedTime(time)}}/>
    </LocalizationProvider>
  );
};

export default TimePickerC;