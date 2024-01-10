import { Button } from "@mui/material";
import React from "react";
import {Line,Bar} from 'react-chartjs-2';  
import { format } from 'date-fns-tz';
import { getMinutes } from "date-fns";

interface HorizontalBarChartProps
{
    rowDetail:ChainDetail;
}

interface ChainDetail
{
    chainID:number;
    chainName:string;
    chainStartTime:string;
    chainEndTime:string;
    currentTime:string;
    chainTotalTime:string;
    benchmarkTime:string;
    deviationTime:string;
}

const HorizontalBarChart=({rowDetail}:HorizontalBarChartProps)=>
{
    //date format conversion
    let chainStartTime= new Date(rowDetail.chainStartTime)
    let strChainStartTime = format(chainStartTime,'yyyy-MM-dd HH:mm:ss.SSS');
    let strDate = format(chainStartTime,'yyyy-MM-dd', { timeZone: 'Asia/Kolkata' });

    let chainEndTime= new Date(rowDetail.chainEndTime)
    let strChainEndTime = format(chainEndTime,'yyyy-MM-dd HH:mm:ss.SSS');

    let benchmarkStartTime= new Date(rowDetail.chainStartTime)
    let strBenchmarkStartTime = format(benchmarkStartTime,'yyyy-MM-dd HH:mm:ss.SSS');

    let benchmarkEndTime= new Date(rowDetail.chainStartTime)
    benchmarkEndTime.setMinutes(benchmarkEndTime.getMinutes()+ Number(rowDetail.benchmarkTime));
    let strBenchmarkEndTime = format(benchmarkEndTime,'yyyy-MM-dd HH:mm:ss.SSS');

    const state={
        labels:[strDate],
        datasets:[
            {
                label: 'Actual Time',
                data: [[strChainStartTime,strChainEndTime]],
                backgroundColor:'blue',
              },
              {
                label: 'Expected Time ',
                data: [[strBenchmarkStartTime,strBenchmarkEndTime]],
                backgroundColor:'green',
              }
        ]
    }

    return(
        <Bar data={state} options={
            { maintainAspectRatio: false, 
                responsive:true,
                indexAxis:'y',
                plugins:{
                    legend:{
                        labels:{
                            boxWidth:15,
                            boxHeight:15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: () => '', // Empty string to hide the title
                            label: (context: any) => {
                                debugger;
                                const dataIndex = context.dataIndex;
                                const datasetIndex = context.datasetIndex;
                                const dataItem = context.chart.data.datasets[datasetIndex].data[dataIndex];
                                const dataLabel = context.chart.data.datasets[datasetIndex].label;
                                const msg = [];
                                msg.push(`${dataLabel}`);
                                msg.push(`Start Time: ${new Date(dataItem[0]).toLocaleTimeString()}`);
                                msg.push(`End Time: ${new Date(dataItem[1]).toLocaleTimeString()}`);
                                msg.push('');
                                return msg;
                            },
                        }
                    }
                },
                scales: 
                {
                x: {
                        type: 'time',
                        time: {
                            displayFormats:{
                                millisecond:'MMM do hh:mm'
                            }
                        },
                    }
                },
            }
        }></Bar>
    )
}

export default HorizontalBarChart;