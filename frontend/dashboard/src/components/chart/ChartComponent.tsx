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
}

const ChainChart: React.FC<BasicLineChartProps> = ({
  fetchDataFunction,
  title,
}) => {
  const [data, setData] = useState<any[]>([]);
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
  }, [fetchDataFunction]);
  const chartData = {
    labels: data.map((item) => DateConversion(item.date)),
    datasets: [
      {
        label: `${title}`,
        data: data.map((item) => item.total_times),
        fill: false,
        borderColor: PrimaryColor,
        tension: 0.1,
      },
      {
        label: "Benchmark Time",
        data: data.map((item) => item.avg_total_time),
        fill: false,
        borderColor: SecondaryColor,
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ height: 250 }}>
      <Line
        data={chartData}
        options={{
          layout: {},
          maintainAspectRatio: false,
          scales: {
            x: {
              type:'time',
              time: {
                unit: 'day', // Display one day per tick
                displayFormats: {
                    day: 'MMM dd' // Format for the tick labels
                }
            },
              title: {
                display: true,
                text: "Date",
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
