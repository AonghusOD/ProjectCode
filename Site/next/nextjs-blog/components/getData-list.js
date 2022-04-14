import GetDataItem from './getData-item';
import classes from './getData-list.module.css';

function GetDataList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((air) => (
        <GetDataItem
          key={air._id}
          PH={air.PH}
          TDS={air.TDS}
          LUX={air.LUX}
          Temp={air.Temp}
          Hum={air.Hum}
        />
      ))}
    </ul>
  );
}

export default GetDataList;