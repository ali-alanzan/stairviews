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
    const [stage, setStage] = React.useState(0);
    const [signed, setSigned] = React.useState(false);
    const [session, setSession] = React.useState({});
    
    const [account, setAccount] = React.useState({});
    const [loaded, setLoaded] = React.useState(false);

    // const insertGapiScript = () => {
    //   const script = document.createElement('script')
    //   script.src = 'https://apis.google.com/js/api.js'
    //   script.onload = async () => {
    //     await initializeGoogleSignIn()
    //   }
    //   document.body.appendChild(script)
    // }
    
    // const initializeGoogleSignIn = async () => {
    //   await window.gapi.load("client:auth2", function () {
    //     window.gapi.auth2.init({
    //         client_id: "854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com",
    //         scope: "email",
    //         plugin_name: "Stv"
    //         // client_secret: "",
    //         // API_KEY: ""

    //     })
    //   });


    //   setTimeout(function () {
    //     console.log(19);
    //     try {
    //       const authInstance = gapi.auth2.getAuthInstance();
    //       if(authInstance.isSignedIn.get()) {
    //         setStage("watch");
    //         setSigned(true);
    //         console.log("Stage logged gapi");
    //       }
    //     } catch(err) {
    //       console.log(err);
    //       checkLoggedState();

    //     }
        
    //   }, 1000);

    // }

    // const checkLoggedState = () => {
    //   try {
    //     const authInstance = gapi.auth2.getAuthInstance();
    //     if(authInstance.isSignedIn.get()) {
    //       setStage("watch");
    //       setSigned(true);
    //       console.log("Stage logged gapi");
    //     }
    //   } catch(err) {
    //     console.log(err);
    //     checkLoggedState();
    //   }
    // }

 
    // const  {state, dispatch} =  React.useContext(Context);
    React.useEffect(async () => {
      if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
          setLoaded(true);
      } else {
        return <></>;
      }
      // insertGapiScript();
    
    }, []);
    const dataGoogleAccount = async () => {
      // console.log(getCookie("access_token"));
      // const data = await fetchJSON("/api/logingoogle?token="+getCookie("access_token"));
      // return data;
      

    };
    // // const  {state, dispatch} =  React.useContext(Context);
    // React.useEffect(async () => {
    //   if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
    //       setLoaded(true);
    //   } else {
    //     return <></>;
    //   }
    //   insertGapiScript();
    
    // }, []);
  if(!loaded) {
    return <></>
  }


  return (
    <React.StrictMode>
      <Head>
        <title>{title}</title>
        {/* <script src="https://apis.google.com/js/api.js"></script> */}
      </Head>
      <Provider>
          <CssBaseline enableColorScheme/>
          <GlobalStyles styles={{ ...styles }} />
          <ThemeProvider theme={theme}>
                <ToastContainer position="top-center" />
                <Header signed={signed} setSigned={setSigned} stage={stage} setStage={setStage} account={account} setValue={setValue} setSelectedIndex={setSelectedIndex} value={value} selectedIndex={selectedIndex} />
                <Component
                  setSession={setSession} session={session}
                  signed={signed} setSigned={setSigned} stage={stage} setStage={setStage} 
                  {...pageProps} account={account} />
          </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default appWithTranslation(MyApp);