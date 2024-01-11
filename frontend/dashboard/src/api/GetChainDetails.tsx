import axios from "axios";
import { useEffect, useState } from "react";
import Table,{ columnProps } from "../components/Table";
import {format} from 'date-fns-tz';
import { Button } from "@mui/material";

interface chainDetailsProps
{
    chainID:{
        id: number;
        [key: string]: any;
      } | null;
    taskID:{
        id: number;
        [key: string]: any;
      } | null;
    benchmarkCompute:string;
    startDate:any | null;
    endDate:any | null;
    benchmarkStartDate:any | null;
    benchmarkEndDate:any | null;
    //showTableComponent: boolean;
}

interface ChainDetails
{
    //chainID:number;
    chainName:string;
    chainStartTime:string;
    chainEndTime:string;
    currentTime:string;
    chainTotalTime:string;
    benchmarkTime:string;
    deviationTime:string;
    status:string;
    action:string;
}

export function GetChainDetails({chainID,taskID,benchmarkCompute,startDate,endDate,benchmarkStartDate,benchmarkEndDate}:chainDetailsProps)
{
    const columnList: columnProps<ChainDetails, keyof ChainDetails>[]=[
        // {
        //     key:'chainID',
        //     header:'Chain ID',
        //     passValue:false
        // },
        {
            key:'chainName',
            header:'Chain Name',
            action:false
        },
        {
            key:'chainStartTime',
            header:'Chain Start Time',
            action:false
        },
        {
            key:'chainEndTime',
            header:'Chain End Time',
            action:false
        },
        {
            key:'currentTime',
            header:'Current Time',
            action:false
        },
        {
            key:'chainTotalTime',
            header:'Chain Total Time',
            action:false
        },
        {
            key:'benchmarkTime',
            header:'Benchmark Time',
            action:false
        },
        {
            key:'deviationTime',
            header:'Deviation Time',
            action:false
        },
        {
            key:'status',
            header:'Status',
            action:false
        }
        
        ,
        {
            key:'action',
            header:'Action',
            action:true
        }
    ]
    
    const [chainList,setChainList] = useState<ChainDetails[]>([]);

    const strStartDate = format(startDate,'yyyyMMdd');
    const strEndDate = format(endDate,'yyyyMMdd');
    const strBenchmarkStartDate = format(benchmarkStartDate,'yyyyMMdd');
    const strBenchmarkEndDate = format(benchmarkEndDate,'yyyyMMdd');

    const [showTableComponent,setShowTableComponent] = useState(false);

    const handleButtonClick=()=>{
        setShowTableComponent(true);
    }

    useEffect(()=>{

        console.log("chainID",chainID?.id);
        console.log("taskID",taskID?.id);
        console.log("benchmarkCompute",benchmarkCompute);
        console.log("strStartDate",strStartDate);
        console.log("strEndDate",strEndDate);
        console.log("strBenchmarkStartDate",strBenchmarkStartDate);
        console.log("strBenchmarkEndDate",strBenchmarkEndDate);

        let chain_ID:number=0;
        let task_ID:number=0;
        if(!chainID)
        {
            chain_ID=0;
        }
        else
        {
            chain_ID=chainID.id;
        }

        if(!taskID)
        {
            task_ID=0;
        }
        else
        {
            task_ID=taskID.id;
        }
        console.log(task_ID);

        axios
        .get(`https://localhost:7022/api/Data/getAllChainDetails/${chain_ID}/${task_ID}/${benchmarkCompute}/${strStartDate}/${strEndDate}/${strBenchmarkStartDate}/${strBenchmarkEndDate}`
        )
        .then(
            res=>
            {
                console.log(res.data);
                const data = res.data;
                setChainList(data);
                setShowTableComponent(false);
            }
        )
        .catch(err=>{
            console.log(err);
        });

    },[showTableComponent]);
    
    return(
        <div>
        <Button variant="contained" onClick={handleButtonClick} size="medium" style={{ borderRadius: "10px",
          marginBottom: "2%",
          backgroundColor: "#005A44", }}>Submit</Button>
        <Table data={chainList} columns={columnList}></Table>
        </div>
    )
}

//export default GetChainDetails;