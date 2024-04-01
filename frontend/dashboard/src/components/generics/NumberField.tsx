import { TextField } from "@mui/material";
import "./datepicker/Datepicker.css"

interface Props {
  name: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

function NumberField({ name, value, onChange }: Props) {
  return (
    <>
      <form
        noValidate
        style={{width:'260px',paddingTop:'0px'}}
        className="form"
      >
        <TextField
          id="number"
          label={name}
          type="number"
          value={value}
          // InputProps={{ inputProps: { min: 0 } }}
          onChange={(event:any) => onChange(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: "100%" }}
        />
      </form>
    </>
  );
}

export default NumberField;
