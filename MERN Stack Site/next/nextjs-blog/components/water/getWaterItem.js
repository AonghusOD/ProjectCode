import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Grid, Card, Text } from "@nextui-org/react";
import GetWaterData from "./getWaterData";
import GetDataList from "../getData-list";
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
    { id: "PH", name: props.PH, price: props.TIME },
    { id: "TDS", name: props.TDS, price: props.TIME }
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