import GetClimateData from '../components/climate/getClimateData'
import Head from 'next/head'

export default function Climate() {
  return (
    <>
      <Head>
        <title>Climate Readings</title>
      </Head>
      <GetClimateData />
    </>
  )
}
