import React, { useEffect, useState } from "react";
import { Stack, TextField, Autocomplete } from "@mui/material";

interface SearchBarProps {
    fetchDataFunction: () => Promise<any>;
    nameParam: string;
    label: string;
    onSearch: (id:number|null) => void;
    idParam:string;
}
const SearchBar: React.FC<SearchBarProps> = ({ fetchDataFunction, nameParam, label, onSearch,idParam}) => {
    const [data, setData] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState<{ id: number} | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await fetchDataFunction();
                    // console.log(response)
                    setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [fetchDataFunction]);
    const handleOnChange = (event: React.ChangeEvent<{}>, value: {[key:string]:any} | null) => {
        
if (value) {
        setSelectedValue({id:value[idParam]}); // Assuming NameParam is the property name you want to display
        // Pass both name and id back to the parent component
        onSearch(value[idParam]);
    } else {
        setSelectedValue(null);
        onSearch(null);
    }

    };
    return (
        <>
            <Stack spacing={2} width={'500px'}>
            {data && (
                <Autocomplete
                    options={data}
                    getOptionLabel={(option)=>option[nameParam]}
                    renderInput={(params) => <TextField {...params} label={label} />}
                    // value={selectedValue}
                    onChange={handleOnChange}
                />
            )}
            </Stack>
        </>
    );
};

export default SearchBar;