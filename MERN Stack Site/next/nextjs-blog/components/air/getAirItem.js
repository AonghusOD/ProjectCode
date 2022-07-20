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

function GetWaterItem(props) {
  const { items } = props;
  const products = [
    { id: "CO2", name: props.CO2, price: props.TIME },
    { id: "TVOC", name: props.HVOC, price: props.TIME }
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
export default GetWaterItem;