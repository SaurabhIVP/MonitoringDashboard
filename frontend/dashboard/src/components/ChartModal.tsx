import React, { FC } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

// Import necessary components from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchDataFunction: () => Promise<any>;
  ChartComponent: React.ComponentType<any>; // Accept any React component
  Label: string;
}

const ChartModal: FC<ChartModalProps> = ({
  isOpen,
  onClose,
  fetchDataFunction,
  ChartComponent,
  Label,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{Label}</DialogTitle>
      <DialogContent>
        <ChartComponent fetchDataFunction={fetchDataFunction} />
      </DialogContent>
    </Dialog>
  );
};

export default ChartModal;
