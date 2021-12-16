import CO2 from "./CO2";
import AirQuality from "./AirQuality";
import classes from "./Air.module.css";
import Card from "../layout/UI/Card";

function Air(props) {
  return (
      <div className='column'>
        <Card>
          <AirQuality />
          <CO2 />
        </Card>
      </div>
  );
}

export default Air;
