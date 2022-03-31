import { React, useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Humidity() {
  const [data, setData] = useState(null);
  //const [isLoading, setLoading] = useState(false);
  let score = [];
  useEffect(() => {
    //setLoading(true);
    async function fetchData() {
      const res = await fetch("api/getAir")
        .then((res) => res.json())
        .then((data) => {
          const air = data.map(
            function(index){
              return index.airReading;
            })
            setData(data)
          console.log(air);
        });
        
        //setLoading(false)
    }
  }, []);

  //if (isLoading) return <p>Loading...</p>;
  //if (!data) return <p>No profile data</p>;
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
        data: [67, 44, 80, 44, 56, 55, 40],
      },
    ],
  };

  return (
    <section>
      <div>
        <h2>AirQuality Data</h2>
        fetchData()
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

export default Humidity;
