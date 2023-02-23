import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import { currencyFormatter } from "../../../server/utills/helpers";
import ReactPlayer from 'react-player';
import CircularProgress from '@mui/material/CircularProgress';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Box from '@mui/material/Box';
import Link from 'next/link';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useTheme } from '@mui/styles';
import {useMediaQuery} from '@mui/material';
import { Player, BigPlayButton, LoadingSpinner } from 'video-react';

const SingleCourseHero = ({
    course,
    user,
    loading,
    handlePaidEnrollment,
    handleFreeEnrollment,
    enrolled,
    handlePreviewDialog,
    
    }) => {

    const {title, description, instructor, updatedAt, lessons, image, price, paid, category, slug} = course;
    
    
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const [loadPlayer, setLoadPlayer] = useState("")
    useEffect(() => {
        if(lessons[0].video && lessons[0].video.Location && lessons[0].video.Location.length > 0) {
            setLoadPlayer(lessons[0].video.Location);
        }
    }, [lessons])

    return (
            <Paper
                sx={{
                flexGrow: 1,
                paddingTop: "4rem",
                background: "-moz-linear-gradient(45deg,  rgba(23,9,32,1) 0%, rgba(23,9,32,0.89) 0%, rgba(28,11,39,0.87) 68%, rgba(35,13,48,0.87) 81%, rgba(44,17,60,1) 99%, rgba(44,17,61,1) 100%)",
                background: "-webkit-linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                background: "linear-gradient(45deg,  rgba(23,9,32,1) 0%,rgba(23,9,32,0.89) 0%,rgba(28,11,39,0.87) 68%,rgba(35,13,48,0.87) 81%,rgba(44,17,60,1) 99%,rgba(44,17,61,1) 100%)",
                filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#170920', endColorstr='#2c113d',GradientType=1 )",
                height: "90%",
                marginTop: -1,
                paddingBottom: '1.5rem',
                }}
            >
                <Grid container
                    sx={{
                        justifyContent: 'space-between',
                        padding:  matchesSM ? '0 3rem': '0 3rem'
                    }}
                >
                    <Grid item sx={{flexGrow: 1, maxWidth: matchesSM ? '100%' :  '70%', paddingLeft: matchesSM ? undefined :  '2rem'}} >
                        <Typography variant="h1"
                            sx={{
                                color: "#fff",
                                width: "100%",
                                textAlign: matchesSM ? 'center' : undefined,
                                fontSize:  matchesSM ? '4rem' : undefined
                            }}
                            >
                            {title}
                            {!matchesSM ? <Badge color="primary" badgeContent={paid ? currencyFormatter({
                                amount: price,
                                currency: 'usd'
                            }) : 'Free'}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal:  matchesSM ? 'left' : 'right',
                                }}
                                sx={{ margin: matchesSM ? '0 5rem' : undefined ,  "& .MuiBadge-badge": { position: matchesSM ? undefined : 'relative', fontSize: '1.4rem', height: 25, padding: '20px 10px' } }}
                            ></Badge> : ''}

                        </Typography>
                        <Typography variant="body1"
                            sx={{
                                color: "#fff",
                                width: "100%",
                                marginTop: 1,
                                textAlign: matchesSM ? 'center' : undefined
                            }}
                        >
                            {description}
                            {matchesSM ? <Badge color="primary" badgeContent={paid ? currencyFormatter({
                                amount: price,
                                currency: 'usd'
                            }) : 'Free'}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal:  matchesSM ? 'left' : 'right',
                                }}
                                sx={{ margin: matchesSM ? '2rem 5rem 1rem 5rem' : undefined ,  "& .MuiBadge-badge": { position: matchesSM ? undefined : 'relative', fontSize: '1.4rem', height: 25, padding: '20px 10px' } }}
                            ></Badge> : ''}
                        </Typography>
                        <Badge color="secondary" badgeContent={category}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            sx={{ "& .MuiBadge-badge": { top: '-1rem', marginTop: '1rem', left: '3.4rem', fontSize: '1.4rem', height: 15, padding: '16px 10px' } }}
                        ></Badge>
                     


                    </Grid>
                    <Grid item 
                    sx={{
                        maxWidth: '20rem',
                        minWidth: '17rem',
                        marginBottom: -10,
                    }}>
                        <Grid item
                            sx={{
                                backgroundColor: '#504271',
                                borderRadius: '10px 10px 0 0'
                            }}
                        >
                            {lessons[0].video && lessons[0].video.Location ? (<div data-free-lesson={0} style={{position: 'relative'}} onClick={(event) => {
                                handlePreviewDialog(event);
                            }}>
                                
                                

                                {loadPlayer != "" &&
                                    <Player 
                                    src={lessons[0].video.Location}
                                    poster={course.image && course.image.Location ? course.image.Location : '/course.png'}
                                    playsInline

                                >
                                    <BigPlayButton position="center" />
                                    <LoadingSpinner />
                                </Player>
                                }

                                <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 10, top: 0}}></div>
                            </div>) : (<img src={image && image.Location ? image.Location : '/course.png'} 
                                        alt={title} 
                                        style={{maxWidth: '100%', 
                                            maxHeight: 225,
                                            display: 'table', margin: '0 auto'}} 
                                    />
                            )}
                        </Grid>
                        <Grid item 
                            sx={{
                                padding: '1rem', 
                                backgroundColor: '#1d0a2b',
                                borderRadius: '0 0 10px 10px '
                    
                            }}
                            >
                            <Button 
                                color="secondary"
                                onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                                loading={loading.toLocaleString()}
                                sx={{
                                    marginTop: "22px",
                                    width: '100%',
                                    borderRadius: '25px'
                                }}
                                variant="contained" startIcon={!loading ? user 
                                    ? enrolled.status 
                                        ? <CastForEducationIcon /> 
                                        : <GppGoodIcon />
                                : <ExitToAppIcon /> : ''}
                            >
                                {loading ? <CircularProgress /> : user 
                                    ? enrolled.status 
                                        ? "Go to course" 
                                        : "Enroll" 
                                : "Login to enroll now"}
                            </Button>


                            {false && <Link href={`/user/course/podcasts/${slug}`} passHref>
                                <a>
                                    <Button variant="contained" 
                                        
                                        sx={{
                                            color: '#fff', 
                                            backgroundColor: '#F26F23',
                                            borderRadius: '25px',
                                            marginTop: 2,
                                            width: '100%',
                                        }} startIcon={<LibraryMusicIcon />}>
                                        {enrolled.status ? 'Podcasts' : 'Podcasts required Enrollment'}
                                        
                                    </Button>
                                </a>
                            </Link>
                            }


                            {course.instructor && course.instructor.name && <Typography variant="body2"
                                sx={{
                                    color: "#e2e2e2",
                                    textAlign: 'center',
                                    marginTop: '1rem'

                                }}
                                >
                                Created by {course.instructor.name}
                            </Typography>}
                            
                            <Typography variant="body2"
                                sx={{
                                    color: "#e2e2e2",
                                    textAlign: 'center',
                                }}
                                >
                                Last updated {new Date(course.updatedAt).toLocaleString()}
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>

            </Paper>
    )
}

export default SingleCourseHero;