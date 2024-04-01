import React, { useEffect, useState } from "react";
import { Stack, TextField, Autocomplete } from "@mui/material";

type SearchBarProps = {
  fetchDataFunction: () => Promise<any>;
  nameParam: string;
  label: string;
  onSearch: (id: number | null, key: string | null) => void;
  idParam: string;
  keyProp: string; // Add keyProp to props
};

const SearchBar: React.FC<SearchBarProps> = ({
  fetchDataFunction,
  nameParam,
  label,
  onSearch,
  idParam,
  keyProp, // Destructure keyProp
}) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const [key, setKey] = useState(keyProp); // Initialize key state with keyProp

  const handleClick = (event: any) => {
    // Stop the event propagation to prevent it from reaching the parent components
    // event.stopPropagation();
  };

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

  const handleOnChange = (
    event: React.ChangeEvent<{}>,
    value: { [key: string]: any } | null
  ) => {
    if (value) {
      setSelectedValue({ id: value[idParam], ...value });
      onSearch(value[idParam], value[nameParam]);
    } else {
      setSelectedValue(null);
      onSearch(null, null);
    }
  };

  useEffect(() => {
    setKey(keyProp); // Update key state when keyProp changes
  }, [keyProp]);

  return (
    <>
      <div onClick={handleClick} onKeyDown={handleClick}>
        <Stack spacing={2} width={"550px"} >
          {data && (
            <Autocomplete
              key={key} // Use key for re-rendering
              options={data}
              getOptionLabel={(option) => option[nameParam]}
              isOptionEqualToValue={(option, value) =>
                option[nameParam] === value[nameParam]
              }
              renderInput={(params) => <TextField {...params} label={label} />}
              onChange={handleOnChange}
            />
          )}
        </Stack>
      </div>
    </>
  );
};

export default SearchBar;
