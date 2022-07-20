import GetAirItem from './getAirItem';

function GetAirList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((air) => (
        <GetAirItem
          key={air._id}
          PH={air.PH}
          TDS={air.TDS}
          LUX={air.LUX}
          TEMP={air.TEMP}
          HUM={air.HUM}
          CO2={air.CO2}
          HVOC={air.HVOC}
          TIME={air.TIME}
        />
      ))}
    </ul>
  );
}

export default GetAirList;