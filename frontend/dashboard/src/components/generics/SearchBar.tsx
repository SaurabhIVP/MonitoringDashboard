import React, { useEffect, useImperativeHandle, useState } from "react";
import { Stack, TextField, Autocomplete } from "@mui/material";

type SearchBarProps= {
  fetchDataFunction: () => Promise<any>;
  nameParam: string;
  label: string;
  onSearch: (id: number | null, key: string | null) => void;
  idParam: string;
}
type SearchBarRef = {
  reset: () => void;
};
const SearchBar: React.ForwardRefRenderFunction<SearchBarRef,SearchBarProps> = ({
  fetchDataFunction,
  nameParam,
  label,
  onSearch,
  idParam,
},ref) => {
  const [data, setData] = useState<any[]>([]);
  
  const [selectedValue, setSelectedValue] = useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
 
  const handleClick = (event:any) => {
    // Stop the event propagation to prevent it from reaching the parent components
    // event.stopPropagation();
  };
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
      setSelectedValue({ id: value[idParam], ...value }); // Include all properties from the selected option
      // Pass both name and id back to the parent component
      onSearch(value[idParam], value[nameParam]);
    } else {
      setSelectedValue(null);
      onSearch(null, null);
    }
  };

  return (
    <>
    <div onClick={handleClick} onKeyDown={handleClick}>
    <Stack spacing={2} width={"500px"} >
        {data && (
           <Autocomplete
           options={data}
           getOptionLabel={(option) => option[nameParam]}
           isOptionEqualToValue={(option, value) => option[nameParam] === value[nameParam]}
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
