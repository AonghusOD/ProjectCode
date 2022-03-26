import CO2 from "./CO2";
import AirQuality from "./AirQuality";
import Card from '@nextui-org/react';

function AirPage(props) {
  return (
      <div>
       <h1>Air Reading Graphs</h1>
        <div><AirQuality /></div>
        <div><CO2 /></div>
      </div>
  );
}

export default AirPage;
