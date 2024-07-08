import React from "react";
import Button from "@mui/material/Button";
import {
  NormalFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";

interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={onClick}
      sx={{
        backgroundColor: PrimaryColor,
        color: SecondaryColor,
        borderColor: SecondaryColor,
        fontSize: NormalFontSize,
      }}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
