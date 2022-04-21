import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GetDataList from "./getData-list";
import { dataMapping } from "./UtilityFunction";
import ClimatePage from "./ClimatePage";

const GetAllData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("api/getAir")
      .then((res) => res.json())
      .then((data) => {
        let air = [];

        for (let i = 0; i < 40; i++) {
          let allData = {
            id: i,
            ...data[i],
          };
          console.log(allData);
          data.forEach((element) => {
            const { PH, TDS, TEMP, LUX, CO2, HVOC, HUM } = element;
            const result = dataMapping({ PH, TDS, TEMP, LUX, CO2, HVOC, HUM });
            air.push(result);
          });
        }
        //console.log(data)
        setData(air);
        //console.log(air)

        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <GetDataList items={data} />
    </div>
  );
};

export default GetAllData;
