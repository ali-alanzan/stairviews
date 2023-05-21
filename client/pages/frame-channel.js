// import {useState, useContext, useEffect} from 'react';
// import axios from 'axios';
// import {toast} from 'react-toastify';
import { Grid } from '@mui/material';
// import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
// import Hero from '../components/ui/Hero';
// import Link from 'next/link';
// import {Context} from '../context';
// import {useRouter} from 'next/router';
// import { useTheme } from '@mui/styles';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import SubscriberRoute from '../components/routes/SubscriberRoute'
import YTChannelCard from '../components/cards/YTChannelCard';


export default function AboutUs({account}) {
    // state

    // const theme = useTheme();
    // const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // context 
    
    // router
    // const router = useRouter();


    const ps = new URLSearchParams(window.location.search);
    const channelId = ps.get("channelId");
    // redirect logged in
    // useEffect(() => {
    
    // }, []);


    
    return(
        <>
            {channelId.length > 0 && <Grid item
                sx={{
                    padding: "0 20px",
                    paddingTop: "15%"
                }}
            >
                <YTChannelCard youtubeChannel={channelId} />
            </Grid>}
        </>
        // <SubscriberRoute account={account}>
            
        // </SubscriberRoute>
    )

}