import GetAirData from '../components/air/getAirData'
import Head from 'next/head'

export default function Air() {
  return (
    <>
      <Head>
        <title>Air Readings</title>
      </Head>
      <GetAirData/>
    </>
  )
}
