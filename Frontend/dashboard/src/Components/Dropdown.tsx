import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface dropprops {
    name: string;
}

function Dropdown({ name }: dropprops) {
    return (
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">{name}</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={10}
                label="Benchmark Compute"
                onChange={() => { }}
            >
                <MenuItem value={10}>Average</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Dropdown;