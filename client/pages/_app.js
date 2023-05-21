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

import {getStoredUser} from '../components/utills/helpers';
import {useRouter} from 'next/router';


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
    const [ws, setWs] = React.useState();
    const [stage, setStage] = React.useState(0);
    const [signed, setSigned] = React.useState(false);
    const [session, setSession] = React.useState({});
    const [previewChannel, setPreviewChannel] = React.useState(false);
    
    const [account, setAccount] = React.useState({signed:false});
    const [loaded, setLoaded] = React.useState(false);
    

    const checker = {counter: 0};
    // checker
    

    const insertGapiScript = () => {
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = async () => {
        await initializeGoogleSignIn()
      }
      document.body.appendChild(script)
    }
    
    const initializeGoogleSignIn = async () => {
      await window.gapi.load("client:auth2", function () {
        window.gapi.auth2.init({
            client_id: "854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com",
            scope: "email",
            plugin_name: "Stv"
            // client_secret: "",
            // API_KEY: ""

        })
      });
      setTimeout(function () {
        checkAuthOnceLoading();
      }, 1000);
    }
    
    const checkAuthOnceLoading = async () => {
      // console.log(123);
      let loggedStatus = null;
      try {
        const authInstance = gapi.auth2.getAuthInstance();
        // console.log(authInstance, authInstance.isSignedIn, authInstance.isSignedIn.get());
        
        if(authInstance.isSignedIn.get()) {
          // console.log("Stage logged gapi");
          const user_stored = getStoredUser();
          // console.log(user_stored);
          const {data} = await axios.post("/api/verify-account", user_stored);
          if(data.ok) {
            const user = data.profile_user;
            setAccount({...user, signed: true});
            if(window.location.pathname == "/") {
              window.location.href = "/in/my";
            }
          } 
          else {
            // console.log("loggedStatus", loggedStatus);
            window.localStorage.user = null;
            if( window.location.pathname.search("in") >= 0  ) {
              window.location.replace("/");
            }
          }

          // console.log(user);
          // @TODO get user from storage to account variable
        } else {
          if(checker.counter < 3) {
            checker.counter++;
            setTimeout(function () {
              checkAuthOnceLoading();
            }, 1000);
          } else {
            // console.log("loggedStatus", loggedStatus);
            window.localStorage.user = null;
            if( window.location.pathname.search("in") >= 0  ) {
              window.location.replace("/");
            }
          }    
        }
       
      } catch(err) {
        console.log(err);
        setTimeout(function () {
          checkAuthOnceLoading();
        }, 1000);
      }
      return loggedStatus;
      
    }
    // const  {state, dispatch} =  React.useContext(Context);
    React.useEffect(async () => {
      if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
          setLoaded(true);

      } else {
        return <></>;
      }    
      if(window.location.href.search("watchChannelPreview") > 0) {
        setPreviewChannel(true);
      }
      insertGapiScript();
      // checkAuthOnceLoading();
    }, []);

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
                {!previewChannel && <Header account={account} setValue={setValue} setSelectedIndex={setSelectedIndex} value={value} selectedIndex={selectedIndex} />}
                
                <Component
                  {...pageProps} account={account} />
          </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default appWithTranslation(MyApp);