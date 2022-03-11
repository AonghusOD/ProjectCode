import React from "react";
import { Line } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

function AirQuality() {
  const history = useHistory();
  //fetch("api/getAir")
  let air;

 /*WORKING
 fetch("api/getAir")
    .then((res) => {
      this.setState({
        air: res.data,
      });
      console.log(air);
    })
    .catch((error) => {
      console.log(error);
    });*/

    fetch("api/getAir")
    .then((res) => {
      this.setState({
        air: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(air);

  const data = {
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
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <div>
      <h2>AirQuality Data</h2>
      <div
        style={{
          height: "40vh",
          position: "relative",
          marginBottom: "1%",
          padding: "1%",
        }}
      >
        <Line data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default AirQuality;
