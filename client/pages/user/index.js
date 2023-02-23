import React, {useContext, useEffect, useState} from 'react';
import UserRoute from '../../components/routes/UserRoute';
import {Context} from '../../context';
import Hero from "../../components/ui/Hero"
import axios from 'axios';
import { Box, Grid  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MapCoursesToWatch from '../../components/cards/MapCoursesToWatch';
import { useTheme } from '@mui/styles';
import {useMediaQuery} from '@mui/material';


const UserIndex = () => {
    const {state: {user}, } = useContext(Context);

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const loadCourses = async () => {


        try {
            setLoading(true);
            const {data} = await axios.get('/api/user-courses');
            setCourses(data);
            setLoading(false);
        } catch(err) {
      //      console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <UserRoute>
                <Hero title="User Dashboard" />
                
                {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
            {loading ? <Box
            sx={{ height: '100vh !important',            
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "inherit",
            }}
            >
            <CircularProgress />
        </Box> : ''}

        {/** show enrolled courses for this user */}
            <Grid container direction="column"
                sx={{
                    maxWidth: matchesSM ? '100%': '70%',
                    width: '100%',
                    mt: 2,
                }}
            >
                <MapCoursesToWatch courses={courses} />
        </Grid>

        </UserRoute>
    );

}

export default UserIndex;