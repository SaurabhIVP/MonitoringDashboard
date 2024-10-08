import React, { useEffect, useImperativeHandle, useState } from "react";
import { Stack, TextField, Autocomplete } from "@mui/material";
import { NormalFontSize } from "../../utils/Colors";

type SearchBarProps = {
  fetchDataFunction: () => Promise<any>;
  nameParam: string;
  label: string;
  onSearch: (key: string | null) => void;
  keyProp: string;
};
type SearchBarRef = {
  reset: () => void;
};
const SearchbarTask: React.ForwardRefRenderFunction<
  SearchBarRef,
  SearchBarProps
> = ({ fetchDataFunction, nameParam, label, onSearch, keyProp }, ref) => {
  const [data, setData] = useState<any[]>([]);

  const [selectedValue, setSelectedValue] = useState<{
    [key: string]: any;
  } | null>(null);
  const [key, setKey] = useState(keyProp);
  const handleClick = (event: any) => {
    // Stop the event propagation to prevent it from reaching the parent components
    // event.stopPropagation();
  };
  useEffect(() => {
    setKey(keyProp); // Update key state when keyProp changes
  }, [keyProp]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFunction();

        setData(response);

        console.log(response);
        console.log(data);
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
      setSelectedValue({ ...value }); // Include all properties from the selected option
      // Pass both name and id back to the parent component
      onSearch(value[nameParam]);
    } else {
      setSelectedValue(null);
      onSearch(null);
    }
  };

  return (
    <>
      <div onClick={handleClick} onKeyDown={handleClick}>
        <Stack spacing={2} width={"405px"}>
          {data && (
            <Autocomplete
              sx={{ fontSize: NormalFontSize }}
              key={key}
              options={data}
              getOptionLabel={(option) => option[nameParam]}
              isOptionEqualToValue={(option, value) =>
                option[nameParam] === value[nameParam]
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  inputProps={{
                    ...params.inputProps,
                    style: { fontSize: NormalFontSize },
                  }}
                />
              )}
              onChange={handleOnChange}
              renderOption={(props, option) => (
                <li {...props} style={{ fontSize: NormalFontSize }}>
                  {option[nameParam]}
                </li>
              )}
            />
          )}
        </Stack>
      </div>
    </>
  );
};

export default SearchbarTask;
