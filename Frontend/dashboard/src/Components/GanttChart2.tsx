import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns-tz';



interface ganttProps{
    data:any[];
    starttime:any;
    endtime:any;
}

const GanttChart2: React.FC<ganttProps> = ({data,starttime,endtime}) => {
    const [newdata, setnewData] = useState<any[]>([]);
    const [newstart, setnewstart] = useState<any>([]);
    const [newend, setnewend] = useState<any>([]);
    useEffect(() => {
        console.log(starttime);
        if(starttime==null){
            starttime='2023-11-24T00:00:00';
        }
        if(endtime==null){
            endtime='2023-11-24T23:59:59';
        }
        const start = new Date(starttime);
        const end=new Date(endtime);
        const start_time = format(start, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        const end_time = format(end, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'Asia/Kolkata' });
        
        setnewstart(start_time);
        setnewend(end_time);
        console.log(newstart);
        const fetchData = async () => {
            try {
                setnewData(data);
                console.log(data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [data]);
    const [length,setlength]=useState<any>(500);
    const [height,setHeight]=useState<any>(500);
    useEffect(() => {
        console.log(newdata);
        let check=false;
        const processedData = newdata.map((item) => ({
            x: [item.start_time, item.end_time],
            y: item.chain_name,
            task_Name: item.task_name,
            delay:item.expected_endtime,
            status:item.status,
            performance:item.performance
        }));
        
        const templength=newdata.map((item)=>item.chain_name).filter((value,index,self)=>self.indexOf(value)===index);
        setlength(templength.length);
        
       
        // You can adjust the multiplier as needed
        const backgroundColors = processedData.map(item => {
            if (item.status === 'failed') {
              return 'red';
            } else {
              return item.performance < -25 ? 'orange' : 'lightgreen';
            }
          });
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Daily TimeFrame',
                    data:processedData,
                    backgroundColor:backgroundColors,
                    borderWidth: 1,
                    barThickness:20,
                    maxBarThickness: 20
                    
                },
            ],
        };
        const xdata = {
            labels: [],
            datasets: [
                {
                    label: 'Daily TimeFrame',
                    // data:processedData.map((item) => ({
                    //     x: [item.x[0],item.x[1]],
                    //     y:item.y
                    // })),
                    data:processedData
                    
                },
            ],
        };
        // config
        const config2: ChartConfiguration<any>={
            type:'bar',
            data:xdata,
            options:{
                layout: {
                    padding: {
                        left: 10,
                        top:10,
                        right:10
                    },
                    
                },
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    
                    x: {
                       
                        position: 'top',
                        type: 'time',
                       
                        time: {
                            unit: "millisecond",
                            minUnit: 'millisecond',
                            stepSize: 3600000,
                            
                            tooltipFormat: 'HH:mm:ss'
                        },
                        min: newstart,
                        max: newend,
                        afterFit:(ctx:any)=>{
                            ctx.height=50
                            
                        }
                        
                    },
                    y:{
                        ticks:{
                            display:false
                        },
                        grid:{
                            drawTicks:false
                        }
                    }
                    
                    
                },
                plugins:{
                    legend:{
                        display:false
                    }
                }
            }
        };
        const config1: ChartConfiguration<'bar'|any> = {
            type: 'bar',
            data,
            options: {
               maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        top:10,
                        right:10
                    },
                    
                },
               
                indexAxis: 'y',
                scales: {
                    x: {
                       
                        position: 'top',
                        type: 'time',
                        time: {
                            unit: "millisecond",
                            minUnit: 'millisecond',
                            stepSize: 3600000,
                            tooltipFormat: 'yyyy-MM-dd HH:mm:ss'
                        },
                        min: newstart,
                        max: newend,
                        display:false,
                        // ticks:{
                        //     display:false
                        // },
                        // grid:{
                        //     drawTicks:false
                        // }
                        
                    },
                    
                    
                }, plugins: {
                    legend:{
                        display:false,
                        
                    },
                    tooltip: {
                        enabled:true,
                        callbacks: {
                            title: () => '', // Empty string to hide the title
                            label: (context: any) => {
                                const dataIndex = context.dataIndex;
                                const datasetIndex = context.datasetIndex;
                                const dataItem = context.chart.data.datasets[datasetIndex].data[dataIndex];
                              
                                const startTime = new Date(dataItem.x[0]).toLocaleTimeString();
                                const endTime = new Date(dataItem.x[1]).toLocaleTimeString();
                                const expTime = new Date(dataItem.delay).toLocaleTimeString();
                                const newLine=[];
                                newLine.push(`Chain: ${dataItem.y}`);
                                newLine.push(`Task: ${dataItem.task_Name}`);
                                newLine.push(`Start Time: ${startTime}`);
                                newLine.push( `End Time: ${endTime}`);
                                newLine.push( `Expected End Time: ${expTime}`);
                                newLine.push( `Performance % : ${dataItem.performance}`);
                                newLine.push( `Status : ${dataItem.status}`);
                                return newLine;
                            }, // Display the y value in the tooltip label
                        }
                    },
                    
                },
            },
        };
        const myChart = new Chart(document.getElementById('myChart') as HTMLCanvasElement, config1);
        const myChart1 = new Chart(document.getElementById('myChart1') as HTMLCanvasElement, config2);
        console.log(`${length}px`);
        const chartVersion = document.getElementById('chartVersion') as HTMLSpanElement;
        if (chartVersion) {
            chartVersion.innerText = Chart.version;
        }
        return () => {
            myChart.destroy();
            myChart1.destroy();
        };
    }, [newdata]);
    useEffect(() => {
        // Wait until there is some data in templength
        console.log(length);
        if (length > 0) {
            console.log(length);
            setHeight(Math.max(200,length));
        }
    }, [length]);

    

    return (
        <div >
            <div style={{ maxWidth:'1500px'}}>
                <div style={{height:`50px`, width:'1410px',paddingBottom:'50px',paddingLeft:'290px'}}>
                    <canvas id="myChart1" ></canvas>
                </div>
            </div>     
            <div className="chartCard"  style={{ height:'400px',maxWidth:'1700px',overflowY:'scroll'}}>
                <div className="chartBox" style={{ height:`${Math.max(length*30,200)-50}px`, width:'1700px'}}>
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default GanttChart2;
