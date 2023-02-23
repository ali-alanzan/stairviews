
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';

import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {  Grid, Button  } from '@mui/material';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useTheme } from '@mui/styles';
import { useMediaQuery} from '@mui/material';

const MapCoursesToWatch = ({courses}) => {
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    return (
        <Grid item container sx={{flexGrow: 1, mb: 3}}>
            {courses.length < 1 ? 'No courses enrolled yet': courses.map(course => (
                <Grid item key={course._id} container direction="row" sx={{
                    flexGrow: 1,
                    padding: matchesSM ? '0 1rem' : undefined,
                    margin: matchesSM ? '1rem 0' : undefined,
                    }}
                >
                    <Grid item 
                        sx={{
                            margin: '0 10px',
                            maxWidth: matchesSM ? '20%': undefined
                        }}
                    >
                        <Avatar 
                            size={120} 
                            src={course.image && course.image.Location ? course.image.Location : '/course.png'}
                        />
                    </Grid>

                    <Grid item
                        sx={{
                            flexGrow: 1,
                            maxWidth: matchesSM ? '80%': undefined
                        }}
                    >
                        <Link 
                            href={`/user/course/${course.slug}`}
                            passHref
                        >
                            <a>
                                <Typography variant="h5">
                                    {course.title}
                                </Typography>
                            </a>
                        </Link>
                        <Typography variant="body2">
                            {course.lessons.length} Lessons
                        </Typography>

                    </Grid>
                    <Grid item container
                        sx={{
                            flexGrow: 1,
                            justifyContent: 'end'
                        }}
                    >
                       <Grid item container
                        sx={{
                            maxWidth: matchesSM ? '90%': '40%',
                            justifyContent: 'space-around',
                            marginTop: matchesSM ? '1rem' : undefined,
                        }}
                       >
                        <Link 
                                href={`/user/course/podcasts/${course.slug}`}
                                passHref
                            >
                            <a>
                                <Button variant="contained" color='secondary' endIcon={<HeadphonesIcon />}>
                                    Podcasts
                                </Button>
                                
                            </a>
                        </Link>
                        <Link 
                            href={`/user/course/${course.slug}`}
                            passHref
                        >
                            <a>
                                <Button variant="contained" endIcon={<PlayArrowIcon />}>
                                    Resume
                                </Button>
                                
                            </a>
                        </Link>
                        </Grid>
                    </Grid>

                </Grid>
            ))}
        </Grid>
    )
} ;

export default MapCoursesToWatch;