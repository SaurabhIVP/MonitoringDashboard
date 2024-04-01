import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GanntC: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "rgba(255, 26, 104, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(0, 0, 0, 0.2)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        indexAxis: "y",
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    } as any;

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, config);

    function clickableScales(chartRef: any, click: any) {
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

      //mouse click
      let rect = canvas.getBoundingClientRect();

      const xcor = click.clientX - rect.left;
      const ycor = click.clientY - rect.top;

     

      for (let i = 0; i < y.ticks.length; i++) {
        if (
          xcor >= left &&
          xcor <= right &&
          ycor >= top + height * i &&
          ycor <= top + height + height * i
        ) {
            ctx.fillStyle = "gray";
            ctx.rect(left, top + height * i, right,  height );
            ctx.fill();
            console.log(chartRef.data.datasets[0].data[i])
        }
      }
    }

    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const clickHandler = (e: MouseEvent) => {
        clickableScales(chartRef.current, e);
      };

      if (canvas) {
        canvas.addEventListener("click", clickHandler);
      }

      return () => {
        if (canvas) {
          canvas.removeEventListener("click", clickHandler);
        }
      };
    }

    return undefined;
  }, []);

  return (
    <>
      <div className="chartMenu" style={{ paddingTop: "100px" }}>
        <p>
          WWW.CHARTJS3.COM (Chart JS <span id="chartVersion"></span>)
        </p>
      </div>
      <div
        className="chartCard"
        style={{ height: "200px", paddingLeft: "100px", paddingRight: "100px" }}
      >
        <div className="chartBox">
          <canvas id="myChart" height={"50px"}></canvas>
        </div>
      </div>
    </>
  );
};

export default GanntC;
