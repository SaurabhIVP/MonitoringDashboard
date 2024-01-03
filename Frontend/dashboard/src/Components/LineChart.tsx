import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BasicLineChartProps {
  fetchDataFunction: () => Promise<any>;
}

const BasicLineChart: React.FC<BasicLineChartProps> = ({fetchDataFunction}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await fetchDataFunction();
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [fetchDataFunction]);

  const chartData = {
    labels: data.map((item) =>new Date(item.date).getDate()),
    datasets: [
      {
        label: 'Task Time',
        data: data.map((item) => item.total_times),
        fill: false,
        borderColor: 'green',
        tension: 0.1,
      },
      {
        label: 'Benchmark Time',
        data: data.map((item) => item.avg_total_time),
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} options={{ maintainAspectRatio: false, scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Time (minutes)',
      },
    },
  },}} />;
};

export default BasicLineChart;