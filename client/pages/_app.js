import * as React from 'react';
// import  from 'react'; 
import { Context } from '../context';
import Header from "../components/ui/Header";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import {Provider} from '../context';
import GlobalStyles from '@mui/material/GlobalStyles';
import Head from 'next/head';
import { fetchJSON , getCookie} from '../components/utills/helpers';

import { appWithTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import axios from "axios";

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
    const [loaded, setLoaded] = React.useState(false);

    const [account, setAccount] = React.useState({});
    const dataGoogleAccount = async () => {
      console.log(getCookie("access_token"));
      const data = await fetchJSON("/api/logingoogle?token="+getCookie("access_token"));
      return data;
    };
    // const  {state, dispatch} =  React.useContext(Context);
    React.useEffect(async () => {
      if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
          setLoaded(true);
      } else {
        return <></>;
      }
      await dataGoogleAccount()
      .then((res) => {
        const retrivedAccount = res.data;
        setAccount({...retrivedAccount, google: true});
      }).catch((err) => {
        console.log(err);
        toast("False Error login process, please try again");
      });
      
    }, []);
  if(!loaded) {
    return <></>
  }


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
                <Header account={account} setValue={setValue} setSelectedIndex={setSelectedIndex} value={value} selectedIndex={selectedIndex} />
              <Component {...pageProps} account={account} />
          </ThemeProvider>
      </Provider>
        // ...
        {/* <SubscriberForm/> */}
        // ...
        {/* <MyDriveComponent/> */}
        // ...
    </React.StrictMode>
  );
}

export default appWithTranslation(MyApp);