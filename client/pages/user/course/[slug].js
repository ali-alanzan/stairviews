import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import axios from 'axios';

import {useRouter} from 'next/router';
import StudentRoute from '../../../components/routes/StudentRoute';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

import { Avatar, Grid, Typography, Hidden } from '@mui/material';
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

import Tooltip from '@mui/material/Tooltip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Link from 'next/link';
import {Button, useMediaQuery} from '@mui/material';

import "video-react/dist/video-react.css"; 
import { Player, BigPlayButton, LoadingSpinner, ControlBar, PlaybackRateMenuButton } from 'video-react';

import Skeleton from '@mui/material/Skeleton';


import CourseTabs from '../../../components/ui/CourseTabs';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';



import champianAward from  '../../../assets/medal_award_winner_champion_icon_151771.png'


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


const AchievementIcon = ({size=120, color="#000"}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke={color} stroke-width="2" d="M10.3248685,14.7630919 C7.82620532,14.038202 6,11.7325889 6,9 L6,1 L18,1 L18,10 M6,3 L1,3 L1,7 C1,9.509 2.791,11 5,11 L6,11 M20.0335555,10.884915 C21.7416567,10.4908882 23,9.10306372 23,7 L23,3 L18,3 M10,19 L5,19 L5,23 L16.5,23 M16.5,10 C12.9101429,10 10,12.9101429 10,16.5 C10,20.0898571 12.9101429,23 16.5,23 C20.0898571,23 23,20.0898571 23,16.5 C23,12.9101429 20.0898571,10 16.5,10 L16.5,10 Z M20,14 L15.5,18.5 L13,16 M10.2056405,15.4240751 C8.89754812,16.0817472 8,17.4360568 8,19"/>
        </svg>
    )
}


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

const SingleCourseUser = ({documentLoading}) => {

    const [clicked, setClicked] = useState(-1);
    const [completed, setCompleted] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingVideo, setLoadingVideo] = useState(false);
    const [course, setCourse] = useState({ lessons: [] });
    const [colorLineBar, setColorLineBar] = useState('#ff8100')    

    const [lastUnCompleted, setLastUnCompleted] = useState({ title: '', index: 0});

    const router = useRouter();
    const {slug} = router.query;
    const theme = useTheme();

    const upSM = useMediaQuery(theme.breakpoints.up('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const [open, setOpen] = useState(false);


    
    useEffect(() => {
        if(slug) loadCourse();
        if(upSM) {
            setOpen(true);
        }
        if(!documentLoading && document != null) {

            checkCompletedLesson();
        

        }
    }, [slug]);

    const checkCompletedLesson = async () => {
        const waitWhile = await setTimeout(function () {
            const allUncompleted = document.querySelectorAll('.uncompleted-lesson');


            if(allUncompleted.length > 0) {
                const lastUnCompletedLesson = allUncompleted[0];
                const lessonToWatch = lastUnCompletedLesson.closest('.iles0-brs');
                setLastUnCompleted({
                    index: lessonToWatch.firstElementChild.innerText,
                    title: lessonToWatch.firstElementChild.nextElementSibling.innerText
                });
            }
        }, 100)
        
    }

    const markAsWatching = async (index) => {
        const {data} = await axios.post('/api/mark-watching', {
            courseId: course._id,
            lessonId: course.lessons[index]._id
        });
    }

    const loadCourse = async () => {
        if(!slug || loading) return;
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/user/course/${slug}`);
            setCourse(data);
            setLoading(false);
            loadCompletedLessons(data._id)
        } catch(err) {
      //      console.log(err);
            setLoading(false)

        }
    };
    
    const loadCompletedLessons = async (courseID) => {
        
        if(loading) return;
        setLoading(true)
        const {data} = await axios.post(`/api/list-completed/`, {
            courseId: courseID
        });
        // console.log("COMPLETED LESSONS => ", data);
        setCompleted(data);
        if(data.length == course.lessons.length) {
            setLastUnCompleted({
                index: -1,
            });
        } else {
            const waitWhile = await setTimeout(function () {
                const allUncompleted = document.querySelectorAll('.uncompleted-lesson');
    
    
                if(allUncompleted.length > 0) {
                    const lastUnCompletedLesson = allUncompleted[0];
                    const lessonToWatch = lastUnCompletedLesson.closest('.iles0-brs');
                    setLastUnCompleted({
                        index: lessonToWatch.firstElementChild.innerText,
                        title: lessonToWatch.firstElementChild.nextElementSibling.innerText
                    });
                }
            }, 100)
        }
        setLoading(false);

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
        setCompleted([...completed, lessons[clicked]._id]);

        setCourse({...course});

        // console.log('INCOMPLETED', data);
    }



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
    
    return (
        <StudentRoute>

            <Grid container
                sx={{
                    flexGrow: 1,
                    marginTop: 4
                }}
                direction={matchesSM ? 'column-reverse' : 'row'}
            >
                <Grid item 
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    {clicked == -1 ? '': loadingVideo  ? <>
                        <Skeleton width="100%" height='2.5px' sx={{ transform: 'initial', transformOrigin: '0 0', backgroundColor: '#313c5c'}} />
                    </>: <Grid container sx={{
                        height: matchesSM ? '15px': '2.5px',
                        backgroundColor: colorLineBar,
                        flexGrow: 1,
                    }}></Grid>}
                    


                    <Grid container 
                        sx={{
                            flexGrow: 1,
                            paddingLeft: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Grid item sx={{flexGrow: 1}}>
                        {documentLoading ? <Grid container sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                            flexGrow: 1,
                        }}>
                            <Grid item sx={{
                                width: '20rem'
                            }}>
                                <Skeleton width="100%" height='25px' sx={{ transform: 'initial', transformOrigin: '0 0', backgroundColor: '#313c5c'}} />
                                <Skeleton width="100%" height='2.5px' sx={{ margin: '40px auto', transform: 'initial', transformOrigin: '0 0', backgroundColor: '#313c5c'}} />

                            </Grid>
                        </Grid> : clicked == -1 ? (<>

                            {lastUnCompleted.index == -1 ? <Grid item container direction="column" align="center" alignItems="center" 
                                                    justifyContent="center">
                                                    <Grid
                                                        sx={{
                                                            
                                                        }}
                                                    >
                                                        <Grid item 
                                                            sx={{
                                                                border: '1px solid #71ff00',
                                                                borderRadius: '50%',
                                                                padding: '2.5rem',
                                                                boxShadow: '0px 1px 3px #9bf734',
                                                            }}
                                                        >
                                                            <AchievementIcon size={180} color={"#FFD700"} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid sx={{maxWidth: '40rem', md: {maxWidth: '40rem'}, xs: {maxWidth: '97%'}}}>
                                                        <Typography variant="h4" component="p" 
                                                        sx={{color: theme.palette.secondary.main, margin: '20px 0 40px 0'}}>
                                                            Great experience have added to your knowledge.  
                                                        </Typography>

                                                    </Grid>
                                                    {/*  */}
                                                    <Grid item 
                                                            sx={{
                                                                borderRadius: '50%',
                                                                padding: '2.5rem',
                                                            }}
                                                        >
                                                            <img src={champianAward.src}
                                                                alt="" 
                                                                sx={{
                                                                    maxWidth:'120px',
                                                                    maxHeight:'120px'
                                                                }}
                                                            />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="h4" component="p" 
                                                        sx={{color: theme.palette.secondary.main, margin: '20px 0 40px 0'}}>
                                                            Only Keep Learning can build great future  
                                                        </Typography>
                                                    </Grid>

                                            </Grid>: <><Grid container sx={{ flexGrow: 1 }}>
                                <Grid item container direction="column" align="center" alignItems="center" 
                                            justifyContent="center">
                                        <PlayLessonIcon sx={{fontSize: 120}}/>
                                        <Grid sx={{maxWidth: '40rem', md: {maxWidth: '40rem'}, xs: {maxWidth: '97%'}}}>
                                            <Typography variant="h4" component="p" 
                                            sx={{color: theme.palette.secondary.main, margin: '20px 0 40px 0'}}>
                                                Click on the lessons to start learning
                                            </Typography>
                                        </Grid>

                                        <Grid item container direction="row" alignItems="center" 
                                        justifyContent="space-around" mt={8}>
                                            <Grid item container justifyContent={"center"} my={2}>
                                                <Typography color={theme.palette.primary.main} variant='h4'>
                                                    Continue Watching
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid item container>
                                                    <Avatar>{lastUnCompleted.index}</Avatar>

                                                    <Typography variant="h4" component="p" 
                                                        sx={{
                                                            color: theme.palette.secondary.main,
                                                            margin: matchesSM ? '0' : '0 10px',
                                                            maxWidth: matchesSM ? '80%' : undefined,
                                                        }}
                                                    >
                                                        {lastUnCompleted.title}
                                                    </Typography>                                            
                                                </Grid>
                                            </Grid>

                                            <Grid item my={matchesSM ? 2 : undefined}>
                                                <Button
                                                    onClick={() => {
                                                        setClicked(lastUnCompleted.index-1); 
                                                        setLoadingVideo(true); 
                                                        markAsWatching(lastUnCompleted.index-1); 
                                                    }}
                                                    
                                                    variant="contained" endIcon={<PlayArrowIcon />}>
                                                    Resume
                                                </Button>
                                            </Grid>
                                        </Grid>

                                </Grid>
                                
                            </Grid></>

                            }

                            
                        </>) : (
                            <Grid container direction="column" sx={{ flexGrow: 1, maxWidth: '100%'}}>
                            

                            {course.lessons[clicked].video && course.lessons[clicked].video.Location && (
                                            <Grid item sx={{width: '100%', height: '60vh'}}>
                                                
                                                <Player
                                                    playsInline fluid={false} width="100%" height={"100%"}
                                                    
                                                    onPlay={(e) => {
                                                        setColorLineBar('#48ab7c') // grren energy
                                                    }}
                                                    onPause={(e) => {
                                                        setColorLineBar('#ed6c02') // gold
                                                    }}
                                                    onEnded={(e) => {
                                                        setColorLineBar('#800080') // 
                                                        markAsCompleted(course.lessons[clicked]._id)
                                                    }}
                                                    onAbort={(e) => {
                                                        setColorLineBar('#93CAED') // softblue
                                                    }}
                                                    onCanPlay={(e) => {
                                                        setLoadingVideo(false)
                                                    }}
                                                    
                                                    src={course.lessons[clicked].video.Location}
                                                    poster={course.image && course.image.Location ? course.image.Location : '/course.png'}
                                                >
                                                    <BigPlayButton position={matchesSM ? 'center' : undefined} />
                                                    <LoadingSpinner />
                                                    <ControlBar>
                                                        <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.25]} />
                                                    </ControlBar>
                                                </Player>
                                            </Grid>
                                        )}


                                        <Grid container direction={'row'} 
                                            sx={{
                                            flexGrow: 1,
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            padding: matchesSM ? '1rem': '1rem 2rem',
                                            backgroundColor: 'rgb(190 211 222 / 71%)',
                                        }}
                                        >
                                            {documentLoading ? <>
                                                <Skeleton width="100%" height='20vh' sx={{backgroundColor: '#313c5c'}} />
                                            </> : <>
                                                <Grid item>
                                                    <Typography variant="h5" component="h1">
                                                        {course.lessons[clicked].title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="text" onClick={completed.includes(course.lessons[clicked]._id) ? markAsInCompleted : markAsCompleted}>
                                                        {completed.includes(course.lessons[clicked]._id) ? 'Mark incomplete' : 'Mark as completed'}
                                                    </Button>
                                                </Grid>
                                            </> }
                                            
                                        </Grid>
                            

                            </Grid>
                        )}
                        </Grid>
                    </Grid>
                
                    <Grid container
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        {clicked == -1 ? '' : <>
                        <CourseTabs
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            handleRePlay={handleRePlay}
                            course={course}
                            completed={completed}

                            clicked={clicked} content={course.lessons[clicked].content} />
                        </>}
                    </Grid>

                </Grid>

                <Grid item 
                    sx={{
                        maxWidth: matchesSM ? '100%' : drawerWidth+'px',

                    }}
                >
                    <Grid container 
                        sx={{
                            flexGrow: 1,
                        }}
                    
                    >
                    <Drawer variant={"permanent"} open={open} anchor={matchesSM ? 'top' : 'right'}>
                        <DrawerHeader>
                        {(matchesSM || (!matchesSM && open)) && <Typography sx={{
                            flexGrow: 1, whiteSpace: 'pre-wrap' 
                            }} variant="h5" align="center">
                        <Link href={`/course/${slug}`} passHref>
                            <a>
                            {course.title}
                            </a>
                        </Link>
                            </Typography>}
                        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                            {!open ? <MenuOpenIcon /> : theme.direction === 'rtl' ? <ChevronRightIcon />: <ChevronLeftIcon />}
                        </IconButton>
                        </DrawerHeader>
                        {upSM && <><Divider /><Divider /></>}
                        <List sx={{
                            paddingTop: matchesSM ? 0 : undefined 
                        }}>
                        
                        { documentLoading ? <>
                            <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                            <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                            <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                            <Skeleton width="100%" height='30px' sx={{backgroundColor: '#313c5c'}} />
                        </> : course.lessons.map((lesson, index) => (
                            <ListItem className="iles0-brs" button key={index} 
                                onClick={() => {
                                    setClicked(index); 
                                    setLoadingVideo(true); 
                                    markAsWatching(index); 
                                    if(matchesSM) {
                                        setOpen(!open)
                                    };
                                }}
                                selected={clicked === index}
                                // completed
                            >
                            <ListItemIcon>
                                <Tooltip title={<Typography variant="h6">{lesson.title}</Typography>} arrow placement="right">
                                    <Avatar>{index+1}</Avatar>
                                </Tooltip>
                            </ListItemIcon>
                            <ListItemText primary={lesson.title} disableTypography={true} sx={{
                                whiteSpace: open ? 'initial' : undefined
                            }} />
                                <ListItemIcon>
                                    {completed.includes(lesson._id) ? <CheckCircleOutlineIcon color="success" /> : <RemoveCircleOutlineIcon className="uncompleted-lesson" color="warning" />}
                                </ListItemIcon>
                            </ListItem>
                            
                        ))}

                        
                        </List>
                    </Drawer>
                    </Grid>
                </Grid>
            </Grid>
        
        </StudentRoute>
    )
}


export default SingleCourseUser;