import * as React from 'react';
import Header from "../components/ui/Header";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import {Provider} from '../context';
import GlobalStyles from '@mui/material/GlobalStyles';
import Head from 'next/head';
import { fetchJSON } from '../../server/utills/helpers';

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
    const [ws, setWs] = React.useState();

    const [account, setAccount] = React.useState({});
    const dataGoogleAccount = async () => {
      const data = await fetchJSON("/api/logingoogle");
      return data;
    };

    React.useEffect(async () => {
      if(document!=undefined) {
        window.onload = function () {
          setDocumentLoading(false)
        }
      }

      dataGoogleAccount().then((data) => setAccount({...data, google: true})).catch((err) => {
        console.log(err);
      });
      console.log(account);
      const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
  
      ws.onmessage = (event) => {
        // console.log(event.data);
        console.log(event.data);
      };
      setWs(ws);

      console.log(account);
    }, []);



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