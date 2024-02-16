import React, { useState } from "react";
import dayjs from "dayjs";
import { TextField, Typography } from "@mui/material";
import "../../App.css";

interface DateProps {
  name: string;
  selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
}

function Datepicker({ name, selectedDate, onDateChange }: DateProps) {
  const [error, setError] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setError(false);
      onDateChange(dayjs(event.target.value).toDate());
    } else {
      setError(true);
    }
  };

  return (
    <form
      noValidate
      style={{ width: "200px", margin: "auto", marginTop: "20px" }}
      onClick={handleClick}
    >
      <TextField
        id="date"
        label={name}
        type="date"
        value={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        error={error}
        helperText={error ? "Date cannot be empty" : ""}
        style={{ width: "100%" }}
      />
    </form>
  );
}

export default Datepicker;
