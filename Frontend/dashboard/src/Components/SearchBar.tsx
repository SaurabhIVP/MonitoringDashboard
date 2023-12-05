import React, { useEffect, useState } from "react";
import { Stack, TextField, Autocomplete } from "@mui/material";

interface SearchBarProps {
    fetchDataFunction: () => Promise<any>;
    NameParam: string;
    Label: string;
    onSearch: (selectedValue: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ fetchDataFunction, NameParam, Label, onSearch}) => {
    const [data, setData] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
    const handleOnChange = (event: React.ChangeEvent<{}>, value: string | "") => {
        setSelectedValue(value);
        // Pass the selected value back to the parent component
        onSearch(value || ""); // Ensure that the value is not null
    };
    return (
        <>
            <Stack spacing={2} width={'500px'}>
            {data && (
                <Autocomplete
                    options={data.map((item) => item[NameParam] )}
                    renderInput={(params) => <TextField {...params} label={Label} />}
                    value={selectedValue}
                    onChange={handleOnChange}
                />
            )}
            </Stack>
        </>
    );
};

export default SearchBar;