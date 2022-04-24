import GetWaterData from '../components/water/getWaterData';
import Head from 'next/head'

export default function Water() {
  return (
    <>
      <Head>
        <title>Water Readings</title>
      </Head>
      <GetWaterData />
    </>
  )
}
