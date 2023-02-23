import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import UserSideBarNav from '../nav/UserSideBarNav';
import Grid from '@mui/material/Grid';



import { useTheme } from '@mui/styles';
import {useMediaQuery} from '@mui/material';


const InstructorRoute = ({children}) => {
    const [hidden, setHidden] = useState(true);

    const router = useRouter();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const fetchInstructor = async () => {
        try {
            const {data} = await axios.get('/api/current-instructor');
            // console.log(data);
            if (data.ok) setHidden(false);
        } catch (err) {
            // console.log(err);
            setHidden(true);
            window.localStorage.removeItem('user');
            const {data} = await axios.get("/api/logout");
            window.location.href = window.location.host+'/login';
        }
    };
    
    useEffect(() => {
        fetchInstructor();
    }, []);

    const menuItems = [
        {
            icon: '',
            avatar: 'D',
            title: 'Dashboard',
            link: '/instructor'
        },
        {
            icon: '',
            avatar: 'C',
            title: 'Create Course',
            link: '/instructor/course/create'
        },
        {
            icon: '',
            avatar: 'R',
            title: 'Revenue',
            link: '/instructor/revenue'
        },
        {
            icon: '',
            avatar: 'R',
            title: 'Watch',
            link: '/instructor/courses'
        },
    ];
    return hidden ? (
        <Box
            sx={{ height: '100vh !important',            
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "inherit",
            }}
            >
            <CircularProgress />
        </Box>
    ) : (
            <Grid container direction={matchesSM ? 'column' : undefined} spacing={1}>
                <Grid item sx={{ position: 'relative', maxWidth: matchesSM ? '100%' : "30%" }}>
                    <UserSideBarNav menuItems={menuItems} />
                </Grid>
                <Grid item  sx={{ width:  matchesSM ? '100%' :"70%", paddingTop: '49px !important' }}>
                    {children}
                </Grid>
            </Grid>
    )
}

export default InstructorRoute;