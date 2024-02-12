import dayjs from "dayjs";
import { TextField } from "@mui/material";
import "../../App.css";

interface dateProps {
  name: string;
  selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
}

function Datepicker({ name, selectedDate, onDateChange }: dateProps) {
  const handleClick = (event: any) => {
    event.stopPropagation();
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
        onChange={(event) => onDateChange(dayjs(event.target.value).toDate())}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "100%" }}
      />
    </form>
  );
}

export default Datepicker;
