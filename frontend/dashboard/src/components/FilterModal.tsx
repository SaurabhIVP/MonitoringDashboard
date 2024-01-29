import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchBar from './SearchBar';
import AllData from '../api/AllData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface props{
   
}

const FilterModal: React.FC<props> = ()=>{
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedChainValue, setSelectedChainValue] = React.useState<{
    id: number;
    [key: string]: any;
  } | null>(null);
  const ChainhandleSearch = async (id: number | null, key: string | null) => {
    setSelectedChainValue(id !== null ? { id, key } : null);
    
  };

  return (
    <div>
      <Button onClick={handleOpen}>Filter Data</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <SearchBar
            fetchDataFunction={AllData}
            nameParam="chain_name"
            label="Search Chain Name"
            onSearch={ChainhandleSearch}
            idParam="chain_id"
          />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default FilterModal;