import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { ChartConfiguration } from "chart.js";
import "chartjs-adapter-date-fns";
import { format } from "date-fns-tz";
import ScrollTop from "../generics/ScrollTop";
import "./GanttChart.css";
import { FilterColor, PrimaryColor, SecondaryColor } from "../../utils/Colors";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";

interface ganttProps {
  data: any[];
  starttime: any;
  endtime: any;
  date: any;
}

const GanttChart: React.FC<ganttProps> = ({
  data,
  starttime,
  endtime,
  date,
}) => {
  const [newdata, setnewData] = useState<any[]>([]);
  const [newstart, setnewstart] = useState<any>([]);
  const [newend, setnewend] = useState<any>([]);
  const TitleDate = DateConversioninddMMMMyyyy(date);
  date = format(date, "yyyy-MM-dd");
  starttime = date + "T" + starttime;
  endtime = date + "T" + endtime;
  useEffect(() => {
    if (starttime == null) {
      console.log("sssssssssssssssssssssssssssssssssssss");
      starttime = "2023-11-24T00:00:57";
    }
    if (endtime == null) {
      endtime = "2023-11-24T23:59:59";
    }

    const start = new Date(starttime);
    const end = new Date(endtime);
    setnewstart(start);
    setnewend(end);
    console.log(newstart + newend);
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
        return "blue";
      } else {
        return item.performance < -25 ? "#E31837" : "#50c878";
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
          barBorderRadius: 3,
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
              displayFormats: {
                second: "HH:mm:ss",
              },
            },

            min: newstart,
            max: newend,
            afterFit: (ctx: any) => {
              ctx.height = 50;
            },
          },
          y: {
            ticks: {
              display: false,
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
              displayFormats: {
                second: "HH:mm:ss",
              },
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
              title: () => "",
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
              },
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
    <div
      style={{
        
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      
      
      <div style={{display:'flex',width:"1600px"}}>
      <h3
        style={{
          color: PrimaryColor,
          fontFamily: "sans-serif",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "left",
          paddingTop:'0px',
          paddingLeft:'80px',
          marginBottom:'10px'
        }}
      >
        {TitleDate}
      </h3>
      <div className="legend-box" >
      
        <div className="legend" style={{ backgroundColor: "#E31837" }}></div>
        <h5 className="legend-title">Crossed Benchmark</h5>
        <div
          className="legend"
          style={{
            backgroundColor: "#50c878",
          }}
        ></div>
        <h5 className="legend-title">Within Benchmark</h5>
        <div
          className="legend"
          style={{
            backgroundColor: "gray",
          }}
        ></div>
        <h5 className="legend-title">Failed </h5>
      </div>
      </div>
      <div className="chart-box">
        <div className="fixed-axis">
          <canvas id="myChart1"></canvas>
        </div>

        <div className="chartCard">
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
    </div>
  );
};

export default GanttChart;
