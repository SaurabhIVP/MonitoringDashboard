import { useEffect, useState } from "react";
import GetTaskDetailsByChainGuid from "../../api/GetTaskDetailsByChainGuid";
import { ChartConfiguration } from "chart.js";
import { Chart, registerables } from "chart.js";
import "./GanttChart.css";
import dayjs from "dayjs";
import TimeFormatter from "../../utils/HHMMSSConverter";
import React from "react";
import ChildGanttFilter from "../filters/ChildGanttFilter";
import { Card, Chip, ListItem, Typography } from "@mui/material";
import { DateConversioninddMMMMyyyy } from "../../utils/DateConversion";
import { invalid } from "moment";
import {
  NormalFontSize,
  PrimaryColor,
  SecondaryColor,
} from "../../utils/Colors";
import CloseButton from "../generics/CloseButton";
Chart.register(...registerables);
interface GanttProps {
  // chain_id: any | null;
  date: any | null;
  benchstart: any | null;
  benchend: any | null;
  benchCompute: any | null;
  deviation: any | null;
  object: any;
  is_pm: boolean;
}
const ChildGantt: React.FC<GanttProps> = ({
  // chain_id = 3,
  date = "2024-01-24",
  benchCompute = "Average",
  benchstart = "2024-01-17",
  benchend = "2024-01-24",
  deviation = "0",
  object = null,
  is_pm = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [startDate, setStartDate] = React.useState<any | null>(new Date(date));
  let starttime = null as any;
  let endtime = null as any;
  starttime = date + "T" + starttime;
  endtime = date + "T" + endtime;
  if (typeof starttime == "object") {
    starttime = "00:00:00";
  }
  if (typeof endtime == "object") {
    endtime = "24:00:00";
  }
  const minTime = dayjs(startDate).startOf("day");
  const maxTime = dayjs(startDate).endOf("day");
  // const [startTime, setStartTime] = useState<any | null>(`${date}T00:00:00`);
  // const [endTime, setEndTime] = useState<any | null>(`${date}T23:59:59`);
  const [startTime, setStartTime] = React.useState<any | null>(
    `${date}T${TimeFormatter(minTime)}`
  );
  const [endTime, setEndTime] = React.useState<any | null>(
    `${date}T${TimeFormatter(maxTime)}`
  );
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 7);
  const [BenchstartDate, setBenchStartDate] = React.useState<Date | null>(
    pastDate
  );
  const [BenchendDate, setBenchEndDate] = React.useState<Date | null>(
    currentDate
  );
  const handleStartTimeChange = (val: any | null) => {
    setStartTime(new Date(`${date}T${val}`));
    console.log(startTime);
  };
  const handleEndTimeChange = (val: any | null) => {
    setEndTime(new Date(`${date}T${val}`));
  };

  const handleBenchStartDateChange = (newDate: Date | null) => {
    setBenchStartDate(newDate);
  };
  const handleBenchendDateChange = (newDate: Date | null) => {
    setBenchEndDate(newDate);
  };
  const [key, setKey] = useState("1");
  const resetButtonHandler = () => {
    setDeviationPercentage("0");
    setKey(key === "1" ? "2" : "1");
    setStartTime(dayjs(startDate).startOf("day"));
    setEndTime(dayjs(startDate).endOf("day"));
    setBenchStartDate(new Date(2024, 0, 1));
    setBenchEndDate(new Date(2024, 0, 31));
  };
  const handleStartDateChange = (newDate: Date | null) => {
    setStartDate(newDate);
  };
  const isBenchEndDateValid =
    BenchstartDate === null ||
    BenchendDate === null ||
    (BenchstartDate !== null &&
      BenchendDate !== null &&
      BenchendDate >= BenchstartDate);

  const [deviationPercentage, setDeviationPercentage] = useState<string | null>(
    "0"
  );
  const handleDeviationChange = (value: string | null) => {
    setDeviationPercentage(value);
    console.log(deviationPercentage);
  };
  const [filter, setFilter] = useState<boolean>(false);
  const handleFilterChange = (e: boolean) => {
    setFilter(e);
  };
  console.log(object?.[0]?.chain_id);
  const [height, setHeight] = useState<any>(1);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await GetTaskDetailsByChainGuid({
        chain_id: object.chain_id,
        date: date,
        benchStartDate: benchstart,
        benchEndDate: benchend,
        benchmarkCompute: benchCompute,
        deviationPercentage: deviation,
        is_pm: is_pm,
      });
      setData(response as any[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (isNaN(startDate.getTime())) {
      setStartTime(new Date(`${date}T00:00:00`));
    }
    if (isNaN(endDate.getTime())) {
      setEndTime(new Date(`${date}T24:00:00`));
    }
    fetchData();
    console.log(data);
  }, [filter]);
  useEffect(() => {
    const processedData = data.map((item) => ({
      x: [item.start_time, item.end_time],
      y: item.name,
      delay: item.expected_endtime,
      status: item.status,
      performance: item.performance,
    }));
    const uniqueNames = new Set(processedData.map((item) => item.y));
    setHeight(uniqueNames.size);
    const backgroundColors = processedData.map((item) => {
      if (item.status === "failed") {
        return "blue";
      } else if (item.performance >= 0 && item.performance <= 10) {
        return "lightgreen";
      } else if (item.performance > 10) {
        return "green";
      } else if (item.performance < 0 && item.performance >= 10) {
        return "coral";
      } else {
        return "red";
      }
    });
    const chartData = {
      datasets: [
        {
          data: processedData,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          barThickness: 30,
          maxBarThickness: 30,
          barBorderRadius: 3,
        },
      ],
    };
    const config: ChartConfiguration<"bar" | any> = {
      type: "bar",

      data: chartData,
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
            min: startTime,
            max: endTime,
            ticks: {
              color: SecondaryColor,
              font: {
                family: "roboto",
                weight: "500",
                size: NormalFontSize,
              },
            },
          },
          y: {
            ticks: {
              color: SecondaryColor,
              font: {
                family: "roboto",
                weight: "500",
                size: NormalFontSize,
              },
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
                newLine.push(`Task: ${dataItem.y}`);
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
    const myChart3 = new Chart(
      document.getElementById("myChart3") as HTMLCanvasElement,
      config
    );
    const chartVersion = document.getElementById(
      "chartVersion"
    ) as HTMLSpanElement;
    if (chartVersion) {
      chartVersion.innerText = Chart.version;
    }
    return () => {
      myChart3.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "auto", height: "400px" }}>
      <div style={{ position: "absolute", top: 10, right: 20 }}>
        <CloseButton onClick={() => {}}></CloseButton>
      </div>
      <Card sx={{ padding: "1px", backgroundColor: PrimaryColor }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              fontSize: NormalFontSize,
              fontVariant: "jis78",
              fontFamily: "roboto",
              marginTop: "0px",
              color: "#404040",
            }}
          >
            <ChildGanttFilter
              onFilter={handleFilterChange}
              onStartDateSelected={handleStartDateChange}
              onStartTimeSelected={handleStartTimeChange}
              onEndTimeSelected={handleEndTimeChange}
              onBenchStartDateSelected={handleBenchStartDateChange}
              onBenchEndDateSelected={handleBenchendDateChange}
              onDeviationChange={handleDeviationChange}
            ></ChildGanttFilter>
            <div style={{ marginTop: "4px" }}>
              <span>
                <strong>Benchmark Duration : &nbsp;</strong>
              </span>
              <span>
                {" "}
                {DateConversioninddMMMMyyyy(BenchstartDate)} to{" "}
                {DateConversioninddMMMMyyyy(BenchendDate)}
              </span>
              <span>&nbsp;{" | "}&nbsp;</span>
              <span>
                <strong>Deviation % :&nbsp;</strong>
              </span>
              <span>{deviationPercentage}</span>
            </div>
          </div>
        </div>
      </Card>
      <div style={{ border: "ridge", marginTop: "5px" }}>
        <div style={{ display: "flex", width: "800px", marginLeft: "30px" }}>
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
        <div style={{ height: `${Math.max(height * 50, 200)}px` }}>
          <canvas id="myChart3"></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChildGantt;
