import CO2 from "./CO2";
import AirQuality from "./AirQuality";
import styles from "./Air.module.css";
import Card from "../layout/UI/Card";

function Air(props) {
  return (
      <div className={styles.container}>
        <Card>
          <div><AirQuality /></div>
        </Card>
        <Card>
          <div><CO2 /></div>
        </Card>
      </div>
  );
}

export default Air;
