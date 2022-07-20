import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";


const columns = [
  {
    dataField: "id",
    text: "Sensor ID",
    sort: true
  },
  {
    dataField: "name",
    text: "Reading",
    sort: true
  },
  {
    dataField: "price",
    text: "Date & Time"
  }
];

function GetClimateItem(props) {
  const { items } = props;
  const products = [
    { id: "Temperature", name: props.TEMP, price: props.TIME },
    { id: "Humidity", name: props.HUM, price: props.TIME }
  ];
  return (
    <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={products}
        columns={columns}
      />
    </div>
  );
}
export default GetClimateItem;