import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { NormalFontSize } from "../../utils/Colors";

interface benchmarkComputeOption {
  text: string;
  value: string;
}

interface dropprops {
  name: string;
  benchmarkComputeOptions: benchmarkComputeOption[];
  onChange: (value: string) => void;
}

function Dropdown({ name, benchmarkComputeOptions, onChange }: dropprops) {
  const [benchmarkCompute, setBenchmarkCompute] = useState("Average");
  const handleChange = (event: SelectChangeEvent) => {
    setBenchmarkCompute(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{width:'120px','.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input':{
      fontSize:NormalFontSize
    } } } variant="standard">
      {/* <InputLabel id="demo-simple-select-autowidth-label">{name}</InputLabel> */}
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={benchmarkCompute}
        label={name}
        onChange={handleChange}
      >
        {benchmarkComputeOptions.map((item) => {
          return <MenuItem sx={{fontSize:NormalFontSize}} value={item.value}>{item.text}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
