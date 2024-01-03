import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import BasicLineChart from './LineChart'; // Adjust the import path based on your project structure
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetchDataFunction: () => Promise<any>;
  Label: string
}

const ChartModal: FC<ChartModalProps> = ({
  isOpen,
  onClose,
  fetchDataFunction, Label
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{Label}</DialogTitle>
      <DialogContent>
        <BasicLineChart fetchDataFunction={fetchDataFunction}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChartModal;

