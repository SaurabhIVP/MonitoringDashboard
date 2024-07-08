import React, { useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
import { ChartConfiguration } from "chart.js";
import "./GanttChart.css";
import {
  NormalFontSize,
  PageTitleFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import { format } from "date-fns-tz";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { getElementsAtEvent } from "react-chartjs-2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ChildGantt from "./ChildGantt";

Chart.register(...registerables);

interface ganttProps {
  data: any[];
  starttime: any;
  endtime: any;
  date: any;
  benchstart: any;
  benchend: any;
  is_pm: boolean;
}

const GanttChart: React.FC<ganttProps> = ({
  data,
  starttime,
  endtime,
  date,
  benchstart,
  benchend,
  is_pm,
}) => {
  let myChart: any | null = null;

  let myChart1: any | null = null;
  const [newdata, setnewData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newstart, setnewstart] = useState<any>([]);
  const [filter, setFilter] = useState<boolean>(false);
  const [newend, setnewend] = useState<any>([]);
  const TitleDate = DateConversioninddMMMMyyyy(date);
  const chartRef = useRef(null);
  let cg = null as any;
  let name = "";
  let chainId = null as any;
  const [width, setWidth] = useState("100px");
  let startTime = null as any;
  const [isClickedDataUpdating, setIsClickedDataUpdating] = useState(false);
  let endTime = null as any;
  const [clickedData, setClickedData] = useState<any>();
  date = format(date, "yyyy-MM-dd");
  let height = 100;
  if (typeof starttime == "object") {
    starttime = "00:00:00";
  }
  if (typeof endtime == "object") {
    endtime = "24:00:00";
  }
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
    setIsClickedDataUpdating(true);
    const start = new Date(starttime);
    const end = new Date(endtime);
    setLoading(false);
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
  const [alert, setAlert] = useState<boolean | null>(false);
  const [length, setlength] = useState<any>(500);
  // const [myChart, setMyChart] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(newdata);
    const processedData = newdata.map((item) => ({
      x: [item.start_time, item.end_time],
      y: item.chain_name,
      task_Name: item.task_name,
      delay: item.expected_endtime,
      status: item.status,
      performance: item.performance,
      chain_guid: item.chain_guid,
      chain_id: item.id,
    }));

    newdata.map((item) => {
      if (item.avg_total_time == null) {
        setAlert(true);
      }
    });
    const templength = newdata
      .map((item) => item.chain_name)
      .filter((value, index, self) => self.indexOf(value) === index);
    setlength(templength.length);
    const backgroundColors = processedData.map((item) => {
      if (item.status === "failed") {
        return "blue";
      } else if (item.performance >= 0 && item.performance <= 10) {
        return "lightgreen";
      } else if (item.performance > 10) {
        return "green";
      } else if (item.performance < 0 && item.performance >= -10) {
        return "coral";
      } else {
        return "red";
      }
    });
    const data = {
      datasets: [
        {
          label: "Within Benchmark",
          data: processedData,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          // barThickness: 30,
          // maxBarThickness: 30,
          barBorderRadius: 3,
          categoryPercentage: 0.75,
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
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 260,
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
            title: {
              display: true,
              text: "Time Frame",
              color: SecondaryColor,
              font: {
                family: "roboto",
                weight: "100",
                size: "14px",
                style: "italic",
              },
            },
            ticks: {
              color: SecondaryColor,
              font: {
                family: "roboto",
                weight: "500",
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
            width: 20,
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
          y: {
            ticks: {
              color: SecondaryColor,
              font: {
                family: "roboto",
                weight: "500",
                size: NormalFontSize,
              },
              cursor: "pointer",
            },
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
                newLine.push(`Start Time: ${startTime}`);
                newLine.push(`End Time: ${endTime}`);
                newLine.push(`Expected End Time: ${expTime}`);
                newLine.push(`Performance % : ${dataItem.performance}`);
                return newLine;
              },
            },
          },
        },
      },
    };

    myChart = new Chart(
      document.getElementById("myChart") as HTMLCanvasElement,
      config1
    );
    myChart1 = new Chart(
      document.getElementById("myChart1") as HTMLCanvasElement,
      config2
    );

    console.log(myChart);
    const chartVersion = document.getElementById(
      "chartVersion"
    ) as HTMLSpanElement;
    if (chartVersion) {
      chartVersion.innerText = Chart.version;
    }
    function clickableScales(chartRef: any, click: any) {
      if (!chartRef.canvas) {
        return;
      }
      //object destructuring
      const {
        ctx,
        canvas,
        scales: { x, y },
      } = chartRef;
      const top = y.top;
      const bottom = y.bottom;
      const left = y.left;
      const right = y.right;
      const height = y.height / y.ticks.length;
      console.log("width is" + y.width);
      //mouse click
      let rect = canvas.getBoundingClientRect();
      let cursorInRegion = false;

      const xcor = click.clientX - rect.left;
      const ycor = click.clientY - rect.top;

      for (let i = 0; i < y.ticks.length; i++) {
        if (
          xcor >= left &&
          xcor <= right &&
          ycor >= top + height * i &&
          ycor <= top + height + height * i
        ) {
          cursorInRegion = true;
          // ctx.fillStyle = "gray";
          // ctx.rect(left, top + height * i, right, height);
          // ctx.fill();
          canvas.style.cursor = "pointer";
          const x = i;
          const ids = Array.from(
            new Set(chartRef.data.datasets[0].data.map((i: any) => i.chain_id))
          );
          console.log(chartRef.data.datasets[0].data[i]);
          for (let i = 0; i < chartRef.data.datasets[0].data.length; i++) {
            if (chartRef.data.datasets[0].data[i].chain_id === ids[x]) {
              name = chartRef.data.datasets[0].data[i].y;
              const val = chartRef.data.datasets[0];
              setClickedData(val.data[i]);
              console.log(clickedData);

              break; // Exit the loop once the matching element is found
            }
          }
          console.log(name);
          setFilter(true);
        }
      }
      // if (cursorInRegion) {
      //   canvas.style.cursor = "pointer"; // Change cursor style to pointer if mouse is in the region
      // } else {
      //   canvas.style.cursor = "default"; // Reset cursor style to default if mouse is not in the region
      // }
    }
    function clickableScales3(chartRef: any, click: any) {
      if (!chartRef.canvas) {
        return;
      }
      const {
        ctx,
        canvas,
        scales: { x, y },
      } = chartRef;
      setWidth(`${y.width}px`);
    }
    function clickableScales2(chartRef: any, click: any) {
      if (!chartRef.canvas) {
        return;
      }
      //object destructuring
      const {
        ctx,
        canvas,
        scales: { x, y },
      } = chartRef;
      const top = y.top;
      const bottom = y.bottom;
      const left = y.left;
      const right = y.right;
      const height = y.height / y.ticks.length;
      console.log("width is" + y.width);
      //mouse click
      let rect = canvas.getBoundingClientRect();
      let cursorInRegion = false;

      const xcor = click.clientX - rect.left;
      const ycor = click.clientY - rect.top;

      for (let i = 0; i < y.ticks.length; i++) {
        if (
          xcor >= left &&
          xcor <= right &&
          ycor >= top + height * i &&
          ycor <= top + height + height * i
        ) {
          cursorInRegion = true;
          // ctx.fillStyle = "gray";
          // ctx.rect(left, top + height * i, right, height);
          // ctx.fill();
          canvas.style.cursor = "pointer";
          // const x = i;
          // const ids = Array.from(
          //   new Set(chartRef.data.datasets[0].data.map((i: any) => i.chain_id))
          // );
          // console.log(chartRef.data.datasets[0].data[i]);
          // for (let i = 0; i < chartRef.data.datasets[0].data.length; i++) {
          //   if (chartRef.data.datasets[0].data[i].chain_id === ids[x]) {
          //     name = chartRef.data.datasets[0].data[i].y;
          //     const val = chartRef.data.datasets[0];
          //     setClickedData(val.data[i]);
          //     console.log(clickedData);

          //     break; // Exit the loop once the matching element is found
          //   }
          // }
          // console.log(name);
          // setFilter(true);
        }
      }
      if (cursorInRegion) {
        canvas.style.cursor = "pointer"; // Change cursor style to pointer if mouse is in the region
      } else {
        canvas.style.cursor = "default"; // Reset cursor style to default if mouse is not in the region
      }
    }
    if (myChart) {
      const clickHandler = (e: MouseEvent) => {
        clickableScales(myChart, e);
      };
      const clickHandler2 = (e: MouseEvent) => {
        clickableScales2(myChart, e);
      };
      const clickHandler3 = (e: MouseEvent) => {
        clickableScales2(myChart, e);
      };
      if (myChart.canvas) {
        myChart.canvas.addEventListener("click", clickHandler);
        myChart.canvas.addEventListener("mousemove", clickHandler2);
        myChart.canvas.addEventListener("DOMContentLoaded", clickHandler3);
      }
    }

    return () => {
      myChart.destroy();
      myChart1.destroy();
    };
    setIsClickedDataUpdating(false);
  }, [newdata]);
  useEffect(() => {
    if (clickedData && clickedData.y) {
      setOpen(true);
    }
  }, [clickedData]);
  // State to track the selected chain name
  const [selectedChain, setSelectedChain] = useState<string | null>(null);

  // Click event handler for the chain names
  const handleChainClick = (chainName: string) => {
    setSelectedChain(chainName);
  };

  // Close button click handler to close the popup
  const handleClosePopup = () => {
    setSelectedChain(null);
  };

  return (
    <div
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        // paddingLeft: 10,
        // paddingRight: 10,
        border: "ridge",
      }}
    >
      <div style={{ display: "flex", width: "1600px" }}>
        <div className="legend-box">
          <div className="legend" style={{ backgroundColor: "red" }}></div>
          <h5 className="legend-title">Performance less than -10%</h5>
          <div className="legend" style={{ backgroundColor: "coral" }}></div>
          <h5 className="legend-title">Performance between -10% to 0%</h5>
          <div
            className="legend"
            style={{
              backgroundColor: "lightgreen",
            }}
          ></div>
          <h5 className="legend-title">Performance between 0% to 10%</h5>
          <div
            className="legend"
            style={{
              backgroundColor: "green",
            }}
          ></div>
          <h5 className="legend-title">Performance more than 10% </h5>
        </div>
      </div>

      <div>
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
                marginLeft: "10px",
              }}
            >
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Popup with empty chart */}
      {selectedChain && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <canvas id="popupChart"></canvas>
          </div>
        </div>
      )}
      {filter ? (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
          sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "75%" } }}
        >
          <DialogTitle
            sx={{
              color: SecondaryColor,
              fontSize: PageTitleFontSize,
              fontFamily: "roboto",
              // borderBottom: "1px solid #ccc",
              paddingBottom: "0px",
              marginBottom: "3px",
              // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 10, // Ensure title is above content
            }}
          >
            {clickedData.y}
          </DialogTitle>
          <DialogContent sx={{ width: "auto", maxHeight: "70%" }}>
            <div>
              <ChildGantt
                object={clickedData}
                date={date}
                benchstart={benchstart}
                benchend={benchend}
                benchCompute={"Average"}
                deviation={"0"}
                is_pm={is_pm}
              ></ChildGantt>
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions> */}
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GanttChart;
