import React, { useEffect, useState } from "react";
import GetDataItem from "./getData-item";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import classes from "./getData-item.module.css";
import { Grid, Card, Text } from "@nextui-org/react";
import { useMediaQuery } from "./useMediaQuery.js";

function GetDataList(props) {
  const isMd = useMediaQuery(960);

  const MockItem = ({ text }) => {
    return (
      <Card color="secondary" css={{ h: "$20" }}>
        <Text h6 size={30} color="white" css={{ m: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };
  const MockItem2 = ({ text }) => {
    return (
      <Card color="error" css={{ h: "$20" }}>
        <Text h6 size={15} color="white" align="right" css={{ m: 0 }}>
          {text}
        </Text>
      </Card>
    );
  };
  const { items } = props;
  const [PHData, setPHData] = useState([]);
  const [TEMPData, setTEMPData] = useState([]);
  const [HUMData, setHUMData] = useState([]);
  const [LUXData, setLUXData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [TDSData, setTDSData] = useState([]);
  const [TIMEData, setTIMEData] = useState([]);
  useEffect(() => {
    const arrPH = [];
    const arrTDS = [];
    const arrTemp = [];
    const arrHum = [];
    const arrLux = [];
    const arrCO2 = [];
    const arrTime = [];
    items &&
      items.forEach((element) => {
        const { PH, LUX, TEMP, CO2, TDS, HUM, STAMP } = element;
        arrPH.push(PH);
        arrTDS.push(TDS);
        arrTemp.push(TEMP);
        arrHum.push(HUM);
        arrLux.push(LUX);
        arrCO2.push(CO2);
        arrTime.push(STAMP);
      });
    setPHData(arrPH);
    setTEMPData(arrTemp);
    setHUMData(arrHum);
    setLUXData(arrLux);
    setTDSData(arrTDS);
    setCO2Data(arrCO2);
    setTIMEData(arrTime);
  }, [items]);
  const getMiddle = s => s.substr(s.length - 1 >>> 1, (~s.length & 1) + 1);

  const ChartData = {
    labels: [TIMEData[0],TIMEData[1],TIMEData[2],TIMEData[3],TIMEData[4],TIMEData[5],TIMEData[6]],
    datasets: [
      {
        label: "PH data set",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          PHData[0],
          PHData[1],
          PHData[2],
          PHData[3],
          PHData[4],
          PHData[5],
          PHData[6],
        ],
      },
    ],
  };
  const TempData = {
    labels: [TIMEData[0],TIMEData[1],TIMEData[2],TIMEData[3],TIMEData[4],TIMEData[5],TIMEData[6]],
    datasets: [
      {
        label: "Temperature Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          TEMPData[0],
          TEMPData[1],
          TEMPData[2],
          TEMPData[3],
          TEMPData[4],
          TEMPData[5],
          TEMPData[6],
        ],
      },
    ],
  };

  const HumData = {
    labels: [TIMEData[0],TIMEData[1],TIMEData[2],TIMEData[3],TIMEData[4],TIMEData[5],TIMEData[6]],
    datasets: [
      {
        label: "Humidity Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          HUMData[0],
          HUMData[1],
          HUMData[2],
          HUMData[3],
          HUMData[4],
          HUMData[5],
          HUMData[6],
        ],
      },
    ],
  };
  const Co2Data = {
    labels: [TIMEData[0],TIMEData[1],TIMEData[2],TIMEData[3],TIMEData[4],TIMEData[5],TIMEData[6]],
    datasets: [
      {
        label: "CO2 Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          CO2Data[0],
          CO2Data[1],
          CO2Data[2],
          CO2Data[3],
          CO2Data[4],
          CO2Data[5],
          CO2Data[6],
        ],
      },
    ],
  };

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs>
          <Line
            data={ChartData}
            options={{
              aspectRatio: 2,
              scales: {
                y: {
                  min: 0,
                  max: 40,
                  ticks: {
                    stepSize: 5,
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid xs>
          <Line
            data={HumData}
            options={{
              maintainAspectRatio: true,
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid xs>
          <Line
            data={Co2Data}
            options={{
              maintainAspectRatio: true,
              scales: {
                y: {
                  min: 300,
                  max: 1100,
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2} justify="left">
        <Grid xs={6}>
          <Line
            data={TempData}
            options={{
              maintainAspectRatio: true,
              scales: {
                y: {
                  min: 0,
                  max: 60,
                  ticks: {
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Grid.Container gap={2} justify="center">
            <Grid xs={3.5}>
              <h2>HUM&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={HUMData[0]} />
            </Grid>
            <Grid xs={3}>
              <h2>PH&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={(Math.round(PHData[0] * 100) / 100).toFixed(2)} />
            </Grid>
            
            <Grid xs={3.5}>
              <h2>TDS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={TDSData[0]} />
            </Grid>
            <Grid xs={3.5}>
              <h2>&nbsp;CO2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={CO2Data[0]} />
            </Grid>
            <Grid xs={3}>
              <h2>LUX&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={LUXData[0]} />
            </Grid>
            <Grid xs={3.5}>
              <h2>TEMP&nbsp;&nbsp;&nbsp;&nbsp;</h2>
              <MockItem text={TEMPData[0]} />
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </>
  );
}

export default GetDataList;
