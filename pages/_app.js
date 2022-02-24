import '../styles/globals.css'
import Head from 'next/head';

import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider defaultTheme="dark" justify="center" alignItems="center">
      <Head>
        <title>NextJS App</title>
        <meta name="description" content="Serverless NextJS App using firebase as server"/>
        <meta name="author" content="David Mora Cáceres" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
