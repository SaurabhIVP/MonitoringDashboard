import React from 'react';
import { IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterColor } from '../../utils/Colors';

interface CustomIconButtonProps {
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  ariaLabel: string;
}

export const FilterButton: React.FC<CustomIconButtonProps> = ({
  onClick,
  ariaLabel
}) => {
  return (
    <IconButton onClick={onClick} aria-label={ariaLabel} sx={{ color: FilterColor,boxShadow:'0 0 5px gray' }}>
      <FilterAltIcon fontSize="large"></FilterAltIcon>
    </IconButton>
  );
};

// Usage
{/* <CustomIconButton
  onClick={handleClick}
  ariaLabel="filter"
  color={FilterColor}
  iconComponent={<FilterAltIcon fontSize="large" />}
/> */}
