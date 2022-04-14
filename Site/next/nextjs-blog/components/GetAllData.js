import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GetDataList from "./getData-list";

const GetAllData = () => {
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
        <div>
          <h1>hello</h1>
          {data.PH}
        <GetDataList items ={data} />
        </div>
      </div>
    </section>
  );
}

export default GetAllData;