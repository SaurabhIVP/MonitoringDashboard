import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

// Register the necessary modules for Chart.js
Chart.register(...registerables);
const SyncGantt: React.FC = () => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chainsData = [
      {
        chainname: "Chain A",
        chainId: 1,
        chain_startTime: "2024-01-01T08:00:00",
        chain_endTime: "2024-01-01T12:00:00",
        chain_guid: "guid1",
      },
      {
        chainname: "Chain B",
        chainId: 2,
        chain_startTime: "2024-01-01T10:00:00",
        chain_endTime: "2024-01-01T14:00:00",
        chain_guid: "guid2",
      },
    ];

    const tasksData = [
      {
        taskname: "Task 1",
        task_startTime: "2024-01-01T08:30:00",
        task_endTime: "2024-01-01T11:30:00",
        chain_guid: "guid1",
      },
      {
        taskname: "Task 2",
        task_startTime: "2024-01-01T10:30:00",
        task_endTime: "2024-01-01T13:30:00",
        chain_guid: "guid2",
      },
    ];

    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chainsData.map((chain) => chain.chainname),
          datasets: [
            {
              label: "Chain Duration",
              data: chainsData.map((chain) => ({
                x: new Date(chain.chain_startTime),
                y: chain.chainname,
                x2: new Date(chain.chain_endTime),
              })),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            x: {
              type: "time",
              time: {
                parser: "yyyy-MM-DDTHH:mm:ss",
                unit: "day", // Use 'day' instead of 'hour'
                displayFormats: {
                  hour: "HH:mm",
                },
                tooltipFormat: "HH:mm",
                stepSize: 1,
                minUnit: "hour",
              },
              position: "top",
              offset: true,
            },
          },
          onClick: (evt, activeElements) => {
            if (
              chart &&
              chart.data &&
              chart.data.labels &&
              activeElements.length > 0
            ) {
              const chainName = chart.data.labels[activeElements[0].index];
              const tasks = tasksData.filter(
                (task) =>
                  task.chain_guid ===
                  chainsData.find((chain) => chain.chainname === chainName)
                    ?.chain_guid
              );

              // Remove existing "Tasks" dataset if it exists
              chart.data.datasets = chart.data.datasets.filter(
                (dataset) => dataset.label !== "Tasks"
              );

              chart.data.datasets.push({
                label: "Tasks",
                data: tasks.map((task) => ({
                  x: new Date(task.task_startTime),
                  y: chainName,
                  x2: new Date(task.task_endTime),
                })),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              });

              chart.update();
            }
          },
        },
      });

      chartRef.current = chart;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ paddingTop: "100px" }}>
      <h2>Gantt Chart</h2>
      <canvas id="myChart" style={{ height: "200px", width: "400px" }}></canvas>
    </div>
  );
};
export default SyncGantt;