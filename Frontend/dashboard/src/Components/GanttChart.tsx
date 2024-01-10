import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { ChartConfiguration } from "chart.js";
import "chartjs-adapter-date-fns";
import { format } from "date-fns-tz";
import ScrollTop from "./ScrollTop";

interface ganttProps {
  data: any[];
  starttime: any;
  endtime: any;
}

const GanttChart: React.FC<ganttProps> = ({ data, starttime, endtime }) => {
  const [newdata, setnewData] = useState<any[]>([]);
  const [newstart, setnewstart] = useState<any>([]);
  const [newend, setnewend] = useState<any>([]);

  useEffect(() => {
    console.log(starttime);
    if (starttime == null) {
      starttime = "2023-11-24T00:00:00";
    }
    if (endtime == null) {
      endtime = "2023-11-24T23:59:59";
    }
    const start = new Date(starttime);
    const end = new Date(endtime);
    const start_time = format(start, "yyyy-MM-dd HH:mm:ss.SSS", {
      timeZone: "Asia/Kolkata",
    });
    const end_time = format(end, "yyyy-MM-dd HH:mm:ss.SSS", {
      timeZone: "Asia/Kolkata",
    });
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
  const [length, setlength] = useState<any>(500);
  useEffect(() => {
    console.log(newdata);
    let check = false;
    const processedData = newdata.map((item) => ({
      x: [item.start_time, item.end_time],
      y: item.chain_name,
      task_Name: item.task_name,
      delay: item.expected_endtime,
      status: item.status,
      performance: item.performance,
    }));

    const templength = newdata
      .map((item) => item.chain_name)
      .filter((value, index, self) => self.indexOf(value) === index);
    setlength(templength.length);
    const backgroundColors = processedData.map((item) => {
      if (item.status === "failed") {
        return "black";
      } else {
        return item.performance < -25 ? "#FF3131" : "#50C878";
      }
    });
    const data = {
      datasets: [
        {
          label: "Within Benchmark",
          data: processedData,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          barThickness: 30,
          maxBarThickness: 30,
        },
      ],
    };
    const xdata = {
      labels: [],
      datasets: [
        {
          label: "Daily TimeFrame",
          data: processedData,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          barThickness: 30,
          maxBarThickness: 30,
        },
      ],
    };
    // config
    const config2: ChartConfiguration<any> = {
      type: "bar",
      data: xdata,
      options: {
        layout: {
          padding: {
            left: 260,
            top: 10,
            right: 10,
          },
        },
        maintainAspectRatio: false,
        indexAxis: "y",
        scales: {
          x: {
            position: "top",
            type: "time",
            time: {
              // unit: "millisecond",
              // minUnit: 'millisecond',
              // stepSize: 3600000,
              displayFormats: {
                second: "HH:mm:ss",
              },
              // tooltipFormat: 'HH:mm:ss'
            },

            min: newstart,
            max: newend,
            afterFit: (ctx: any) => {
              ctx.height = 50;
            },
          },
          y: {
            ticks: {
              display: true,
            },
            grid: {
              drawTicks: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    const config1: ChartConfiguration<"bar" | any> = {
      type: "bar",
      data,
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            top: 10,
            right: 10,
          },
        },

        indexAxis: "y",
        scales: {
          x: {
            position: "top",
            type: "time",
            time: {
              // unit: "millisecond",
              // minUnit: 'millisecond',
              // stepSize: 3600000,
              displayFormats: {
                second: "HH:mm:ss",
              },
              // tooltipFormat: 'HH:mm:ss'
            },
            min: newstart,
            max: newend,
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              title: () => "", // Empty string to hide the title
              label: (context: any) => {
                const dataIndex = context.dataIndex;
                const datasetIndex = context.datasetIndex;
                const dataItem =
                  context.chart.data.datasets[datasetIndex].data[dataIndex];

                const startTime = new Date(dataItem.x[0]).toLocaleTimeString();
                const endTime = new Date(dataItem.x[1]).toLocaleTimeString();
                const expTime = new Date(dataItem.delay).toLocaleTimeString();
                const newLine = [];
                newLine.push(`Chain: ${dataItem.y}`);
                newLine.push(`Task: ${dataItem.task_Name}`);
                newLine.push(`Start Time: ${startTime}`);
                newLine.push(`End Time: ${endTime}`);
                newLine.push(`Expected End Time: ${expTime}`);
                newLine.push(`Performance % : ${dataItem.performance}`);
                newLine.push(`Status : ${dataItem.status}`);
                return newLine;
              }, // Display the y value in the tooltip label
            },
          },
        },
      },
    };
    const myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      config1
    );
    const myChart1 = new Chart(
      document.getElementById("myChart1") as HTMLCanvasElement,
      config2
    );
    console.log(`${length}px`);
    const chartVersion = document.getElementById(
      "chartVersion"
    ) as HTMLSpanElement;
    if (chartVersion) {
      chartVersion.innerText = Chart.version;
    }
    return () => {
      myChart.destroy();
      myChart1.destroy();
    };
  }, [newdata]);

  return (
    <div style={{ paddingLeft: 10, paddingRight: 20 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "30%",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "10px",
            backgroundColor: "red",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        ></div>
        <h5 style={{ marginRight: "10%" }}>Underperformed Tasks</h5>
        <div
          style={{
            width: "40px",
            height: "10px",
            backgroundColor: "green",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        ></div>
        <h5 style={{ marginRight: "10%" }}>Outperformed Tasks</h5>
        <div
          style={{
            width: "40px",
            height: "10px",
            backgroundColor: "gray",
            marginRight: "10px",
            borderRadius: "20px",
          }}
        ></div>
        <h5 style={{ marginRight: "30px" }}>Failed Tasks</h5>
      </div>

      <div style={{}}>
        <div
          style={{
            height: `50px`,
            width: "100%",
            paddingBottom: "1%",
          }}
        >
          <canvas id="myChart1"></canvas>
        </div>
      </div>
      <div
        className="chartCard"
        style={{ height: "400px", overflowY: "scroll", position: "relative" }}
      >
        <div
          className="chartBox"
          style={{
            height: `${Math.max(length * 40, 200) - 50}px`,
            width: "100%",
          }}
        >
          <canvas id="myChart"></canvas>
          <ScrollTop targetClass="chartCard"></ScrollTop>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
