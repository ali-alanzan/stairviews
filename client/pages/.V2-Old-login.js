import Hero from "../components/ui/Hero"

import React, { useEffect, useState } from 'react';
import {Context} from '../context';

import {useRouter} from 'next/router';
import { styled } from '@mui/system';

import axios from 'axios';
import {toast} from 'react-toastify';

import Link from 'next/link';
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


import TextField from '@mui/material/TextField';


import airplane from '../assets/send.svg';
import CircularProgress from '@mui/material/CircularProgress';
import Script from 'next/script'



const useStyles = (theme) => {
    return {
        sendButton: {
            ...theme.typography.estimate,
            borderRadius: 50,
            height: 45,
            width: 245,
            fontSize: "1rem",
            backgroundColor: theme.palette.common.orange,
            "&:hover": {
                backgroundColor: theme.palette.secondary.light
            },
             md: {
                height: 40,
                width: 225
            }
        }
    }
};




export default function Login(props) {

    const theme = useTheme();
    const classes = useStyles(theme);

    const [loading, setLoading] = React.useState(false);

    
    const router = useRouter();


    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [gp, setGp] = useState({});
    const authenticate = () => {
        return gp.auth2.getAuthInstance().signIn({
            scope: "https://www.googleapis.com/auth/youtube.force.ssl"
        })
        .then(function () {
            console.log("Sign in successful");
        }, function (err) {
            console.log(err)
        });
    }

    const loadClient = () => {
        gp.client.setApiKey();
        return gp.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
         .then(function () {
            console.log("GAPI client loaded successfuly");
        }, function (err) {
            console.log(err);
         });
    }

    useEffect(() => {
        console.log(typeof(gapi) == undefined);
        if(typeof(gapi) == undefined) {
            setGp(gapi);
            gp.load("client:auth2", function () {
                gp.auth2.init({
                    client_id: process.env.YTG_AUTH
                });
            });
            console.log(gp);
            gp.authenticate();
        }
    }, []);

    return(
        <>
        <Script src="https://accounts.google.com/gsi/client"/>
        <Hero title="Login" />
        <Grid item container direction="column" alignItems="center" 
            justifyContent="center" 
            sx={{marginBottom: matchesMD ? "5em" : 0, 
                
                marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0
            }}
            >

            <Grid item 
            sx={{width: matchesSM ? '80%' : matchesMD ? '60%' : '22rem'}}
            >
                <Grid container>
                    <Grid item>
                        
                    </Grid>
                    <Grid>
                        {/* <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                                authenticate().then(loadClient)
                            }}
                        >
                            <Typography variant="heading" align="center">
                                Login By Google
                            </Typography>
                            <Visibility />
                        </IconButton> */}
                        <div id="g_id_onload"
                            data-client_id="854452941545-f2nmavdc2l2pkgetv76dsvhtdr8o0hne.apps.googleusercontent.com"
                            data-context="signin"
                            data-ux_mode="popup"
                            data-login_uri="http://localhost:3000/login"
                            data-nonce=""
                            data-itp_support="true">
                        </div>

                        <div className="g_id_signin"
                            data-type="standard"
                            data-shape="pill"
                            data-theme="filled_blue"
                            data-text="continue_with"
                            data-size="large"
                            data-locale="ar"
                            data-logo_alignment="left">
                        </div>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
        </>
    )
}
