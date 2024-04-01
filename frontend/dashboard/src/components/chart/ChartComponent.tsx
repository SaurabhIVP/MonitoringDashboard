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
import { PrimaryColor, SecondaryColor } from "../../utils/Colors";
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
  
  
  const chartData = {
    labels: data.map((item) => DateConversion(item.date)),
    datasets: [
      {
        label: `${title}`,
        data: data.map((item) => item.total_times),
        fill: false,
        borderColor: PrimaryColor,
        backgroundColor:PrimaryColor,
        tension: 0.1,
        pointRadius: 2
      },
      {
        label: "Benchmark Time",
        data: data.map((item) => item.avg_total_time),
        fill: false,
        borderColor: "#b4b4b8",
        backgroundColor:"#b4b4b8",
        tension: 0.1,
        pointRadius: 0
        
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
                boxWidth:20
              }
            }
          },
          layout: {},
          maintainAspectRatio: false,
          scales: {
            
            x: {
              type:'time',
              time: {
                unit: 'day', // Display one day per tick
                displayFormats: {
                    day: 'dd MMM yyyy' // Format for the tick labels
                }
            },
              title: {
                display: true,
                text: axisname,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Time (seconds)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChainChart;
