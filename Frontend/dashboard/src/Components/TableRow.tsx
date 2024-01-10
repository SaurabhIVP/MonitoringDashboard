import { Avatar, Button } from "@mui/material";
import {columnProps} from "../components/Table"
import { useState } from "react";
import LineChart from "./HorizontalBarChart";
import Modal from "./Modal";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";
import analyticsIcon from '../analyticsIcon.jpg'

type tableRowProps<T,K extends keyof T>={
    data: Array<T>;
    columns: Array<columnProps<T,K>>;
}

const TableRow=<T,K extends keyof T>({data,columns}:tableRowProps<T,K>):JSX.Element=>
{
    const rowCount = data.length;
    const [isOpen,setIsOpen] = useState(false);
    const [row,setRow] = useState<T>();
    console.log(rowCount);
    let rows;

    const getRowDetail=(row:T)=>{
        setIsOpen(true); 
        setRow(row);
    }

    if(rowCount>0)
    {
        rows= data.map((row,i)=>{
            return(
                <tr key={`row-${i}`}>
                    {
                        columns.map((col,i2)=>{
                            if(col.action==true)
                            {
                                return(
                                    <td>
                                        {
                                            <Button sx={{width:20, height:20}} onClick={()=>{getRowDetail(row)} } startIcon={<Avatar variant="rounded" sx={{width:20, height:20}} src={analyticsIcon}></Avatar>} ></Button>
                                        }
                                    </td>
                                );
                            }
                            else
                            {
                                return(
                                    <td key={`col-${i2}`}>
                                        {
                                            `${row[col.key]}`
                                        }
                                    </td>
                                );
                            }
                        })
                    }
                </tr>
            );
        })
    }
    else
    {
        rows = <tr>
            <td colSpan={columns.length} id="NoData">No Data</td>
        </tr>
    }
    
    return(
        <>
        <tbody>
            {
                rows
            }
        </tbody>
        <Modal open={isOpen} closeDialog={()=>{setIsOpen(false)}} rowDetail={row}></Modal>
        </>
    );
    
}



export default TableRow;