import React, { useEffect, useState } from "react";
import GetDataItem from "./getData-item";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import classes from "./getData-item.module.css";
import { Grid, Card, Text } from "@nextui-org/react";

export default function GetDataList(props) {
  const { items } = props;
  const [PHData, setPHData] = useState([]);
  const [TDSData, setTDSData] = useState([]);
  const [TEMPData, setTEMPData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [HUMData, setHUMData] = useState([]);
  const [LUXData, setLUXData] = useState([]);
  useEffect(() => {
    const arr = [];
    items &&
      items.forEach((element) => {
        const { PH } = element;
        arr.push(PH);
        console.log(arr);
      });
    setPHData(arr);
  }, [items]);
  useEffect(() => {
    const arr1 = [];
    items &&
      items.forEach((element) => {
        const { TDS } = element;
        arr1.push(TDS);
      });
    setTDSData(arr1);
  }, [items]);

  useEffect(() => {
    const arr2 = [];
    items &&
      items.forEach((element) => {
        const { TEMP } = element;
        arr2.push(TEMP);
      });
    setTEMPData(arr2);
  }, [items]);

  useEffect(() => {
    const arr2 = [];
    items &&
      items.forEach((element) => {
        const { CO2 } = element;
        arr2.push(CO2);
      });
    setCO2Data(arr2);
  }, [items]);

  useEffect(() => {
    const arr2 = [];
    items &&
      items.forEach((element) => {
        const { HUM } = element;
        arr2.push(HUM);
      });
    setHUMData(arr2);
  }, [items]);

  useEffect(() => {
    const arr2 = [];
    items &&
      items.forEach((element) => {
        const { LUX } = element;
        arr2.push(LUX);
      });
    setLUXData(arr2);
  }, [items]);

  const MockItem = ({ text }) => {
    return (
      <Card color="primary" css={{ h: "$24" }}>
        <Text h6 size={30} color="white" css={{ mt: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={4}>
        <h2>PH&nbsp;&nbsp;&nbsp;&nbsp;</h2>
        <MockItem text={PHData[0]} />
      </Grid>
      <Grid xs={4}>
        <h2>TDS&nbsp;&nbsp;</h2>
        <MockItem text={TDSData[6]} />
      </Grid>
      <Grid xs={4}>
        <h2>TEMP&nbsp;&nbsp;</h2>
        <MockItem text={TEMPData[2]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[4]} />
      </Grid>
      <Grid xs={4}>
        <h2>LUX&nbsp;&nbsp;</h2>
        <MockItem text={LUXData[3]} />
      </Grid>
      <Grid xs={4}>
        <h2>HUM&nbsp;&nbsp;</h2>
        <MockItem text={HUMData[2]} />
      </Grid>
    </Grid.Container>
  );
}
