import { TextField } from "@mui/material";

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
        style={{ width: "200px", margin: "auto", marginTop: "20px" }}
      >
        <TextField
          id="number"
          label={name}
          type="number"
          value={value}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => onChange(event.target.value)}
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
