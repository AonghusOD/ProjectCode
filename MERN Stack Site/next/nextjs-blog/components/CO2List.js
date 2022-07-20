import React, { useEffect, useState } from "react";
import GetDataItem from "./getData-item";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import classes from "./getData-item.module.css";
import { Grid, Card, Text } from "@nextui-org/react";

export default function CO2List(props) {
  const { items } = props;

  const [CO2Data, setCO2Data] = useState([]);

  useEffect(() => {
    const arr2 = [];
    items &&
      items.forEach((element) => {
        const { CO2 } = element;
        arr2.push(CO2);
      });
    setCO2Data(arr2);
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
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[4]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[0]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[1]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[2]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[3]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[6]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data[5]} />
      </Grid>
      <Grid xs={4}>
        <h2>CO2&nbsp;</h2>
        <MockItem text={CO2Data} />
      </Grid>
    </Grid.Container>
  );
}
