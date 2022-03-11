import Books from '../components/Books';
import Head from 'next/head'

export default function BooksPage() {
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <Books />
    </>
  )
}
