
import React from 'react';

import { Grid, useMediaQuery} from '@mui/material';
import CourseCard from './CourseCard';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/styles';

const CoursesCardsSection = ({
    courses
}) => {

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container direction="row" 
        
        sx={{
            alignItems:"center", 
            backgroundColor: '#1d0a2b',
            justifyContent: 'space-around',
            padding: '2rem 0'

        }} >
           
           <Grid item container 
            sx={{
                justifyContent: 'center',
                color: '#e2e2e2',
                paddingBottom: '2rem'
            }}
           >

            <Typography variant="h4">
                Explore Courses
            </Typography>
           </Grid>
           <Grid item container 
           direction={matchesSM ? 'column': undefined}
            sx={{
                justifyContent: 'space-around',
                color: '#e2e2e2',
                alignItems: matchesSM ? 'center': undefined,
                paddingBottom: '2rem',
            }}
           >
            {courses && courses.map((course) => (
                <Grid item key={course._id} 
                    sx={{
                        width: matchesSM ? '80%':  '30%',
                        marginBottom: matchesSM ? '2rem': undefined,
                    }}
                >
                    <CourseCard course={course} />
                </Grid>
            ))}
           </Grid>
 
        </Grid>
    )
}


export default CoursesCardsSection;