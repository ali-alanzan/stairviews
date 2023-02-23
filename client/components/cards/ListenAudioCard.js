import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CircularProgress from '@mui/material/CircularProgress';
import ReactPlayer from 'react-player';
import PauseIcon from '@mui/icons-material/Pause';

import StopIcon from '@mui/icons-material/Stop';
import {useMediaQuery} from '@mui/material';

import ReplayIcon from '@mui/icons-material/Replay';

export default function ListenAudioCard({course, lesson, clicked, handlePrevious, handleNext, handleStop, handleRePlay, play, setPlay}) {

  const [ready, setReady] = React.useState(false);
  const [duration, setDuratoin] = React.useState(0);
  const [track, setTrack] = React.useState({
    loadedSeconds: 0,
    playedSeconds: 0
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));


  const handlePlay = () => {
    var _audioPlayer = document.getElementById('audio-player');
    if(play === true) {
        setPlay(false);
    } else {
        setPlay(true);
    }
  }



  React.useEffect(() => {
    setReady(false);
  }, [clicked])

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        px: 1, 
        flexDirection: matchesSM ?  'column': 'row' ,
        alignItems: matchesSM ? 'center' : undefined
      }}
      >
    

    <div
        style={{display:'none'}}
    
    >

    <ReactPlayer 
      url={clicked >= 0 ? course.lessons[clicked].audio.Location : ''}
      width="100%"
      height="100%"
      progressInterval={1000}
      playing={play}
      onReady={() => {setReady(true)}}
      forceaudio="true"
      onEnded={() => setPlay(false)}
      onProgress={(state) => setTrack(state)}
      onDuration={(d) => setDuratoin(d)}
      controls
  />
    </div>

      <Box sx={{ display: 'flex',
       flexDirection: 'column',  position: 'relative'}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="h1" variant="h3">
            {lesson.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {clicked+1} / {course.lessons.length}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" 
            disabled={clicked == 0}
            onClick={handlePrevious}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={handlePlay}>
            {!ready ? <CircularProgress /> : play !== true ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
          </IconButton>
          <IconButton aria-label="next"
            disabled={clicked == course.lessons.length-1}
            onClick={handleNext}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
       
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={course.image && course.image.Location ? course.image.Location : '/course.png'}
        alt="Live from space album cover"
      />

      <CardActions
        sx={{
          alignSelf: matchesSM ? 'stretch' : undefined
        }}
      >
          <Box 
            sx={{
              display: 'flex', flexGrow: 1, 
              flexDirection:  matchesSM ?  'row': 'column-reverse',
              justifyContent:  matchesSM ?  'space-between': undefined
            }}
            >
            <IconButton aria-label="stop" onClick={handleStop}>
                <StopIcon />
            </IconButton>
            
            <Box>
              <Box sx={{
                display: 'flex',
                flexDirection: matchesSM ? 'column-reverse' : 'row'
              }}>
              <IconButton aria-label="replay" onClick={handleRePlay}>
                  <ReplayIcon />
              </IconButton>

              <Typography sx={{
                marginTop: matchesSM ? '-1rem': undefined 
              }}>
                {`${Math.floor(track.playedSeconds)} : ${Math.floor(track.loadedSeconds)}`}
              </Typography>
              </Box>
            </Box>
          </Box>
          
      </CardActions>

     

    </Card>
  );
}
