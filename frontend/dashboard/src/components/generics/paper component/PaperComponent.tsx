import { Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";
import "./PaperComponent.css"
export function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        className="paper"
        // sx={{maxHeight:'80%'}}
      />
    </Draggable>
  );
}
