import GetWaterItem from './getWaterItem';

function GetWaterList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((air) => (
        <GetWaterItem
          key={air._id}
          PH={air.PH}
          TDS={air.TDS}
          LUX={air.LUX}
          TEMP={air.TEMP}
          HUM={air.HUM}
          TIME={air.TIME}
        />
      ))}
    </ul>
  );
}

export default GetWaterList;