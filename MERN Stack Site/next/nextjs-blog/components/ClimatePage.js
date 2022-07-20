import React, { useEffect, useState } from "react";
import GetDataItem from "./getData-item";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import classes from "./getData-item.module.css";
import { data } from "./GetAllData"

function ClimatePage(props) {
  const { items } = props;
  const [PHData, setPHData] = useState([]);

  useEffect(() => {
    const arr = [];
    items &&
      items.forEach((element) => {
        const { PH } = element;
        arr.push(PH);
      });
    setPHData(arr);
  }, [items]);

  let PH2 = [];
  PH2.push(...PHData);
  let ChartData = {
    labels: [
      "12pm",
      "2pm",
      "4pm",
      "6pm",
      "8m",
      "10pm",
      "12am",
      "2am",
      "4am",
      "6am",
      "8am",
      "10am",
    ],

    datasets: [
      {
        label: "Temperature readings",
        fill: false,
        scales: {
          y: {
            min: 50,
            max: 1,
          },
        },
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [PHData[0],PHData[5],PHData[10],PHData[15],PHData[20]]
      },
    ],
  };
  return (
    <div>
    <h2>{items}</h2>
    <h2>{PHData}</h2>
    <h2>{PH2}</h2>
    <li className={classes.item}>
      <Line
        data={ChartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 0,
              max: 40,
              ticks: {
                stepSize: 5,
              },
            },
          },
        }}
      />
    </li>
    </div>
  );
}
export default ClimatePage;

