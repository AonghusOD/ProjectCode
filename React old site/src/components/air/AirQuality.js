import styles from "./AirQuality.module.css";
import { Line } from "react-chartjs-2";
import Card from "../layout/UI/Card";
import Chart from 'chart.js/auto'

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Air Quality",
      data: [33, 53, 85, 41, 44, 65,55],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ],
  /*options: {
    maintainAspectRatio: false,
  }*/
};

function AirQuality(props) {
  return (
    <div className={styles.container}>
    <Line data={data} />
   </div>
  );
}

export default AirQuality;
