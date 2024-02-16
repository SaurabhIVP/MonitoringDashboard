import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { FilterColor, PrimaryColor, SecondaryColor } from "./Colors";

export const StyledBox = styled(Box)({
    width: "550px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "20px 20px rgba(0, 0, 0, 0.1)",
  });
  
export  const StyledHeading = styled("h4")({
    margin: "10px 0",
  });
  
export  const StyledButton = styled(Button)({
    marginTop: 17,
    fontWeight: "bold",
    backgroundColor: FilterColor,
    // position:'absolute',
    color: "white",
    "&:hover": {
      backgroundColor: PrimaryColor,
    },
  });
  
export const StyledDatepickerContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  });
  