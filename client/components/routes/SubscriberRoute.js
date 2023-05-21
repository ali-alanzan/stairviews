import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import UserSideBarNav from '../nav/UserSideBarNav';
import Grid from '@mui/material/Grid';

import {Context} from '../../context';
import { useTheme } from '@mui/styles';
import {Box, Typography, useMediaQuery} from '@mui/material';

import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336

const SubscriberRoute = ({children, account}) => {
    const [hidden, setHidden] = useState(true);

    const router = useRouter();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        if(window != undefined && window != {} && window != null && typeof(window.document) && window.document != undefined) {
        } else {
          return <></>;
        }
    }, []);

    // const menuItems = [
    //     {
    //         icon: '',
    //         avatar: 'D',
    //         title: 'Dashboard',
    //         link: '/user'
    //     }
    // ];

    if(!account.signed) {
        return <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: primary,
        }}
      >
        <Typography variant="h1" style={{ color: 'white' }}>
            N/A. Please <a href="/" style={{color: 'lightskyblue' }}>Login</a>
        </Typography>
      </Box>
    }
    return <>{children}</>
}

export default SubscriberRoute;