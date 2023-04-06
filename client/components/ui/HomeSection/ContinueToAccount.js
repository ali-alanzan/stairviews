import {useState, useEffect} from 'react';
import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import continueAccounts from '../../../assets/google-logo-transparent.png'
import { Button } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import LoginIcon from '@mui/icons-material/Login';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { useTheme } from '@mui/styles';
import {useRouter} from 'next/router';
import Skeleton from '@mui/material/Skeleton';
import GoogleIcon from '@mui/icons-material/Google';

import { fetchJSON } from '../../utills/helpers';
import axios from 'axios';
import Script from 'next/script';
import { getPanelId } from '@mui/base';

const ContinueToAccount = ({documentLoading}) => {

        const router = useRouter();
      

        const [values, setValues] = useState({
            title: 'The time is now to get started, Join us',
        });
    
        const theme = useTheme();
        const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
        const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
        



        const authenticate =() => {

            return gapi.auth2.getAuthInstance()
                    .signIn({
                        scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
                    })
                    .then(function () {
                        console.log("sign in successful")
                    }, function (err) {
                        console.log(err)
                    });
        }


        const loadClient = () => {
            gapi.client.setApiKey(process.env.API_KEY);

            return gapi
                .client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function () {
                        console.log("GAPI client loaded successfully"); // -- done
                    }, function (err) {
                        console.log(err);
                    });
            
        }



        // console.log(process.env.CLIENT_GOOGLE_ID);
        const loadWindowCheck = () => {
            // console.log(typeof(window), window);
            // window.onload = function() {
                // console.log("loaded");
            // }
            // if(typeof(window) != {} && window != {}) {
                // gapi.load();
                // console.log("asd", gapi);

            // }
            if(window != {}) {
                setTimeout(function () {
                    // console.log("load",  window.document, window.location);
                    loadClientAuth2Client1();
                }, 1000);
            }
        }

        const loadClientAuth2Client1 = () => {
            gapi.load("client:auth2", function () {
                gapi.auth2.init({
                    client_id: process.env.CLIENT_ID
                })
            })
        }


        const handleLoginB2 = () => {

        }
        useEffect(() => {
            loadWindowCheck();
        }, [window]);




        async function handleStartLogin() {

            const {data} = await axios.get(`/api/joingoogle`);
            // console.log("data", data);

            const res = await fetchJSON(
                "https://accounts.google.com/.well-known/openid-configuration"
            );
            const authorization_endpoint = res.data.authorization_endpoint;
            //   console.log(process.env.CLIENT_GOOGLE_ID);
            //   const parameters = {
            //     response_type: "token",
            //     client_id: process.env.CLIENT_GOOGLE_ID,
            //     scope: "email profile",
            //     redirect_uri: window.location.origin + "/login/callback",
            //   };

            //   console.log(authorization_endpoint, parameters);
            //   console.log("authorization_endpoint", authorization_endpoint.data.authorization_endpoint);
              window.location.href = authorization_endpoint + "?" + new URLSearchParams(data);
          }


        const classes = {
            button: {
                fontFamily: "Pacifico",
                fontSize: "1rem",
                textTransform: "none",
                color: 'white',
                borderRadius: '50px',
                marginLeft: "25px",
                marginRight: "25px",
                height: "45px",
                padding: '0 3rem',
                width: matchesSM ? '100%' : undefined,
                "&:hover": {
                    backgroundColor: '#ba68c8'
                }
            }

        }

        

        
    return (
            <>
            <Script src="https://apis.google.com/js/api.js" />
                <Grid
                container
                    sx={{
                        maxWidth: '100%',
                        justifyContent: "center",
                        alignItems: "end",
                        height: "100%"
                    }}
                    direction="column"
                >

                                
                    <Button variant="contained"  
                        color="secondary" 
                        sx={{
                            ...classes.button,
                            backgroundColor: "#fff",
                            color: "#000"
                        }} 
                        onClick={() => authenticate().then(loadClient)}
                        endIcon={<GoogleIcon />}
                    >
                        Continue with Google
                    </Button>
                </Grid>
            </>
    )
}

export default ContinueToAccount;