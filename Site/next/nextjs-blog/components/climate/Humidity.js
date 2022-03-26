import { React, useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { useHistory } from "react-router-dom";

function Humidity() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/getAir')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.airReading}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
export default Humidity;