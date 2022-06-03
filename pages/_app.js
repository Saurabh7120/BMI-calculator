import '../styles/globals.css'
import {ChakraProvider} from '@chakra-ui/react'
import "@fontsource/open-sans"

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
  
}

export default MyApp
