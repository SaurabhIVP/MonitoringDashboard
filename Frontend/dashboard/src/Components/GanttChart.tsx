import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'recharts';
import { ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';
import GanttData from '../Api/GanttData';

const GanttChart: React.FC = () => {
    const [newdata, setnewData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GanttData();
                setnewData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(newdata);
        // setup
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'Daily TimeFrame',
                    //   data: [{x:['2023-09-25T08:00:00','2023-09-25T15:30:00'],y:'task-1'}] as any,
                    data: newdata.map((item) => ({
                        x: [item.start_time, item.end_time],
                        y: item.chain_name,
                        task_Name:item.task_name
                    })) as any,
                    backgroundColor: [
                        'rgba(255, 26, 104, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 0, 0, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 26, 104, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 0, 0, 1)',
                    ],
                    borderWidth: 1
                },
            ],
        };

        // config
        const config: ChartConfiguration<'bar'> = {
            type: 'bar',
            data,
            options: {
                layout: {
                    padding: {
                        left: 10
                    }
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
                            tooltipFormat: 'HH:mm:ss'
                        },
                        min: '2023-11-16T00:00:00' as any,
                        max: '2023-11-16T23:59:59' as any,

                    },

                }, plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => '', // Empty string to hide the title
                            label: (context: any) => {
                                const dataIndex = context.dataIndex;
                                const datasetIndex = context.datasetIndex;
                                const dataItem = context.chart.data.datasets[datasetIndex].data[dataIndex];
                                const startTime = new Date(dataItem.x[0]).toLocaleTimeString();
                                const endTime = new Date(dataItem.x[1]).toLocaleTimeString();
                                return `Chain: ${dataItem.y},Task:${dataItem.task_Name}, Start Time: ${startTime}, End Time: ${endTime}`;
                            }, // Display the y value in the tooltip label
                        }
                    }
                },


            },
        };

        // render init block
        const myChart = new Chart(document.getElementById('myChart') as HTMLCanvasElement, config);

        // Instantly assign Chart.js version
        const chartVersion = document.getElementById('chartVersion') as HTMLSpanElement;
        if (chartVersion) {
            chartVersion.innerText = Chart.version;
        }

        // Cleanup when the component unmounts
        return () => {
            myChart.destroy();
        };
    }, [newdata]);

    return (
        <div>
            <div className="chartMenu">
                <p>
                    Gantt Chart
                </p>
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <canvas id="myChart" style={{height:'750px'}}></canvas>
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
