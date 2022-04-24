import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GetDataList from "./getData-list";
import CO2Page from "./CO2List";
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

        for (let i = 0; i < 50; i++) {
          let allData = {
            id: i,
            ...data[i],
          };
          console.log(allData);
          data.forEach((element) => {
            const { PH, TDS, TEMP, LUX, CO2, HVOC, HUM, STAMP } = element;
            const result = dataMapping({ PH, TDS, TEMP, LUX, CO2, HVOC, HUM, STAMP });
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
