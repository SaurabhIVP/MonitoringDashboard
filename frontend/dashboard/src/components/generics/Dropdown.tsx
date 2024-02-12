import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

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
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="demo-simple-select-autowidth-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={benchmarkCompute}
        label={name}
        onChange={handleChange}
      >
        {benchmarkComputeOptions.map((item) => {
          return <MenuItem value={item.value}>{item.text}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
