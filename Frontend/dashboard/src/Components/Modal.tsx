import { Box, Button, Dialog, DialogContent, DialogTitle, Fade, Grid, IconButton, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import { Line } from 'react-chartjs-2';
import HorizontalBarChart from './HorizontalBarChart';

interface ModalProps
{
    open:boolean;
    closeDialog:()=>void;
    rowDetail:any;
}

const Modal=({open,closeDialog,rowDetail}:ModalProps)=>{
    return(
        
            <Dialog 
            fullWidth
            open={open} 
            maxWidth="md"
            scroll="body"
            onClose={closeDialog} 
            >
                <DialogTitle>
                    <Typography variant='h6'><strong>Chain Name: </strong>
                        {
                            rowDetail !=null? rowDetail.chainName : ""
                        }
                    </Typography>
                    <IconButton
                    size='small'
                    onClick={closeDialog}
                    sx={{position: "absolute", right:"1rem", top:"1rem"}}
                    ><strong>X</strong>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item md>
                            <HorizontalBarChart rowDetail={rowDetail} ></HorizontalBarChart>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
    )
}

export default Modal;