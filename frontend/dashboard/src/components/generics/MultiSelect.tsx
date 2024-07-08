import React, { useEffect, useState } from "react";
import { Stack, TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { NormalFontSize, SecondaryColor } from "../../utils/Colors";

interface SearchBarProps {
  fetchDataFunction: () => Promise<any>;
  NameParam: string;
  Label: string;
  onSearch: (selectedValue: string[]) => void;
  keyProp: string;
}

const MultiSelect: React.FC<SearchBarProps> = ({
  fetchDataFunction,
  NameParam,
  Label,
  onSearch,
  keyProp,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [key, setKey] = useState(keyProp);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFunction();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fetchDataFunction]);

  const handleOnChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    setSelectedValue(value);
    // Pass the selected value back to the parent component
    onSearch(value);
  };

  useEffect(() => {
    setKey(keyProp); // Update key state when keyProp changes
  }, [keyProp]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Stack spacing={2} width={"400px"} sx={{marginLeft:'10px'}}>
      {data && (
        <Autocomplete
          multiple
          sx={{ fontSize: NormalFontSize,"& .MuiAutocomplete-tag": {
            fontSize:'10px',
            color:SecondaryColor,
            fontFamily:'roboto' // Change this to your desired color
          }, }}
          options={data.map((item) => item[NameParam])}
          disableCloseOnSelect
          key={key}
          renderOption={(props, option, { selected }) => (
            <li {...props} style={{ fontSize: NormalFontSize }}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          // value={selectedValue}
          onChange={handleOnChange}
        />
      )}
    </Stack>
  );
};

export default MultiSelect;
