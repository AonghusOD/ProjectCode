import CO2 from "./CO2";
import AirQuality from "./AirQuality";
import styles from "./Air.module.css";
import Card from "../layout/UI/Card";

function Air(props) {
  return (
      <div className={styles.container}>
          <div><AirQuality /></div>
          <div><CO2 /></div>
      </div>
  );
}

export default Air;
