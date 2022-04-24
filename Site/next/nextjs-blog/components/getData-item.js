import React from "react";

function GetDataItem(props) {
  return <li>{props.PH}{props.TDS}{props.TEMP}{props.LUX}{props.CO2}{props.HVOC}{props.HUM}{props.STAMP}</li>;
}

export default GetDataItem;
