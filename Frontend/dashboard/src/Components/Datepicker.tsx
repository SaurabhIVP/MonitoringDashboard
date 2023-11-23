import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/lab';
import dayjs from 'dayjs';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material';
import '../App.css';

interface dateProps {
    name: string;
    selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
}

function Datepicker({ name, selectedDate, onDateChange }: dateProps) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const today = new Date();
    return (
        <form noValidate style={{ width: '300px', margin: 'auto', marginTop: '20px' }}>
        <TextField
          id="date"
          label={name}
          type="date"
          value={selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}
          onChange={(event) => onDateChange(dayjs(event.target.value).toDate())}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: '100%' }}
        />
      </form>
    );
}

export default Datepicker;