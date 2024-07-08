import React from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import './CloseButton.css'; // Import your CSS file for styling

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  return (
    <IconButton className="reset-button" onClick={onClick}>
      <RefreshIcon className="reset-icon" />
    </IconButton>
  );
};

export default ResetButton;
