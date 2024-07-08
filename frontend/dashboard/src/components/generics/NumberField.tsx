import { TextField } from "@mui/material";
import "./datepicker/Datepicker.css"
import { NormalFontSize, SecondaryColor } from "../../utils/Colors";

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
        style={{width:'120px',paddingTop:'0px',marginTop:'0px'}}
        className="form"
      >
        <TextField
          id="number"
          // label={name}
          type="number"
          value={value}
          variant="standard"
          // InputProps={{ inputProps: { min: 0 } }}
          onChange={(event:any) => onChange(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: "100%",'.css-1x51dt5-MuiInputBase-input-MuiInput-input':{
            fontSize:NormalFontSize,
            fontFamily:'roboto',
            color:SecondaryColor
          } }}
        />
      </form>
    </>
  );
}

export default NumberField;
