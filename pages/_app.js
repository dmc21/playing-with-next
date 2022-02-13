import '../styles/globals.css'


import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider defaultTheme="dark" justify="center" alignItems="center">
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
