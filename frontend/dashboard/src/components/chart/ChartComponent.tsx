import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateConversion } from "../../utils/DateConversion";
import { NormalFontSize, PrimaryColor, SecondaryColor } from "../../utils/Colors";
import { random } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BasicLineChartProps {
  fetchDataFunction: () => Promise<any>;
  title: string;
  axisname:string
}

const ChainChart: React.FC<BasicLineChartProps> = ({
  fetchDataFunction,
  title,
  axisname
}) => {
  const [data, setData] = useState<any[]>([]);
  const [alert,setAlert]=useState<boolean|null>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFunction();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    const hasNullAvgTotalTime = data.some((item) => item.avg_total_time == null);
  setAlert(hasNullAvgTotalTime);
  console.log('flag is'+ hasNullAvgTotalTime);
  }, [fetchDataFunction]);
  useEffect(()=>{
    console.log(data);
  },[data])
  
  
  const chartData = {
    labels: data.map((item) => DateConversion(item.date)),
    datasets: [
      {
        label: `${title}`,
        data: data.map((item) => item.total_times),
        fill: false,
        borderColor: SecondaryColor,
        backgroundColor:SecondaryColor,
        tension: 0.1,
        pointRadius: 2,
        borderWidth:1.4
      },
      {
        label: "Benchmark Time",
        data: data.map((item) => item.avg_total_time),
        fill: false,
        borderColor: "#404040",
        backgroundColor:"#404040",
        tension: 0.1,
        pointRadius: 0,
        borderWidth:1
        
      },
    ],
  };

  return (
    <div style={{ height: 250 }}>
      {
      alert==true?<div style={{float:'right',color:'red'}}>*Selected benchmark duration has no data</div>:<div></div>}
      <Line
     
        data={chartData}
        options={{
          plugins:{
            legend:{
             
              labels:{
                boxWidth:20,
                font:{
                  size:10,
                  family:'roboto'
                },
                color:SecondaryColor
              }
            }
          },
          layout: {},
          maintainAspectRatio: false,
          scales: {
            
            x: {
              type:'time',
              ticks:{
                color:SecondaryColor,
                font:{
                  family:'roboto',
                  size:10
                }
              },
              time: {
                unit: 'day', // Display one day per tick
                displayFormats: {
                    day: 'dd MMM yyyy' // Format for the tick labels
                }
            },
              title: {
                display: true,
                text: axisname,
                font:{
                  size:10,
                  family:'roboto'
                },
                color:SecondaryColor
              },
            },
            y: {
              beginAtZero: true,
              ticks:{
                color:SecondaryColor,
                font:{
                  family:'roboto',
                  size:10
                }
              },
              title: {
                display: true,
                text: "Time (seconds)",
                font:{
                  size:10,
                  family:'roboto'
                },
                color:SecondaryColor
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChainChart;
