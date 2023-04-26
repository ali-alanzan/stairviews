import {useState} from 'react';
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

const ContinueToAccount = ({documentLoading}) => {

        const router = useRouter();
      

        const [values, setValues] = useState({
            title: 'The time is now to get started, Join us',
        });
    
        const theme = useTheme();
        const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
        const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
        
        // console.log(process.env.CLIENT_GOOGLE_ID);
    
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
                                    onClick={handleStartLogin}
                                    endIcon={<GoogleIcon />}
                                >
                                    Continue with Google
                                </Button>
                               


            </Grid>
    )
}

export default ContinueToAccount;