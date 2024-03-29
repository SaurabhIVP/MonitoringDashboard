import React, { useEffect, useState } from "react";
import { Stack, TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface SearchBarProps {
  fetchDataFunction: () => Promise<any>;
  NameParam: string;
  Label: string;
  onSearch: (selectedValue: string[]) => void;
}

const MultiSelect: React.FC<SearchBarProps> = ({
  fetchDataFunction,
  NameParam,
  Label,
  onSearch,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

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

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Stack spacing={2} width={"470px"}>
      {data && (
        <Autocomplete
          multiple
          options={data.map((item) => item[NameParam])}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label={Label} />}
          value={selectedValue}
          onChange={handleOnChange}
        />
      )}
    </Stack>
  );
};

export default MultiSelect;
