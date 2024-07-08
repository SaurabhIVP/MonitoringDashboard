import React from 'react';
import './CloseButton.css'; // Import your CSS file for styling
import CloseIcon from '@mui/icons-material/Close';
interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className="close-button" onClick={onClick}>
      <CloseIcon></CloseIcon>
    </button>
  );
};

export default CloseButton;
