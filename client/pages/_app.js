import * as React from 'react';
import Header from "../components/ui/Header";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import {Provider} from '../context';
import GlobalStyles from '@mui/material/GlobalStyles';
import Head from 'next/head'
const theme = createTheme({
    // breakpoints: {
    //   values: {
    //     mobile: 0,
    //     tablet: 640,
    //     laptop: 1024,
    //     desktop: 1280,
    //   },
    // }
  });

  const styles = {
    a: { textDecoration: 'none' },
    video: {opacity: '1 !important'},
    img: {maxWidth: '100%'}
  }

function MyApp({ Component, pageProps }) {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [title, setTitle] = React.useState("Stairviews");
    const [documentLoading, setDocumentLoading] = React.useState(true);

    React.useEffect(async () => {
      if(document!=undefined) {
        window.onload = function () {
          setDocumentLoading(false)
        }
      }
    }, [])
  return (
    <React.StrictMode>
      <Head>
        <title>{title}</title>
      </Head>

      <Provider>
          <CssBaseline enableColorScheme/>
          <GlobalStyles styles={{ ...styles }} />
          <ThemeProvider theme={theme}>
                <ToastContainer position="top-center" />
                <Header  setValue={setValue} setSelectedIndex={setSelectedIndex} value={value} selectedIndex={selectedIndex} />

              <Component {...pageProps} documentLoading={documentLoading} setDocumentLoading={setDocumentLoading} />
          </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp;