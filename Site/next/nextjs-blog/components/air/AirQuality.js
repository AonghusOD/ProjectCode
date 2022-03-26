import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

function AirQuality() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/getAir')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  //////////////////////////////////////////////////
  // const [dataObj, setDataObj] = useState();

  // useEffect(() => {
  //   fetch("api/getAir")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDataObj((oldDataObj) => {
  //         let prevDataObj = JSON.parse(JSON.stringify(oldDataObj));
  //         prevDataObj.noMessages = data.noMessages;
  //         return prevDataObj;
  //       });
  //     });
  // }, []);
  ///////////////////////////////////////////////////////

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
        data: [53, data.airReading, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <section>
      <div>
        <h2>AirQuality Data</h2>
        <h1>{data.airReading}</h1>
        {/* <ul>
          {air.map((meetup) => {
            <li>{meetup.airReading}</li>;
          })}
        </ul> */}
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
