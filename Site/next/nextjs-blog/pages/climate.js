import ClimatePage from '../components/Climate/ClimatePage';
import Head from 'next/head'

export default function Climate() {
  return (
    <>
      <Head>
        <title>Climate Readings</title>
      </Head>
      <ClimatePage />
    </>
  )
}
