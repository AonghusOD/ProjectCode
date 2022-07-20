import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GetAirList from "./getAirList";

const GetAirData  = (props) => {
  const { items } = props;
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch('api/getAir')
      .then((res) => res.json())
      .then((data) => {
        const air = [];

        for (const key in data) {
          const allData = {
            id: key,
            ...data[key]
            
          };
          console.log(allData)
          air.push(allData);
        }
        //console.log(data)
        setData(air)
        //console.log(air)
        
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  
  return (
    <section>
      <div>
      
         <GetAirList items ={data} />
        
      </div>
    </section>
  );
}

export default GetAirData;