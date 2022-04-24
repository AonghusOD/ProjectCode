import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Grid, Card, Text } from "@nextui-org/react";
import GetWaterData from "./getWaterData";
import GetDataList from "../getData-list";
import { Table } from "@nextui-org/react";

function GetWaterItem(props) {
  const { items } = props;

  return (
    
    <Table
      aria-label="Example table with static content"
      
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>Value</Table.Column>
        <Table.Column>Time</Table.Column>
      </Table.Header>
      
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>PH</Table.Cell>
          <Table.Cell>{(Math.round(props.PH * 100) / 100).toFixed(2)}</Table.Cell>
          <Table.Cell>{props.TIME}</Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>TDS</Table.Cell>
          <Table.Cell>{props.TDS}</Table.Cell>
          <Table.Cell>{props.TIME}</Table.Cell>
        </Table.Row>
      </Table.Body>
      
    </Table>
  );
}

export default GetWaterItem;