import GetClimateItem from './getClimateItem';

function GetClimateList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((air) => (
        <GetClimateItem
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

export default GetClimateList;