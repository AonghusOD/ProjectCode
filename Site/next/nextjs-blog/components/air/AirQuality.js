import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GetAllData from "../GetAllData";
import GetDataItem from "../getData-item";
import GetDataList from "../getData-list";

function AirQuality (props) {
  const { PH, Hum } = props;
 
  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
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
        data:PH,
      },
    ],
  };
  

  return (
    <section>
      <div>
        <h2>AirQuality Data</h2>
        <h1>{PH}</h1>
        <div
          style={{
            height: "40vh",
            position: "relative",
            marginBottom: "1%",
            padding: "1%",
          }}
        >
          <Line data={data1} options={{ maintainAspectRatio: false }} />
          
        </div>
      </div>
    </section>
  );
}

export default AirQuality;
