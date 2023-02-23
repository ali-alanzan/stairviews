import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import axios from 'axios';

import {useRouter} from 'next/router';
import StudentRoute from '../../../../components/routes/StudentRoute';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

import { Avatar, Grid, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Tooltip from '@mui/material/Tooltip';
import ListenAudioCard from '../../../../components/cards/ListenAudioCard';

import {useMediaQuery} from '@mui/material';

import Skeleton from '@mui/material/Skeleton'


let drawerWidth = 300;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      
        ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
        }),
     
    }),
);




const openedMixin = (theme) => {
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return {
        width: matchesSM  ? '100%' : drawerWidth,        
        transition: matchesSM ? theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }): theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',

        top: '80px',
        height: matchesSM  ? '80vh' : undefined,
    }
};

const closedMixin = (theme) => {
    
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return {
        transition: matchesSM ? theme.transitions.create('height', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }) : theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: matchesSM  ? '100%' : `calc(${theme.spacing(7)} + 10px)`,        
     
        top: '80px',
        
        height: matchesSM  ? '56px' : undefined,
        
    }
};

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SingleCoursePodcastsUser = ({documentLoading}) => {

    const [clicked, setClicked] = useState(-1);
    const [completed, setCompleted] = useState([]);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({ lessons: [] });
    
    const [play, setPlay] = useState(false);

    const router = useRouter();
    const {slug} = router.query;
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  

    const [open, setOpen] = useState(matchesSM ? false : true);

    useEffect(() => {
        if(slug) loadCourse();
        if(matchesSM) {
            setOpen(false);
        }
    }, [slug]);


    const loadCourse = async () => {
        if(!slug) return;
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/user/course/${slug}`);

            const allLessons = data.lessons;
            let podcastLessons = [];
            allLessons.map(lesson => {
                if(lesson.audio != undefined && Object.keys(lesson.audio).length > 0) {
                    podcastLessons.push(lesson)
                }
            });
      //      console.log(podcastLessons);
      //      console.log(allLessons);

            setCourse({...data, lessons: podcastLessons});
        } catch(err) {
      //      console.log(err);
        } finally {
            setLoading(false)
        }
    };
    


    const handlePrevious = () => {
        if(clicked > 0) {
            setClicked(clicked-1);
        }
    }




    const handleNext = () => {
        if(course.lessons.length > clicked ) {
            setClicked(clicked+1);
        }
    }




    const loadCompletedLessons = async () => {
        const {data} = await axios.post(`/api/list-completed/`, {
            courseId: course._id
        });
        // console.log("COMPLETED LESSONS => ", data);
        setCompleted(data);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const markAsCompleted = async() => {
        const {data} = await axios.post('/api/mark-completed', {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id
        });
        // console.log('MARK AS COMPLETED', data);
        // setCourse({...course});
        setCompleted([...completed, course.lessons[clicked]._id]);
    }
    const markAsInCompleted = async() => {
        try {
            const {data} = await axios.post('/api/mark-incompleted', {
                courseId: course._id,
                lessonId: course.lessons[clicked]._id
            });
    
            const all = completed;
            const index = all.indexOf(course.lessons[clicked]._id);
      //      console.log(all, index);
            if(index > -1) {
                all.splice(index, 1);
                setCompleted([...all]);
          //      console.log(all, index);
            }
        } catch(err) {
      //      console.log(err);
        }
        // setCompleted([...completed, lessons[clicked]._id]);

        // setCourse({...course});

        // console.log('INCOMPLETED', data);
    }

    const handleStop = () => {
        let clickedCp = clicked;
        setClicked(-1);
        // setClicked(clickedCp);
    };

    const handleRePlay = async () => {
        let clickedCp = clicked;
        setPlay(false);
        setClicked(-1);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(clickedCp)
            }, 10);
        });
        setClicked(clickedCp);
        setPlay(true);
    };

 
    
    if(documentLoading || loading) {
        return <>
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />

        </>
    }

    return (
        <StudentRoute>

            {/* {JSON.stringify(course, null, 4)} */}
            
            <Grid container 
                sx={{
                    flexGow: 1,
                }}
            >
                {course.lessons.length < 1 ? <Grid container p={14}>
                    <Typography variant="h4" component="p" 
                    sx={{color: theme.palette.secondary.main, padding: '0 10px'}}>
                        There is no Podcasts for this course 
                    </Typography>

                    <Typography variant="h4" component="a"
                        onClick={() => router.push('/user/course/'+slug)} 
                    sx={{color: theme.palette.primary.main, padding: '0 10px'}}>
                        Back to course 
                    </Typography>
                </Grid> : <>
    <Grid item 
                    sx={{
                        maxWidth: '22rem',
                    }}
                >
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                        {(matchesSM || (!matchesSM && open)) && <Typography sx={{flexGrow: 1   }} variant="h5" align="center"> Lessons </Typography>}
                        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                            {!open ? <MenuOpenIcon /> : theme.direction === 'rtl' ? <ChevronRightIcon />: <ChevronLeftIcon />}
                        </IconButton>
                        </DrawerHeader>
                        <Divider />
                    
                        <Divider />
                        <List>
                        {course.lessons.map((lesson, index) => (
                            <ListItem button key={index} 
                                onClick={() => {setClicked(index); 
                                    if(matchesSM) {
                                        setOpen(!open)
                                    };
                                }}
                                selected={clicked === index}
                                // completed
                            >
                            <ListItemIcon>
                                <Tooltip title={<Typography variant="h6">{lesson.title}</Typography>} arrow 
                                    placement="right">
                                    <Avatar>{index+1}</Avatar>
                                </Tooltip>
                            </ListItemIcon>

                            <ListItemText primary={lesson.title} disableTypography={true} sx={{
                                whiteSpace: open ? 'initial' : undefined
                            }} />
                            <ListItemIcon>
                                {clicked === index ? <GraphicEqIcon sx={{margin: '2px 4px'}} size="large"/> : ''}
                                {/* {completed.includes(lesson._id) ? <CheckCircleOutlineIcon color="success" /> : <RemoveCircleOutlineIcon color="warning" />} */}
                            </ListItemIcon>
                            </ListItem>
                        ))}
                        </List>
                    </Drawer>
                </Grid>
    </>}
                
            </Grid>

            <Grid item container
                sx={{
                    maxWidth: matchesSM ? '100%': '75rem',
                    flexGrow: 1,
                    margin: matchesSM ? '0 1rem': theme.direction === 'rtl' ? undefined : open ? '0 15.5rem 0 0' : '0 5rem 0 0',
                }}
            >
                
                {clicked == -1 ? (<>
                {course.lessons.length > 1 && <Grid item container sx={{ flexGrow: 1 }}>
                        <Grid item container direction="column" align="center" alignItems="center" 
                                justifyContent="center"  pt={4}>
                                <PlayLessonIcon sx={{fontSize: 120}}/>
                                <Grid sx={{maxWidth: '40rem', md: {maxWidth: '40rem'}, xs: {maxWidth: '97%'}}}>

                                    <Typography variant="h4" component="p" 
                                    sx={{color: theme.palette.secondary.main, margin: '20px 0 40px 0'}}>
                                        Click on the lessons to start learning
                                    </Typography>
                                    
                                </Grid>

                        </Grid>
                    </Grid>}
                    
                </>) : (
                    <Grid container direction="column" sx={{ flexGrow: 1, maxWidth: matchesSM ? '100%' : '50%', 
                        paddingLeft: matchesSM ? undefined : 10
                    }}>
                    
          

                        {course.lessons[clicked].audio && course.lessons[clicked].audio.Location && (
                            <Grid item sx={{}}>
                                <Grid container sx={{ flexGrow: 1, mt: 8 }} direction="row" onClick={() => router.push(`/course/${course.slug}`)}>
                                    <Grid item>
                                        <ArrowBackIcon sx={{color: theme.palette.primary.main}} /> 
                                    </Grid>
                                    <Grid item md>
                                        <Typography variant="h5" color={theme.palette.primary.main}>
                                            Podcasts: <small> {course.title} </small>
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item>

                                    <ListenAudioCard 
                                        handleStop={handleStop}
                                        handleRePlay={handleRePlay}
                                        handlePrevious={handlePrevious}
                                        handleNext={handleNext}
                                        play={play} setPlay={setPlay}
                                        course={course} lesson={course.lessons[clicked]} clicked={clicked} 
                                    />
                                </Grid>
                            </Grid>
                        )}
                    <Grid item>
                        {/* {course.lessons[clicked].content} */}
                    </Grid>
                    {/* <ReactMarkdown source={course.lessons[clicked].video.Location} /> */}
                    </Grid>
                )}

            </Grid>
        
        </StudentRoute>
    )
}


export default SingleCoursePodcastsUser;